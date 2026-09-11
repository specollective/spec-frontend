# SPEC Privacy-First Analytics Specification

Status: Ready for implementation
Collection scope: `/giee`, `/giee/research`, `/giee/partner`, and future
descendants of `/giee`
Out of scope: Every other route, including `/`, `/glqf`, and `/ourTeam`

The storage schema and application code are section-neutral so a second site
section can be measured later without a redesign, but exactly one section —
GIEE — is measured today. Adding another is a deliberate, reviewable change:
see "Adding a tracked section".

## Decision summary

The first release will use a small first-party daily visitor counter implemented
in the existing Next.js application. Each page is counted at most once per
visitor per UTC day; raw page-view volume is deliberately not retained. It will use explicit opt-in consent and a
DigitalOcean Managed PostgreSQL database. PostgreSQL is free and open-source;
DigitalOcean hosting is a paid infrastructure service.

There will be no third-party analytics script, analytics dashboard, event-level
table, tracking identifier, cookie before consent, queue, cron service, or
separate analytics application.

The database will store only daily counters keyed by canonical path and
supported locale. Analytics are best-effort: failures must never affect page
rendering or form submission.

## Objective

Measure whether the GIEE section is discovered and used without identifying
visitors, building profiles, or sending browsing data to an analytics vendor.
The initial release must remain small enough to implement without a site-wide
analytics package or consent-management package.

## Architecture

Implement the following application surface:

1. `pages/_app.tsx` mounts the analytics component only when the effective
   route resolves to a registered section — today only `/giee` and its
   descendants.
2. `components/Analytics.tsx` owns consent display, consent-cookie handling,
   initial page-view delivery, and client-side route-change delivery.
3. `pages/api/page-views.ts` accepts and validates page-view requests and
   performs the aggregate database upsert.
4. `service/analyticsStore.ts` owns the SQL and the retention sweep;
   `db/client.ts` owns the connection pool. Neither may be imported by
   browser code.
6. `utils/analytics/seenToday.ts` records which pages this browser already
   reported today so a visitor is counted once per page per UTC day.
7. `utils/analytics/sections.ts` is the single application-side registry of
   tracked sections; `utils/analytics/path.ts` canonicalizes and scope-checks
   paths; `utils/analytics/consent.ts` holds the server-safe cookie contract
   and `consentClient.ts` the browser-only helpers.
5. `public/locales/en/privacy.json` and `public/locales/fr/privacy.json` are
   updated before release. Spanish is not a supported application locale until
   it is re-enabled in `next-i18next.config.js`.

Use Drizzle ORM over the open-source `pg` package, with `drizzle-kit` owning
migration generation and the applied-migration ledger. Drizzle is a thin
typed query builder: the SQL it emits is reviewable in
`db/migrations/*.sql`, and it adds no query engine binary or build-time
codegen step to the DigitalOcean buildpack. Application startup never applies
schema changes. Reuse pooled connections and configure the pool for the single
App Platform service and the expected database connection limit.

The application connects to a DigitalOcean Managed PostgreSQL cluster in the
same region as the App Platform service. The encrypted `DATABASE_URL` and
`DATABASE_SSL_CA` runtime environment variables are configured in DigitalOcean
and are never committed to the repository or exposed to the browser. TLS must
be enabled and the connection must validate the cluster CA; do not disable
certificate verification. Database access is limited to the application
service and the named service owner/operator accounts.

## Consent decision

The initial release requires explicit opt-in consent. No analytics request is
allowed while consent is undecided or rejected.

The consent UI must:

- appear on every supported GIEE page when consent is undecided;
- state that anonymous aggregate visitor measurement is being requested;
- provide equally prominent `Accept` and `Reject` actions;
- provide a link to the localized privacy policy;
- remain keyboard accessible and usable on mobile;
- allow the choice to be changed from `/privacy`.

On acceptance or rejection, set one first-party consent-preference cookie:

```text
analytics-consent-v2=granted
```

The value must be either `granted` or `denied`; no other value is valid.

