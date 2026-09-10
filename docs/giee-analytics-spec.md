# GIEE Privacy-First Analytics Specification

Status: Ready for implementation
Scope: `/giee`, `/giee/research`, `/giee/partner`, and future descendants of `/giee`
Out of scope: Every other route, including `/`, `/glqf`, and `/ourTeam`

## Decision summary

The first release will use a small first-party page-view counter implemented in
the existing Next.js application. It will use explicit opt-in consent and a
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
   route is `/giee` or a descendant of `/giee`.
2. `components/GieeAnalytics.tsx` owns consent display, consent-cookie
   handling, initial page-view delivery, and client-side route-change delivery.
3. `pages/api/giee-analytics.ts` accepts and validates page-view requests and
   performs the aggregate database upsert.
4. `service/gieeAnalyticsStore.ts` owns the PostgreSQL connection and SQL. It
   must not be imported by browser code.
5. `public/locales/en/privacy.json` and `public/locales/fr/privacy.json` are
   updated before release. Spanish is not a supported application locale until
   it is re-enabled in `next-i18next.config.js`.

Use the open-source `pg` Node package rather than an ORM. Reuse pooled
connections and configure the pool for the single App Platform service and
the expected database connection limit.

The application connects to a DigitalOcean Managed PostgreSQL cluster in the
same region as the App Platform service. The encrypted `DATABASE_URL` runtime
environment variable is configured in DigitalOcean and is never committed to
the repository or exposed to the browser. TLS must be enabled for the
connection. Database access is limited to the application service and the
named service owner/operator accounts.

## Consent decision

The initial release requires explicit opt-in consent. No analytics request is
allowed while consent is undecided or rejected.

The consent UI must:

- appear on every supported GIEE page when consent is undecided;
- state that anonymous aggregate page-view measurement is being requested;
- provide equally prominent `Accept` and `Reject` actions;
- provide a link to the localized privacy policy;
- remain keyboard accessible and usable on mobile;
- allow the choice to be changed from `/privacy`.

On acceptance or rejection, set one first-party consent-preference cookie:

```text
giee-analytics=granted
```

The value must be either `granted` or `denied`; no other value is valid.

The cookie must use `Path=/`, `SameSite=Lax`, `Secure` in production, and a
defined finite lifetime of 180 days. It contains no identifier or timestamp.
The `denied` value is a strictly necessary preference cookie, not a tracking
cookie. Withdrawal changes the value to `denied`. A missing cookie means
undecided and must show the consent UI. Withdrawal prevents all future
requests; previously stored aggregate counters are not attributed to a person
and are not deleted on withdrawal.

The consent UI may be implemented without a dependency. Do not use local
storage, a tracking cookie, a fingerprint, or a persistent client identifier.

## Event lifecycle

After consent is granted:

- send one page-view event after the initial page has mounted;
- send one event after each completed client-side history navigation to a new
  canonical page;
- do not send an event for a failed navigation, hash-only change, query-only
  change, or repeated render of the same history entry;
- do not send an event on routes outside `/giee`;
- do not retry failed events.

The implementation must guard against duplicate initial effects and React
Strict Mode behavior. A best-effort in-memory reference may be used for this
deduplication; it must not be persisted or sent to the server.

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

The endpoint must also require the `giee-analytics=granted` cookie. Direct
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

The endpoint intentionally does not attempt visitor deduplication. A public,
anonymous counter can be inflated by automation; the resulting metric is
directional page-view volume, not a unique-visitor or security metric.

## PostgreSQL storage

Create one database table:

```sql
CREATE TABLE giee_page_views (
  day date NOT NULL,
  path text NOT NULL,
  locale text NOT NULL,
  views bigint NOT NULL DEFAULT 0,
  PRIMARY KEY (day, path, locale),
  CHECK (path = '/giee' OR path LIKE '/giee/%'),
  CHECK (locale IN ('en', 'fr')),
  CHECK (views >= 0)
);
```

Configure the PostgreSQL application role/session to use UTC before any query
is executed. For each accepted event, execute an atomic upsert using that UTC
database day:

```sql
INSERT INTO giee_page_views (day, path, locale, views)
VALUES (CURRENT_DATE, $1, $2, 1)
ON CONFLICT (day, path, locale)
DO UPDATE SET views = giee_page_views.views + 1;
```

Do not create an event-level table. Do not store request timestamps, IP
addresses, user agents, referrers, cookies, identifiers, or raw payloads.

Delete rows older than 90 days. Cleanup may run opportunistically after a
successful upsert, but it must be bounded and safe under concurrent requests:

```sql
DELETE FROM giee_page_views
WHERE day < CURRENT_DATE - INTERVAL '90 days';
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

## Privacy and compliance

Before deployment, the product/privacy owner must record the legal basis for
this explicit opt-in measurement and confirm the jurisdictions served.

The localized privacy policy must accurately state:

- the purpose: anonymous aggregate measurement of GIEE page usage;
- the fields: canonical path, supported locale, and aggregate count;
- that consent is optional and can be withdrawn from the privacy page;
- the consent cookie name, purpose, and 180-day lifetime;
- DigitalOcean Managed PostgreSQL as the hosting/processing location;
- the absence of unique-visitor measurement and profiling;
- daily-counter retention of 90 days;
- backup retention and the responsible operator contact;
- the applicable legal basis and user rights.

The existing statement that SPEC uses no analytics must be removed or revised
in every enabled locale before release.

## Acceptance criteria

- Direct visits and client navigations to supported GIEE pages send at most one
  event per canonical page/history entry after consent.
- No analytics request occurs before consent, after rejection, or after
  withdrawal.
- Visits to `/`, `/glqf`, `/ourTeam`, `/privacy`, and every other non-GIEE route
  create no analytics request.
- Requests contain exactly an allowlisted path and enabled locale.
- Requests without the `giee-analytics=granted` consent cookie are not counted;
  `giee-analytics=denied` and a missing cookie are both non-consenting states.
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
  deduplication, payload validation, consent behavior, invalid methods,
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
   encrypted `DATABASE_URL` runtime variable.
3. Add the `pg` dependency, `db/migrations/001_giee_page_views.sql`, and the
   idempotent `npm run giee:db:setup` script. The script loads `.env.local` or
   deployment environment variables, connects to `DATABASE_URL`, and applies
   the migration before the endpoint is enabled. Application startup must not
   perform schema changes. `giee:db:migrate` remains an alias for the setup
   command.
4. Implement the consent UI and cookie behavior.
5. Implement canonical path/locale validation in a shared server-safe helper.
6. Implement the route-gated client component and API endpoint.
7. Configure log redaction and the bounded aggregate rate limit.
8. Update the enabled privacy-policy translations.
9. Run the automated tests and browser/network verification.
10. Record database region, backup retention, legal approval, operational
    access, and the release date in the deployment record.

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

After a local PostgreSQL instance is available, put its connection string in
`.env.local` as `DATABASE_URL`. Then run one command from the repository root:

```sh
npm run giee:db:setup
```

This creates the table idempotently. It does not provision PostgreSQL itself or
create the DigitalOcean Managed PostgreSQL cluster; those are infrastructure
operations performed once outside the application.
