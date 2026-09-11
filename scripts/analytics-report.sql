-- Human-readable dump of the aggregate visitor counters.
--
-- Counts are daily unique visitors per page: the client reports a page at
-- most once per visitor per UTC day, so these are not raw page views.
--
-- Run it locally with `just db-report`. It is also safe to run against the
-- managed database from an operator psql session: it only reads, and the
-- counters it prints are the same daily aggregates the privacy policy
-- describes -- no event rows, timestamps, addresses, or identifiers exist to
-- print.

\pset pager off

\echo '== Tracked sections =='
SELECT slug, root_path, retention_days
FROM analytics_sections
ORDER BY slug;

\echo ''
\echo '== Unique visitors by page =='
SELECT section,
       path,
       locale,
       sum(visitors) AS visitors,
       min(day)      AS first_day,
       max(day)      AS last_day
FROM page_views
GROUP BY section, path, locale
ORDER BY visitors DESC, path;

\echo ''
\echo '== Last 14 days =='
SELECT day, section, path, locale, visitors
FROM page_views
WHERE day > CURRENT_DATE - 14
ORDER BY day DESC, visitors DESC, path;

\echo ''
\echo '== Sanity =='
-- out_of_scope and past_retention must both be 0. A non-zero out_of_scope
-- means something stored a path the section trigger should have refused;
-- past_retention means the store's daily sweep is not running.
SELECT
  (SELECT count(*) FROM page_views) AS rows,
  (SELECT coalesce(sum(visitors), 0) FROM page_views) AS total_visitors,
  (SELECT count(*)
     FROM page_views pv
     LEFT JOIN analytics_sections s ON s.slug = pv.section
    WHERE s.slug IS NULL
       OR (pv.path <> s.root_path AND pv.path NOT LIKE s.root_path || '/%')
  ) AS out_of_scope,
  (SELECT count(*)
     FROM page_views pv
     JOIN analytics_sections s ON s.slug = pv.section
    WHERE pv.day < CURRENT_DATE - make_interval(days => s.retention_days)
  ) AS past_retention;

\echo ''
\echo 'No rows? Analytics are opt-in: load a /giee page and choose Accept.'
\echo 'Reloading will NOT add a count -- a page is reported once per visitor'
\echo 'per UTC day. Clear the analytics-seen local-storage entry to re-test.'