The `v2` suffix is the consent *scope* version, not a cookie format version.
Consent is given for a specific set of processing, so changing that set — a new
measured section, a changed metric, or new client-side storage — must not
silently inherit an older choice. Bumping `CONSENT_SCOPE_VERSION` renames the
cookie, which makes every existing visitor undecided again and re-shows the
consent UI.

`v2` was reached when daily unique-visitor measurement replaced raw page views,
introducing the `analytics-seen` local-storage entry. Visitors who accepted the
`v1` scope are asked again.

The cookie must use `Path=/`, `SameSite=Lax`, `Secure` in production, and a
defined finite lifetime of 180 days. It contains no identifier or timestamp.
The `denied` value is a strictly necessary preference cookie, not a tracking
cookie. Withdrawal changes the value to `denied`. A missing cookie means
undecided and must show the consent UI. Withdrawal prevents all future
requests; previously stored aggregate counters are not attributed to a person
and are not deleted on withdrawal.

The consent UI may be implemented without a dependency. Do not use a tracking
cookie, a fingerprint, or any persistent client identifier, in local storage or
anywhere else.

One narrow use of local storage is permitted: the `analytics-seen` entry that
deduplicates repeat views, specified under "Event lifecycle". It holds a UTC
date and the list of paths already reported on that date, nothing more. Local
storage is required rather than a cookie precisely because a cookie carrying
that list would transmit a trace of the visitor's reading on every request to
the origin; this never leaves the device. It must be cleared on withdrawal.

## Event lifecycle

After consent is granted:

- send one event after the initial page has mounted, unless this browser has
  already reported that path and locale today;
- send one event after each completed client-side history navigation to a new
  canonical page, subject to the same daily check;
- do not send an event for a failed navigation, hash-only change, query-only
  change, or repeated render of the same history entry;
- do not send an event on routes outside `/giee`;
- do not retry failed events.

Deduplication has two layers. An in-memory `Set` of the paths sent in this
page-load guards against duplicate initial effects, React Strict Mode, and the
router-identity change that re-runs the delivery effect on every navigation.
It cannot survive a reload or be shared between tabs, so the `analytics-seen`
local-storage entry carries the same guarantee across both:

```json
{"day":"2026-09-11","keys":["/giee|en","/giee/research|en"]}
```

The key is path and locale joined, matching the counter row's grain, so a
visitor who reads the same page in two locales increments the two rows that
represent it. The day is UTC, matching the database's `CURRENT_DATE`; a
local-time day would roll over on a different boundary than the row it guards.
The first view of a new day overwrites the previous day's entry outright, so no
history accumulates. The entry list is capped, and an unavailable, full, or
corrupt store fails open — counting the view rather than silently dropping it.

This is advisory. The browser decides what to send, so it deduplicates honest
repeat views, not deliberate inflation.

Use `navigator.sendBeacon` with `POST` and a JSON `Blob` to preserve the JSON
content type. If `sendBeacon` is unavailable, the implementation may use a
`fetch` request with `keepalive: true`; it must not block navigation or display
an error.

## Canonical event contract

The only accepted request is a same-origin `POST` with JSON body no larger than
256 bytes:

```json
{"path":"/giee/research","locale":"en"}
```

The body must contain exactly `path` and `locale`, both strings. Reject or
discard all other fields, event names, query parameters, fragments, hashes,
form data, and arbitrary metadata.

Supported locales are exactly the locales enabled in
`next-i18next.config.js`: currently `en` and `fr`. The endpoint must reject
other locale values, including `es` while Spanish is disabled.

Canonicalization rules:

- derive the browser path from the URL pathname, never from a query-bearing
  route string;
- remove an enabled locale prefix before validation;
- decode valid percent encoding once; reject malformed encoding;
- reject encoded `/`, `\\`, control characters, dot segments, and duplicate
  slash forms rather than attempting to normalize them;
- remove one trailing slash except for the root path;
- accept `/giee` and descendants beginning with `/giee/`;
- reject every other path;
- store only the canonical path, never the original URL.

