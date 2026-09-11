import { findSection, stripLocalePrefix, type TrackedSection } from "./sections";

export type CanonicalPageView = {
  section: TrackedSection;
  path: string;
};

/** Backslashes and control characters, never valid inside a stored path. */
const UNSAFE_CHARACTERS = /[\\\u0000-\u001f\u007f]/;

/**
 * Canonicalizes a browser pathname and confirms it falls inside a tracked
 * section. Unsafe or out-of-scope input returns null rather than being
 * repaired, so nothing outside the allowlist can be stored.
 */
export function normalizeAnalyticsPath(
  pathname: unknown
): CanonicalPageView | null {
  if (typeof pathname !== "string" || pathname.length === 0) return null;
  if (pathname.includes("?") || pathname.includes("#")) return null;
  if (UNSAFE_CHARACTERS.test(pathname)) return null;
  if (/%2f|%5c/i.test(pathname)) return null;

  let decoded: string;
  try {
    decoded = decodeURIComponent(pathname);
  } catch {
    return null;
  }

  const withoutLocale = stripLocalePrefix(decoded);
  if (!withoutLocale.startsWith("/") || withoutLocale.includes("//")) {
    return null;
  }

  const canonical =
    withoutLocale.length > 1 && withoutLocale.endsWith("/")
      ? withoutLocale.slice(0, -1)
      : withoutLocale;

  const segments = canonical.split("/").slice(1);
  if (
    segments.some(
      (segment) =>
        segment.length === 0 ||
        segment === "." ||
        segment === ".." ||
        UNSAFE_CHARACTERS.test(segment)
    )
  ) {
    return null;
  }

  const section = findSection(canonical);
  return section ? { section, path: canonical } : null;
}
