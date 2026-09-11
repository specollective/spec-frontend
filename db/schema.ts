import { sql } from "drizzle-orm";
import {
  bigint,
  check,
  date,
  integer,
  pgTable,
  primaryKey,
  text,
} from "drizzle-orm/pg-core";

/**
 * Registry of the site sections that may be measured. Collection scope is a
 * privacy control, so it is enforced here (and by the trigger in migration
 * 0001) rather than trusted to application code alone. Adding a section is a
 * deliberate `INSERT` in a new migration plus a matching entry in
 * `utils/analytics/sections.ts` and a privacy-policy update.
 */
export const analyticsSections = pgTable(
  "analytics_sections",
  {
    slug: text("slug").primaryKey(),
    rootPath: text("root_path").notNull().unique(),
    retentionDays: integer("retention_days").notNull().default(90),
  },
  (table) => [
    // Keeps root paths free of LIKE metacharacters so the scope trigger can
    // match descendants with a plain `root_path || '/%'` pattern.
    check("analytics_sections_root_path_shape", sql`${table.rootPath} ~ '^/[a-z0-9-]+$'`),
    check("analytics_sections_retention_positive", sql`${table.retentionDays} > 0`),
  ]
);

/**
 * Daily aggregate counters: one visitor is counted once per path, locale, and
 * UTC day. No event rows, timestamps, addresses, user agents, referrers, or
 * identifiers — see docs/analytics-spec.md.
 */
export const pageViews = pgTable(
  "page_views",
  {
    day: date("day").notNull(),
    section: text("section")
      .notNull()
      .references(() => analyticsSections.slug),
    path: text("path").notNull(),
    locale: text("locale").notNull(),
    visitors: bigint("visitors", { mode: "number" }).notNull().default(0),
  },
  (table) => [
    primaryKey({
      columns: [table.day, table.section, table.path, table.locale],
    }),
    check("page_views_visitors_non_negative", sql`${table.visitors} >= 0`),
  ]
);