For this release, descendants may contain multiple path segments, but every
segment must be non-empty and must not be `.` or `..`. This supports future
GIEE routes without broadening collection to other site sections.

The endpoint must also require the current-scope `granted` cookie. Direct
requests without current consent are discarded with the same response as
accepted events.

## HTTP behavior and abuse controls

- Accept `POST` only; return `204` for accepted, rejected, malformed,
  unsupported-method, and storage-failure events so analytics never reveal
  internal details or become observable as a separate application feature.
- Require `Content-Type: application/json` and enforce the 256-byte body limit
  before parsing.
- If an `Origin` header is present, require it to match the public request
  origin derived from the trusted App Platform host/protocol configuration.
  Permit requests without `Origin` because some privacy tools omit it; the
  granted/denied cookie and same-site policy remain required.
- Do not enable cross-origin CORS.
- Do not log request bodies, query strings, cookies, or authorization headers.
- Configure application and DigitalOcean logs to exclude analytics payloads
  and use the shortest practical retention period.
- Apply a bounded global endpoint rate limit of 1,000 requests per UTC minute
  per App Platform instance. For the initial single-instance deployment, use an
  in-memory fixed-window counter keyed only by the UTC minute. Reset it when
  the minute changes or the process restarts. Do not persist IP addresses or
  other visitor identifiers. Requests over the limit are discarded with `204`.
  This is best-effort abuse protection, not a cross-instance guarantee.

Deduplication is performed entirely by the client and cannot be verified by the
endpoint, which has no visitor state to check it against. Two consequences
follow, and both must be stated wherever the figure is reported.

The metric is *daily unique browsers that chose to report themselves*, not
unique people: one person on a laptop and a phone counts twice, and clearing
local storage resets the guard. It remains inflatable by automation, so it is a
directional usage metric, never a security or audience-verification metric.

The endpoint deliberately does not compensate with server-side deduplication.
Doing so would require an IP address or another visitor identifier, which this
design exists to avoid; a less precise number is the intended trade.

## PostgreSQL storage

The schema is section-neutral; the *scope* of collection is data the database
enforces, not a constant baked into a table definition.

```sql
CREATE TABLE analytics_sections (
  slug           text PRIMARY KEY,
  root_path      text NOT NULL UNIQUE,
  retention_days integer NOT NULL DEFAULT 90,
  CHECK (root_path ~ '^/[a-z0-9-]+$'),
  CHECK (retention_days > 0)
);

CREATE TABLE page_views (
  day     date   NOT NULL,
  section text   NOT NULL REFERENCES analytics_sections(slug),
  path    text   NOT NULL,
  locale  text   NOT NULL,
  visitors bigint NOT NULL DEFAULT 0 CHECK (visitors >= 0),
  PRIMARY KEY (day, section, path, locale)
);
```

Only sections present in `analytics_sections` can be stored, and the foreign
key makes that unforgeable. A CHECK constraint cannot consult another table, so
the companion rule — a path must sit inside its own section — is the
`page_views_path_in_section` trigger, which rejects any insert or update whose
`path` is neither its section's `root_path` nor a descendant of it. The
`root_path` shape constraint keeps LIKE metacharacters out of that comparison.

Locale is validated in the application against the locales enabled in
`next-i18next.config.js`. It is deliberately not a database constraint:
enabling a language is not a privacy-scope change and must not require a
migration.

The column is named `visitors`, not `views`, because the client suppresses
repeats: the number counts distinct reporting browsers per page per day.

Configure the PostgreSQL session to use UTC before any query runs. The pool
sets `options: '-c timezone=UTC'` on the connection so this costs no
per-request round trip. For each accepted event, execute an atomic upsert using
that UTC database day:

```sql
INSERT INTO page_views (day, section, path, locale, visitors)
VALUES (CURRENT_DATE, $1, $2, $3, 1)
ON CONFLICT (day, section, path, locale)
DO UPDATE SET visitors = page_views.visitors + 1;
```

