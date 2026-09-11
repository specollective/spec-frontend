import { and, eq, sql } from "drizzle-orm";
import { getDb } from "../db/client";
import { pageViews } from "../db/schema";
import { TRACKED_SECTIONS } from "../utils/analytics/sections";

/**
 * UTC day of the last retention sweep in this process. Pruning is a
 * once-a-day job, so running it inside every page view would add a scan and
 * row locks to a request that only needs to increment one counter.
 */
let lastPrunedDay: string | null = null;

function utcDay(): string {
  return new Date().toISOString().slice(0, 10);
}

/**
 * Counts one visitor for this page today. The client suppresses repeats, so
 * a second call for the same visitor and page on the same day does not
 * happen; a second call from a *different* visitor increments normally.
 */
export async function recordPageView(
  section: string,
  path: string,
  locale: string
): Promise<void> {
  const db = getDb();

  await db
    .insert(pageViews)
    .values({ day: sql`CURRENT_DATE`, section, path, locale, visitors: 1 })
    .onConflictDoUpdate({
      target: [pageViews.day, pageViews.section, pageViews.path, pageViews.locale],
      set: { visitors: sql`${pageViews.visitors} + 1` },
    });

  // The counter is already durable; a failed sweep must not surface as a
  // failed page view. It retries on the next request instead.
  await pruneExpiredCounters().catch(() => undefined);
}

async function pruneExpiredCounters(): Promise<void> {
  const today = utcDay();
  if (lastPrunedDay === today) return;
  // Claimed before awaiting so concurrent requests do not all sweep at once.
  lastPrunedDay = today;

  try {
    const db = getDb();
    for (const { slug, retentionDays } of TRACKED_SECTIONS) {
      await db
        .delete(pageViews)
        .where(
          and(
            eq(pageViews.section, slug),
            sql`${pageViews.day} < CURRENT_DATE - make_interval(days => ${retentionDays})`
          )
        );
    }
  } catch (error) {
    lastPrunedDay = null;
    throw error;
  }
}
