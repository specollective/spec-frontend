import nextI18NextConfig from "../../next-i18next.config";

export type TrackedSection = {
  /** Stable key stored in `page_views.section`; matches `analytics_sections.slug`. */
  slug: string;
  /** Locale-free route prefix. Must match `analytics_sections.root_path`. */
  rootPath: string;
  /** Days of daily counters kept for this section before deletion. */
  retentionDays: number;
};

/**
 * The only sections that may be measured. Adding one here is not sufficient:
 * it also needs an `INSERT` into `analytics_sections` in a new migration, a
 * privacy-policy update in every enabled locale, and a bump of
 * CONSENT_SCOPE_VERSION so existing visitors are asked again.
 */
export const TRACKED_SECTIONS: readonly TrackedSection[] = [
  { slug: "giee", rootPath: "/giee", retentionDays: 90 },
];

/** Locales the site actually serves; enabling one needs no change here. */
export const ANALYTICS_LOCALES: readonly string[] = nextI18NextConfig.i18n.locales;

const LOCALE_PREFIX = new RegExp(`^/(${ANALYTICS_LOCALES.join("|")})(?=/|$)`, "i");

/** Strips a leading enabled-locale segment, e.g. `/fr/giee` -> `/giee`. */
export function stripLocalePrefix(pathname: string): string {
  return pathname.replace(LOCALE_PREFIX, "");
}

/** Returns the tracked section a locale-free path belongs to, if any. */
export function findSection(pathname: string): TrackedSection | null {
  return (
    TRACKED_SECTIONS.find(
      ({ rootPath }) =>
        pathname === rootPath || pathname.startsWith(`${rootPath}/`)
    ) ?? null
  );
}

/** Route-level gate for `_app.tsx`, which sees the locale-free `router.pathname`. */
export function isTrackedRoute(pathname: string): boolean {
  return findSection(pathname) !== null;
}

export function isAnalyticsLocale(locale: unknown): locale is string {
  return typeof locale === "string" && ANALYTICS_LOCALES.includes(locale);
}