Do not create an event-level table. Do not store request timestamps, IP
addresses, user agents, referrers, cookies, identifiers, or raw payloads.

Retention is per section, read from `analytics_sections.retention_days`
(90 days for GIEE). Cleanup is a once-a-day job, not a per-request one: running
a delete inside every recorded visit adds a scan and row locks to a request that
only needs to increment one counter. The store therefore sweeps at most once
per UTC day per process, after a successful upsert and outside its transaction,
and a failed sweep neither fails the recorded visit nor is skipped for the rest
of the day:

```sql
DELETE FROM page_views
WHERE section = $1 AND day < CURRENT_DATE - make_interval(days => $2);
```

Monthly totals are not retained in the initial release. They may be added only
through a separately approved schema and privacy-policy change.

The database must have automated backups enabled. The effective backup and
point-in-time-recovery retention must not exceed 90 days unless the
product/privacy owner explicitly approves a longer retention and the privacy
policy discloses it. Backups are production data and must follow the same
access-control and deletion policy. The service owner must document the
effective retention and backup region before launch.

Aggregate reporting is performed by an authenticated operator through the
DigitalOcean database console or a protected maintenance script. There is no
public reporting endpoint and no visitor-level export.

`scripts/analytics-report.sql` is that maintenance script: a read-only dump of
the registered sections, per-page totals, the last 14 days, and two invariants
that must both report zero — rows whose path falls outside its section, and
rows older than that section's retention period. Run it locally with
`just db-report`, or pipe it into an operator psql session against the managed
database.

## Privacy and compliance

Before deployment, the product/privacy owner must record the legal basis for
this explicit opt-in measurement and confirm the jurisdictions served.

The localized privacy policy must accurately state:

- the purpose: anonymous aggregate measurement of GIEE page usage;
- the fields: canonical path, supported locale, and aggregate daily count;
- that each page is counted at most once per visitor per day;
- that consent is optional and can be withdrawn from the privacy page;
- the consent cookie name, purpose, and 180-day lifetime;
- the `analytics-seen` local-storage entry: its name, that it holds only a date
  and the pages already reported that day, that it never leaves the device, and
  that it is replaced daily and deleted on withdrawal;
- DigitalOcean Managed PostgreSQL as the hosting/processing location;
- the absence of cross-day linkage, cross-device tracking, and profiling;
- daily-counter retention of 90 days;
- backup retention and the responsible operator contact;
- the applicable legal basis and user rights.

The existing statement that SPEC uses no analytics must be removed or revised
in every enabled locale before release.

## Acceptance criteria

- Direct visits and client navigations to supported GIEE pages send at most one
  event per canonical page per UTC day after consent, across reloads and tabs.
- A reload, a second tab, and a back-navigation to an already-reported page send
  no further event that day; the same page on the following UTC day does.
- No analytics request occurs before consent, after rejection, or after
  withdrawal.
- Visits to `/`, `/glqf`, `/ourTeam`, `/privacy`, and every other route outside
  a registered section create no analytics request.
- The database rejects a row whose section is unregistered, and a row whose
  path falls outside its own section, even if application validation were
  bypassed.
- Requests contain exactly an allowlisted path and enabled locale.
- Requests without the current-scope `granted` consent cookie are not counted;
  `denied`, a missing cookie, and a cookie from a superseded consent scope are
  all non-consenting states.
- Invalid methods, content types, oversized bodies, invalid JSON, invalid paths,
  invalid locales, extra fields, and malformed encodings are not counted.
- Server responses do not expose aggregate data, validation details, database
  errors, or credentials.
- PostgreSQL contains only daily aggregate rows and no request metadata.
- Rows older than 90 days are removed.
- Database, application, and platform logs do not retain analytics payloads.
- A database outage or removed endpoint does not make any page fail or visibly
  change.
- Automated tests cover route gating, initial-load delivery, route-change
  deduplication, daily-repeat suppression, UTC day rollover, storage failure
  fallbacks, payload validation, consent behavior, invalid methods,
  invalid paths/locales, database upsert, retention cleanup, rate limiting,
  and storage failure.
