import {
  CONSENT_COOKIE,
  CONSENT_MAX_AGE_SECONDS,
  parseConsentCookie,
  type ConsentValue,
} from "./consent";

const CHANGE_EVENT = "analytics-consent-change";

export function readAnalyticsConsent(): ConsentValue | null {
  if (typeof document === "undefined") return null;
  return parseConsentCookie(document.cookie);
}

export function writeAnalyticsConsent(value: ConsentValue) {
  if (typeof document === "undefined") return;
  document.cookie = `${CONSENT_COOKIE}=${value}; Path=/; Max-Age=${CONSENT_MAX_AGE_SECONDS}; SameSite=Lax${
    window.location.protocol === "https:" ? "; Secure" : ""
  }`;
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function subscribeToAnalyticsConsent(onChange: () => void) {
  if (typeof window === "undefined") return () => undefined;
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => window.removeEventListener(CHANGE_EVENT, onChange);
}
