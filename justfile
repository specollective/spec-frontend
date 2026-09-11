# SPEC Frontend

# Local analytics database container, created or adopted by `just db-setup`.
local_container := "spec-analytics-postgres"

# Database name parsed out of DATABASE_URL in .env.local so the console and
# report recipes can never drift from what the app and migrations use.
env_database := `sed -n 's|^DATABASE_URL=.*/\([^/?]*\).*|\1|p' .env.local 2>/dev/null | tail -1`
local_database := if env_database == "" { "spec_analytics" } else { env_database }

# Show all recipes
default:
    @just --list

# Fail with an actionable message when the active Node predates the engines floor.
# Private (leading _) so it stays out of `just --list`.
_node-check:
    @node -e 'var v=process.versions.node.split(".").map(Number); if(v[0]<20||(v[0]===20&&v[1]<9)){console.error("Node "+process.versions.node+" is too old; this repo needs >=20.9. Run: nvm use"); process.exit(1);}'

# ---------------------------------------------------------------- setup

# Install dependencies, create .env.local, and start the analytics database
setup: install setup-env db-setup

# Install dependencies
install: _node-check
    npm install

# Copy .env.sample to .env.local (does not overwrite an existing file)
setup-env:
    @test -f .env.local && echo ".env.local already exists, leaving it alone" || cp .env.sample .env.local

# ---------------------------------------------------------------- develop

# Start the local dev server on port 3322
dev: _node-check
    npm run dev

# Production build
build: _node-check
    npm run build

# Start the production server (default port 8080)
start: _node-check
    npm run start

# ---------------------------------------------------------------- verify

# Run ESLint
lint: _node-check
    npm run lint

# Typecheck without emitting
typecheck: _node-check
    npx tsc --noEmit

# Run all tests
test: _node-check
    npm run test

# Run tests in watch mode
test-watch: _node-check
    npm run test -- --watch

# Run a single test file
test-file file: _node-check
    npm run test -- {{file}}

# Everything CI and the analytics spec ask for before a release
check: lint typecheck test build

# ---------------------------------------------------------------- database

# Start (or reuse) the local PostgreSQL container and apply pending migrations
db-setup: _node-check
    npm run db:setup

# Generate a migration after editing db/schema.ts, then commit it
db-generate: _node-check
    npm run db:generate

# Generate an empty migration for hand-written SQL (seeds, triggers)
db-generate-custom: _node-check
    npx drizzle-kit generate --custom

# Apply pending migrations to DATABASE_URL without touching Docker
db-migrate: _node-check
    npm run db:migrate

# Open a psql console against the local analytics database
db-psql:
    docker exec -it {{local_container}} psql -U postgres -d {{local_database}}

# Print the analytics counters recorded in local development, with sanity checks
db-report:
    @docker exec -i {{local_container}} psql -q -U postgres -d {{local_database}} \
      < scripts/analytics-report.sql

# Stop and delete the local analytics container and all its counters
db-reset:
    -docker rm -f {{local_container}}
    @echo 'Run `just db-setup` to recreate it.'

# Print the analytics report from the production database (operator-only: needs doctl, psql, jq)
db-report-prod:
    ./scripts/production-report.sh

# Apply pending migrations to the production database, and nothing else (operator-only)
db-migrate-prod:
    ./scripts/production-migrate.sh

# Attach the managed database to App Platform and migrate it (operator-only: needs doctl, yq, jq)
db-connect:
    ./scripts/connect-db.sh
