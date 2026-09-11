/**
 * Client-side record of which pages this browser already reported today, so a
 * visitor is counted once per path, locale, and UTC day.
 *
 * Local storage rather than a cookie: a cookie carrying this list would be
 * transmitted on every request to the origin, putting a trace of the pages a
 * visitor read on the wire. This never leaves the device. It holds no
 * identifier and only ever describes the current day — the first view after
 * midnight UTC overwrites the previous day's entry outright.
 *
 * It is advisory. The browser decides what to send, so this deduplicates honest
 * repeat views, not deliberate inflation.
 */
const STORAGE_KEY = "analytics-seen";

/** Bounds the entry under any traffic; far above the real page count. */
const MAX_KEYS = 50;

type SeenToday = {
  day: string;
  keys: string[];
};

/**
 * UTC, matching the server's CURRENT_DATE. A local-time day would roll over on
 * a different boundary than the counter row it guards.
 */
function utcDay(): string {
  return new Date().toISOString().slice(0, 10);
}

/** The counter's grain is (day, section, path, locale), so the guard matches it. */
function entryKey(path: string, locale: string): string {
  return `${path}|${locale}`;
}

function read(): SeenToday {
  const today = utcDay();
  try {
    const parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "null");
    if (
      parsed &&
      parsed.day === today &&
      Array.isArray(parsed.keys) &&
      parsed.keys.every((key: unknown) => typeof key === "string")
    ) {
      return parsed as SeenToday;
    }
  } catch {
    // Absent, corrupt, or storage disabled: start the day over.
  }
  return { day: today, keys: [] };
}

/**
 * Records this page as reported and returns whether it is the first time today.
 * Fails open — an unavailable or full store counts the view rather than
 * silently dropping it.
 */
export function markSeenToday(path: string, locale: string): boolean {
  if (typeof window === "undefined") return true;

  const key = entryKey(path, locale);
  const seen = read();
  if (seen.keys.includes(key)) return false;
  if (seen.keys.length >= MAX_KEYS) return true;

  seen.keys.push(key);
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(seen));
  } catch {
    // Quota exceeded or private-mode storage: count the view anyway.
  }
  return true;
}

/** Clears the record; called when consent is withdrawn. */
export function clearSeenToday(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Nothing retrievable to clear.
  }
}
