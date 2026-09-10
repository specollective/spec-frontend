export const GIEE_ANALYTICS_LOCALES = ["en", "fr"] as const;

export type GieeAnalyticsLocale = (typeof GIEE_ANALYTICS_LOCALES)[number];

const LOCALE_PREFIX = new RegExp(
  `^/(${GIEE_ANALYTICS_LOCALES.join("|")})(?=/|$)`,
  "i"
);

export function isGieeRoute(pathname: string): boolean {
  return pathname === "/giee" || pathname.startsWith("/giee/");
}

export function normalizeGieePath(pathname: unknown): string | null {
  if (typeof pathname !== "string" || pathname.length === 0) return null;
  if (pathname.includes("?") || pathname.includes("#")) return null;
  if (/[\\\u0000-\u001f\u007f]/.test(pathname)) return null;
  if (/%2f|%5c/i.test(pathname)) return null;

  let decoded: string;
  try {
    decoded = decodeURIComponent(pathname);
  } catch {
    return null;
  }

  const withoutLocale = decoded.replace(LOCALE_PREFIX, "");
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
        segment.length === 0 || segment === "." || segment === ".." || /[\\\u0000-\u001f\u007f]/.test(segment)
    )
  ) {
    return null;
  }

  return isGieeRoute(canonical) ? canonical : null;
}

export function isGieeAnalyticsLocale(
  locale: unknown
): locale is GieeAnalyticsLocale {
  return (
    typeof locale === "string" &&
    GIEE_ANALYTICS_LOCALES.includes(locale as GieeAnalyticsLocale)
  );
}

export function readAnalyticsConsent(): "granted" | "denied" | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/(?:^|;\s*)giee-analytics=(granted|denied)(?:;|$)/);
  return match ? (match[1] as "granted" | "denied") : null;
}

export function writeAnalyticsConsent(value: "granted" | "denied") {
  if (typeof document === "undefined") return;
  document.cookie = `giee-analytics=${value}; Path=/; Max-Age=${180 * 24 * 60 * 60}; SameSite=Lax${
    window.location.protocol === "https:" ? "; Secure" : ""
  }`;
  window.dispatchEvent(new Event("giee-analytics-change"));
}

export function subscribeToAnalyticsConsent(onChange: () => void) {
  if (typeof window === "undefined") return () => undefined;
  window.addEventListener("giee-analytics-change", onChange);
  return () => window.removeEventListener("giee-analytics-change", onChange);
}
