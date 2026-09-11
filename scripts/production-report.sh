#!/usr/bin/env bash

# Prints the analytics report from the managed production database.
#
# Read-only: it opens a read-only session, runs scripts/analytics-report.sql,
# and changes nothing. The one mutation it makes is to the database firewall --
# it temporarily allows this machine in, and removes that rule on exit,
# including on failure or Ctrl-C.
#
# Operator-only: requires doctl authenticated against the SPEC account.

set -euo pipefail

# Override these when reporting on a different database.
DB_ID="${DB_ID:-dbe75891-48c9-48d2-8043-2901ab2d456d}"

require_command() {
  if ! command -v "$1" >/dev/null 2>&1; then
    printf 'Required command not found: %s\n' "$1" >&2
    exit 1
  fi
}

require_command doctl
require_command psql
require_command jq
require_command curl

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
REPORT_SQL="$REPO_ROOT/scripts/analytics-report.sql"

if [[ ! -f "$REPORT_SQL" ]]; then
  printf 'Report not found: %s\n' "$REPORT_SQL" >&2
  exit 1
fi

CA_FILE="$(mktemp "${TMPDIR:-/tmp}/spec-db-ca.XXXXXX.crt")"
chmod 600 "$CA_FILE"
OPERATOR_RULE_UUID=""

cleanup() {
  if [[ -n "$OPERATOR_RULE_UUID" ]]; then
    printf 'Removing the temporary machine firewall rule...\n'
    doctl databases firewalls remove "$DB_ID" --uuid "$OPERATOR_RULE_UUID" >/dev/null || true
  fi
  rm -f "$CA_FILE"
  unset DB_URL
}
trap cleanup EXIT

printf 'Retrieving the database connection securely...\n'
DB_URL="$(doctl databases connection "$DB_ID" --format URI --no-header)"
if [[ -z "$DB_URL" ]]; then
  printf 'Could not retrieve the database connection string.\n' >&2
  exit 1
fi

DB_CA="$(doctl databases get-ca "$DB_ID" --format Certificate --no-header)"
if [[ -z "$DB_CA" ]]; then
  printf 'Could not retrieve the database CA certificate.\n' >&2
  exit 1
fi

# doctl has returned this field both as PEM and as base64-wrapped PEM across
# versions; accept either rather than failing verification on a formatting
# difference.
if [[ "$DB_CA" == -----BEGIN* ]]; then
  printf '%s\n' "$DB_CA" >"$CA_FILE"
else
  printf '%s' "$DB_CA" | base64 --decode >"$CA_FILE"
fi

if ! grep -q -- '-----BEGIN CERTIFICATE-----' "$CA_FILE"; then
  printf 'The retrieved CA certificate is not in a recognized format.\n' >&2
  exit 1
fi

OPERATOR_IP="$(curl -fsS https://api.ipify.org)"
if [[ -z "$OPERATOR_IP" ]]; then
  printf 'Could not determine the current public IP address.\n' >&2
  exit 1
fi

if ! doctl databases firewalls list "$DB_ID" --output json \
  | jq -e --arg ip "$OPERATOR_IP" 'any(.[]; .type == "ip_addr" and .value == $ip)' \
  >/dev/null; then
  printf 'Temporarily allowing this machine to read the database...\n'
  doctl databases firewalls append "$DB_ID" --rule "ip_addr:$OPERATOR_IP"
  OPERATOR_RULE_UUID="$(doctl databases firewalls list "$DB_ID" --output json \
    | jq -r --arg ip "$OPERATOR_IP" 'first(.[] | select(.type == "ip_addr" and .value == $ip) | .uuid) // empty')"
fi

# doctl's URI carries sslmode=require, and libpq lets connection-string
# parameters override PGSSLMODE, so replace the query rather than setting the
# environment variable. verify-full checks the hostname as well as the chain.
DB_URL_BASE="${DB_URL%%\?*}"

printf 'Reading the production analytics report...\n\n'
PGOPTIONS='-c default_transaction_read_only=on' \
  psql "${DB_URL_BASE}?sslmode=verify-full&sslrootcert=${CA_FILE}" \
    --no-psqlrc \
    --quiet \
    --set ON_ERROR_STOP=1 \
    --file "$REPORT_SQL"
