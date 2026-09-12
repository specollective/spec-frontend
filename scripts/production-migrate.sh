#!/usr/bin/env bash

# Applies pending Drizzle migrations to the managed production database.
#
# Narrower than connect-db.sh on purpose. That script also rewrites the App
# Platform spec and waits for a redeploy, which is what you want when first
# attaching a database. Once the runtime variables are set, a schema change
# needs none of it -- only the migration. This touches the database and
# nothing else.
#
# The one other mutation is the database firewall: it temporarily allows this
# machine in and removes that rule on exit, including on failure or Ctrl-C.
#
# Operator-only: requires doctl authenticated against the SPEC account.

set -euo pipefail

# Override these when migrating a different database.
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
require_command npm

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

# BSD mktemp leaves the X's literal when a suffix follows them, which would put
# the CA at a predictable path. -d randomizes and is created 0700.
TMP_DIR="$(mktemp -d "${TMPDIR:-/tmp}/spec-migrate.XXXXXX")"
CA_FILE="$TMP_DIR/ca.crt"
OPERATOR_RULE_UUID=""

cleanup() {
  if [[ -n "$OPERATOR_RULE_UUID" ]]; then
    printf '\nRemoving the temporary machine firewall rule...\n'
    doctl databases firewalls remove "$DB_ID" --uuid "$OPERATOR_RULE_UUID" >/dev/null || true
  fi
  rm -rf "$TMP_DIR"
  unset DB_URL
  unset DB_CA
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
  printf 'Temporarily allowing this machine to migrate the database...\n'
  doctl databases firewalls append "$DB_ID" --rule "ip_addr:$OPERATOR_IP" >/dev/null
  OPERATOR_RULE_UUID="$(doctl databases firewalls list "$DB_ID" --output json \
    | jq -r --arg ip "$OPERATOR_IP" 'first(.[] | select(.type == "ip_addr" and .value == $ip) | .uuid) // empty')"
fi

DB_URL_BASE="${DB_URL%%\?*}"
CONNECTION="${DB_URL_BASE}?sslmode=verify-full&sslrootcert=${CA_FILE}"

schema_state() {
  psql "$CONNECTION" --no-psqlrc --quiet --tuples-only --no-align --command "
    SELECT CASE
      WHEN to_regclass('public.page_views') IS NOT NULL THEN 'current'
      WHEN to_regclass('public.giee_page_views') IS NOT NULL THEN 'legacy'
      ELSE 'none'
    END"
}

printf '\nSchema before: %s\n\n' "$(schema_state)"

printf 'Applying pending migrations...\n'
(
  cd "$REPO_ROOT" &&
  NODE_ENV=production \
  DATABASE_URL="$DB_URL" \
  DATABASE_SSL_CA="$DB_CA" \
    npm run --silent db:migrate
)

printf '\nSchema after: %s\n' "$(schema_state)"
printf '\nRun just db-report-prod to confirm what the application records.\n'