- Browser verification confirms no third-party analytics, no pre-consent
  request, correct locale behavior, and no request on non-GIEE pages.
- Privacy-policy translations accurately describe the released behavior.
- Production verification confirms the App Platform service can connect to the
  Managed PostgreSQL cluster using TLS, that trusted sources/private-network
  access is restricted to the application and named operators, and that no
  unrestricted public database access is enabled.

## Implementation checklist

1. Create the DigitalOcean Managed PostgreSQL cluster in the App Platform
   service region.
2. Configure private connectivity, TLS, backups, database roles, and the
   encrypted `DATABASE_URL` and `DATABASE_SSL_CA` runtime variables. Retrieve
   the CA with `doctl databases get-ca`; do not use `rejectUnauthorized: false`.
3. Add the `drizzle-orm` and `drizzle-kit` dependencies, the schema in
   `db/schema.ts`, the generated migrations under `db/migrations/`, and the
   idempotent `npm run db:setup` script. The script loads `.env.local` or
   deployment environment variables, waits for `DATABASE_URL` to accept
   connections, and delegates schema changes to `drizzle-kit migrate` before
   the endpoint is enabled. Application startup must not perform schema
   changes.
4. Implement the consent UI and cookie behavior.
5. Implement canonical path/locale validation in a shared server-safe helper.
6. Implement the route-gated client component and API endpoint.
7. Configure log redaction and the bounded aggregate rate limit.
8. Update the enabled privacy-policy translations.
9. Run the automated tests and browser/network verification.
10. Record database region, backup retention, legal approval, operational
    access, and the release date in the deployment record.

## Adding a tracked section

Measuring a second section is intentionally a multi-part change, so it cannot
happen by accident:

1. Add an entry to `TRACKED_SECTIONS` in `utils/analytics/sections.ts`.
2. Add an `INSERT INTO analytics_sections` in a new custom migration.
3. Update the privacy policy in every enabled locale to name the new section
   and its retention period.
4. Bump `CONSENT_SCOPE_VERSION` in `utils/analytics/consent.ts`, so visitors
   who consented to the narrower scope are asked again rather than silently
   carried over.
5. Optionally add `analytics.sections.<slug>.title` / `.body` to each locale's
   `common.json`; the generic `analytics.*` copy is used otherwise.

Steps 1 and 2 must agree. The application refuses to send an event for an
unregistered path and the database refuses to store one, so a half-finished
change fails closed.

## Verification commands

Run from the repository root:

```sh
npm run lint
npm run test
npm run build
```

The implementation review must also include browser network evidence for a GIEE
page before and after consent, navigation between GIEE pages, consent
withdrawal, and a non-GIEE page. It must include a database query proving that
only aggregate rows exist and that retention cleanup works.

## Local database setup

Put the default local PostgreSQL connection string in `.env.local` as
`DATABASE_URL`:

```env
DATABASE_URL=postgresql://postgres:local@localhost:54329/spec_analytics
```

Then run one command from the repository root:

```sh
npm run db:setup
```

For the default local URL, the command starts or reuses a Docker container
named `spec-analytics-postgres` (creating the database named in
`DATABASE_URL`), waits for PostgreSQL to accept connections, and applies any
pending migrations. Docker must be installed and running. For a DigitalOcean
URL, it only applies migrations and never starts Docker. It does not create
the DigitalOcean Managed PostgreSQL cluster; that is an infrastructure
operation performed once outside the application.

Developers who ran the pre-generalization setup have a `spec-giee-postgres`
container holding port 54329. The setup command adopts it by renaming it to
`spec-analytics-postgres`, so existing local counters survive and no manual
step is needed. If `DATABASE_URL` names a database the adopted container was
not initialized with, the command creates it.

After editing `db/schema.ts`, run `npm run db:generate` to emit a new
migration and commit it. Hand-written SQL that drizzle-kit cannot infer
(seed data, triggers) belongs in a custom migration created with
`npx drizzle-kit generate --custom`.
