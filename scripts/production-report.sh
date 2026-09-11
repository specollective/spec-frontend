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
CONNECTION="${DB_URL_BASE}?sslmode=verify-full&sslrootcert=${CA_FILE}"

run_psql() {
  PGOPTIONS='-c default_transaction_read_only=on' \
    psql "$CONNECTION" --no-psqlrc --quiet --set ON_ERROR_STOP=1 "$@"
}

# Report which schema is actually deployed before running a report that assumes
# one. Without this the operator sees a bare "relation does not exist" error
# and has to work out which migration state produced it.
SCHEMA_STATE="$(run_psql --tuples-only --no-align --command "
  SELECT CASE
    WHEN to_regclass('public.page_views') IS NOT NULL THEN 'current'
    WHEN to_regclass('public.giee_page_views') IS NOT NULL THEN 'legacy'
    ELSE 'none'
  END")"

case "$SCHEMA_STATE" in
  current)
    printf 'Reading the production analytics report...\n\n'
    run_psql --file "$REPORT_SQL"
    ;;
  legacy)
    printf 'Production is still on the pre-migration schema.\n'
    printf 'It has giee_page_views but not page_views, so migrations 0000-0002\n'
    printf 'have not been applied. Run just db-connect to migrate it.\n\n'
    printf 'These raw view counts are what migration 0002 will carry over and\n'
    printf 'relabel as visitors:\n\n'
    run_psql --command "
      SELECT day, path, locale, views
      FROM giee_page_views
      ORDER BY day DESC, views DESC, path;"
    run_psql --command "
      SELECT count(*) AS rows, coalesce(sum(views), 0) AS total_views
      FROM giee_page_views;"
    ;;
  *)
    printf 'Production has no analytics schema: neither page_views nor\n'
    printf 'giee_page_views exists. Run just db-connect to migrate it.\n'
    ;;
esac
