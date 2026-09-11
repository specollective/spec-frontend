import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useTranslation } from "next-i18next/pages";
import type { ConsentValue } from "../utils/analytics/consent";
import {
  readAnalyticsConsent,
  subscribeToAnalyticsConsent,
  writeAnalyticsConsent,
} from "../utils/analytics/consentClient";
import { normalizeAnalyticsPath } from "../utils/analytics/path";
import { clearSeenToday, markSeenToday } from "../utils/analytics/seenToday";
import { isAnalyticsLocale, type TrackedSection } from "../utils/analytics/sections";

// Trailing slash matches next.config.js `trailingSlash: true`; without it every
// beacon pays for a 308 redirect before reaching the handler.
const ENDPOINT = "/api/page-views/";

type Consent = ConsentValue | "undecided" | "loading";

const getClientConsent = () => readAnalyticsConsent() ?? "undecided";
const getServerConsent = () => "loading" as const;

function useConsent(): Consent {
  return useSyncExternalStore(
    subscribeToAnalyticsConsent,
    getClientConsent,
    getServerConsent
  );
}

/**
 * Falls back to the generic copy when a section ships without its own wording,
 * so adding a tracked section never requires new translations up front.
 */
function sectionKeys(key: string, section?: TrackedSection) {
  return section
    ? [`analytics.sections.${section.slug}.${key}`, `analytics.${key}`]
    : `analytics.${key}`;
}

function ConsentPanel({
  consent,
  section,
  onChange,
  isOpen,
  onOpen,
}: {
  consent: Consent;
  section?: TrackedSection;
  onChange: (value: ConsentValue) => void;
  isOpen: boolean;
  onOpen: () => void;
}) {
  const { t } = useTranslation("common");

  if (consent === "loading") return null;

  if (consent !== "undecided" && !isOpen) {
    return (
      <button
        type="button"
        onClick={onOpen}
        className="fixed bottom-4 left-4 z-50 rounded-full border border-giee-ink bg-giee-paper px-4 py-2 font-giee-sans text-sm shadow-md"
      >
        {t("analytics.change")}
      </button>
    );
  }

  return (
    <aside
      aria-label={t(sectionKeys("title", section))}
      className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-2xl rounded-lg border border-giee-line bg-giee-paper p-5 shadow-lg"
    >
      <h2 className="font-giee-serif text-xl">{t(sectionKeys("title", section))}</h2>
      <p className="mt-2 font-giee-sans text-sm leading-relaxed">
        {t(sectionKeys("body", section))}
      </p>
      <Link href="/privacy" className="mt-2 inline-block underline">
        {t("analytics.privacy")}
      </Link>
      <p className="mt-3 font-giee-sans text-sm" aria-live="polite">
        {consent === "granted" || consent === "denied"
          ? t(`analytics.${consent === "granted" ? "enabled" : "disabled"}`)
          : null}
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => onChange("granted")}
          className="rounded bg-giee-ink px-4 py-2 font-giee-sans text-sm text-giee-paper"
        >
          {t("analytics.accept")}
        </button>
        <button
          type="button"
          onClick={() => onChange("denied")}
          className="rounded border border-giee-ink px-4 py-2 font-giee-sans text-sm"
        >
          {t("analytics.reject")}
        </button>
      </div>
    </aside>
  );
}

function useConsentController(onUpdate?: (value: ConsentValue) => void) {
  const consent = useConsent();
  const [isOpen, setIsOpen] = useState(false);

  const update = useCallback(
    (value: ConsentValue) => {
      writeAnalyticsConsent(value);
      setIsOpen(false);
      onUpdate?.(value);
    },
    [onUpdate]
  );

  return { consent, isOpen, open: () => setIsOpen(true), update };
}

/** Consent controls without measurement, for `/privacy`. */
export function AnalyticsConsent() {
  const { consent, isOpen, open, update } = useConsentController();

  return (
    <ConsentPanel
      consent={consent}
      onChange={update}
      isOpen={isOpen}
      onOpen={open}
    />
  );
}

/** Consent controls plus page-view delivery, mounted only on tracked routes. */
export default function Analytics({ section }: { section: TrackedSection }) {
  const router = useRouter();
  // Cheap in-session gate. A Set rather than the last path alone, so
  // /giee -> /giee/research -> back to /giee does not report /giee twice,
  // and so the router-identity change that re-runs the effect on every
  // navigation cannot duplicate the send it already made.
  const sentThisSession = useRef(new Set<string>());

  const { consent, isOpen, open, update } = useConsentController(
    useCallback((value: ConsentValue) => {
      if (value !== "denied") return;
      sentThisSession.current.clear();
      clearSeenToday();
    }, [])
  );

  useEffect(() => {
    if (consent !== "granted") return;

    const send = (asPath: string) => {
      const canonical = normalizeAnalyticsPath(
        new URL(asPath, window.location.origin).pathname
      );
      if (!canonical || !isAnalyticsLocale(router.locale)) return;

      const key = `${canonical.path}|${router.locale}`;
      if (sentThisSession.current.has(key)) return;
      sentThisSession.current.add(key);

      // Survives reloads and is shared across tabs, so one visitor counts
      // once per page per UTC day rather than once per page load.
      if (!markSeenToday(canonical.path, router.locale)) return;
      const body = JSON.stringify({
        path: canonical.path,
        locale: router.locale,
      });
      const blob = new Blob([body], { type: "application/json" });
      if (navigator.sendBeacon) {
        navigator.sendBeacon(ENDPOINT, blob);
      } else {
        void fetch(ENDPOINT, {
          method: "POST",
          body: blob,
          credentials: "same-origin",
          keepalive: true,
        }).catch(() => undefined);
      }
    };

    send(router.asPath);
    const handleRouteChange = (url: string) => send(url);
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => router.events.off("routeChangeComplete", handleRouteChange);
  }, [consent, router]);

  return (
    <ConsentPanel
      consent={consent}
      section={section}
      onChange={update}
      isOpen={isOpen}
      onOpen={open}
    />
  );
}
