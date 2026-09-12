#!/usr/bin/env bash

set -euo pipefail

# Override these when connecting a different App Platform app or database.
DB_ID="${DB_ID:-dbe75891-48c9-48d2-8043-2901ab2d456d}"
APP_ID="${APP_ID:-35b1a8ab-59ba-4905-be25-68a2e1026fe9}"

require_command() {
  if ! command -v "$1" >/dev/null 2>&1; then
    printf 'Required command not found: %s\n' "$1" >&2
    exit 1
  fi
}

require_command doctl
require_command yq
require_command jq
require_command npm
require_command curl

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

# A temp directory, not a temp file: BSD mktemp leaves the X's literal when a
# suffix follows them, which would put the App Platform spec -- and with it
# DATABASE_URL and the CA -- at a predictable path. -d randomizes and is 0700.
TMP_DIR="$(mktemp -d "${TMPDIR:-/tmp}/spec-frontend.XXXXXX")"
SPEC_FILE="$TMP_DIR/spec.yaml"
OPERATOR_RULE_UUID=""
cleanup() {
  if [[ -n "$OPERATOR_RULE_UUID" ]]; then
    doctl databases firewalls remove "$DB_ID" --uuid "$OPERATOR_RULE_UUID" >/dev/null || true
  fi
  rm -rf "$TMP_DIR"
  unset DB_URL
  unset DB_CA
}
trap cleanup EXIT

printf 'Retrieving the current App Platform spec...\n'
if ! doctl apps spec get "$APP_ID" --format yaml >"$SPEC_FILE"; then
  printf 'Could not retrieve the App Platform spec.\n' >&2
  exit 1
fi

if [[ ! -s "$SPEC_FILE" ]]; then
  printf 'The retrieved App Platform spec is empty.\n' >&2
  exit 1
fi

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

OPERATOR_IP="$(curl -fsS https://api.ipify.org)"
if [[ -z "$OPERATOR_IP" ]]; then
  printf 'Could not determine the current public IP address.\n' >&2
  exit 1
fi

if ! doctl databases firewalls list "$DB_ID" --output json \
  | jq -e --arg ip "$OPERATOR_IP" 'any(.[]; .type == "ip_addr" and .value == $ip)' \
  >/dev/null; then
  printf 'Temporarily allowing this machine to run the migration...\n'
  doctl databases firewalls append "$DB_ID" --rule "ip_addr:$OPERATOR_IP"
  OPERATOR_RULE_UUID="$(doctl databases firewalls list "$DB_ID" --output json \
    | jq -r --arg ip "$OPERATOR_IP" 'first(.[] | select(.type == "ip_addr" and .value == $ip) | .uuid) // empty')"
fi

printf 'Applying the analytics database migration...\n'
(cd "$REPO_ROOT" && NODE_ENV=production DATABASE_URL="$DB_URL" DATABASE_SSL_CA="$DB_CA" npm run db:setup)

if [[ -n "$OPERATOR_RULE_UUID" ]]; then
  printf 'Removing the temporary machine firewall rule...\n'
  doctl databases firewalls remove "$DB_ID" --uuid "$OPERATOR_RULE_UUID"
  OPERATOR_RULE_UUID=""
fi

if ! doctl databases firewalls list "$DB_ID" --output json \
  | jq -e --arg app_id "$APP_ID" 'any(.[]; .type == "app" and .value == $app_id)' \
  >/dev/null; then
  printf 'Allowing the App Platform service through the database firewall...\n'
  doctl databases firewalls append "$DB_ID" --rule "app:$APP_ID"
fi

printf 'Adding the encrypted DATABASE_URL runtime variable...\n'
# Top-level envs, where every other secret on this app already lives. An
# earlier version targeted a service named "server", which does not exist --
# the service is named after the app -- so yq matched nothing and the script
# reported success while changing nothing.
DB_URL="$DB_URL" DB_CA="$DB_CA" yq -i '
  .envs = ((.envs // [])
    | map(select(.key != "DATABASE_URL" and .key != "DATABASE_SSL_CA"))
    + [{
        "key": "DATABASE_URL",
        "value": strenv(DB_URL),
        "scope": "RUN_TIME",
        "type": "SECRET"
      }, {
        "key": "DATABASE_SSL_CA",
        "value": strenv(DB_CA),
        "scope": "RUN_TIME",
        "type": "SECRET"
      }])
' "$SPEC_FILE"

# Fail loudly if the edit did not take. Silently deploying an unchanged spec
# is how the missing credentials went unnoticed through several deploys.
for required in DATABASE_URL DATABASE_SSL_CA; do
  if ! required="$required" yq -e '.envs[] | select(.key == strenv(required))' "$SPEC_FILE" >/dev/null 2>&1; then
    printf 'Failed to add %s to the App Platform spec; not deploying.\n' "$required" >&2
    exit 1
  fi
done
printf 'Updating App Platform and waiting for deployment...\n'
doctl apps update "$APP_ID" --spec "$SPEC_FILE" --wait

printf 'Database connection URL and CA attached to App Platform successfully.\n'
