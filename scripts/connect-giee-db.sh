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

SPEC_FILE="$(mktemp "${TMPDIR:-/tmp}/spec-frontend.XXXXXX.yaml")"
cleanup() {
  rm -f "$SPEC_FILE"
  unset DB_URL
}
trap cleanup EXIT

if ! doctl databases firewalls list "$DB_ID" --output json \
  | jq -e --arg app_id "$APP_ID" 'any(.[]; .type == "app" and .value == $app_id)' \
  >/dev/null; then
  printf 'Allowing the App Platform service through the database firewall...\n'
  doctl databases firewalls append "$DB_ID" --rule "app:$APP_ID"
fi

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

printf 'Adding the encrypted DATABASE_URL runtime variable...\n'
DB_URL="$DB_URL" yq -i '
  (.services[] | select(.name == "server") | .envs) =
    ((. // [])
      | map(select(.key != "DATABASE_URL"))
      + [{
          "key": "DATABASE_URL",
          "value": strenv(DB_URL),
          "scope": "RUN_TIME",
          "type": "SECRET"
        }])
' "$SPEC_FILE"

printf 'Updating App Platform and waiting for deployment...\n'
doctl apps update "$APP_ID" --spec "$SPEC_FILE" --wait

printf 'DATABASE_URL attached to App Platform successfully.\n'
