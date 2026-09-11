/**
 * Bump whenever the measurement changes shape: TRACKED_SECTIONS grows, the
 * metric changes, or new client-side storage is introduced. Consent was given
 * for a specific set of processing, so changing it must not silently inherit
 * an older choice: a bump changes the cookie name, the old cookie stops being
 * read, and every visitor is asked again.
 *
 * v2: daily unique-visitor measurement replaced raw page views, adding the
 * `analytics-seen` local-storage entry that deduplicates repeat views.
 */
export const CONSENT_SCOPE_VERSION = 2;

export const CONSENT_COOKIE = `analytics-consent-v${CONSENT_SCOPE_VERSION}`;

/** 180 days, matching the lifetime disclosed in the privacy policy. */
export const CONSENT_MAX_AGE_SECONDS = 180 * 24 * 60 * 60;

export type ConsentValue = "granted" | "denied";

const COOKIE_PATTERN = new RegExp(
  `(?:^|;\\s*)${CONSENT_COOKIE}=(granted|denied)(?:;|$)`
);

/**
 * Reads the consent preference from a raw `Cookie` header. Pure and free of
 * browser globals so API routes can import it without pulling client code into
 * the server bundle.
 */
export function parseConsentCookie(header: string | undefined): ConsentValue | null {
  const match = COOKIE_PATTERN.exec(header ?? "");
  return match ? (match[1] as ConsentValue) : null;
}

export function hasGrantedConsent(header: string | undefined): boolean {
  return parseConsentCookie(header) === "granted";
}
