import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useTranslation } from "next-i18next/pages";
import {
  isGieeAnalyticsLocale,
  normalizeGieePath,
  readAnalyticsConsent,
  subscribeToAnalyticsConsent,
  writeAnalyticsConsent,
} from "../utils/gieeAnalytics";

type Consent = "granted" | "denied" | "undecided" | "loading";

const getClientConsent = () => readAnalyticsConsent() ?? "undecided";
const getServerConsent = () => "loading" as const;

function useConsent(): Consent {
  return useSyncExternalStore(
    subscribeToAnalyticsConsent,
    getClientConsent,
    getServerConsent
  );
}

function ConsentPanel({
  consent,
  onChange,
  isOpen,
  onOpen,
}: {
  consent: Consent;
  onChange: (value: "granted" | "denied") => void;
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
        {t("gieeAnalytics.change")}
      </button>
    );
  }

  return (
    <aside
      aria-label={t("gieeAnalytics.title")}
      className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-2xl rounded-lg border border-giee-line bg-giee-paper p-5 shadow-lg"
    >
      <h2 className="font-giee-serif text-xl">{t("gieeAnalytics.title")}</h2>
      <p className="mt-2 font-giee-sans text-sm leading-relaxed">
        {t("gieeAnalytics.body")}
      </p>
      <Link href="/privacy" className="mt-2 inline-block underline">
        {t("gieeAnalytics.privacy")}
      </Link>
      <p className="mt-3 font-giee-sans text-sm" aria-live="polite">
        {consent === "granted" || consent === "denied"
          ? t(`gieeAnalytics.${consent === "granted" ? "enabled" : "disabled"}`)
          : null}
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => onChange("granted")}
          className="rounded bg-giee-ink px-4 py-2 font-giee-sans text-sm text-giee-paper"
        >
          {t("gieeAnalytics.accept")}
        </button>
        <button
          type="button"
          onClick={() => onChange("denied")}
          className="rounded border border-giee-ink px-4 py-2 font-giee-sans text-sm"
        >
          {t("gieeAnalytics.reject")}
        </button>
      </div>
    </aside>
  );
}

export function GieeAnalyticsConsent() {
  const consent = useConsent();
  const [isOpen, setIsOpen] = useState(false);

  function updateConsent(value: "granted" | "denied") {
    writeAnalyticsConsent(value);
    setIsOpen(false);
  }

  return (
    <ConsentPanel
      consent={consent}
      onChange={updateConsent}
      isOpen={isOpen}
      onOpen={() => setIsOpen(true)}
    />
  );
}

export default function GieeAnalytics() {
  const router = useRouter();
  const consent = useConsent();
  const [isOpen, setIsOpen] = useState(false);
  const lastSentPath = useRef<string | null>(null);

  useEffect(() => {
    if (consent !== "granted") return;

    const send = (asPath: string) => {
      const path = normalizeGieePath(new URL(asPath, window.location.origin).pathname);
      if (!path || path === lastSentPath.current || !isGieeAnalyticsLocale(router.locale)) return;

      lastSentPath.current = path;
      const body = JSON.stringify({ path, locale: router.locale });
      const blob = new Blob([body], { type: "application/json" });
      if (navigator.sendBeacon) {
        navigator.sendBeacon("/api/giee-analytics", blob);
      } else {
        void fetch("/api/giee-analytics", {
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

  function updateConsent(value: "granted" | "denied") {
    writeAnalyticsConsent(value);
    setIsOpen(false);
    if (value === "denied") lastSentPath.current = null;
  }

  return (
    <ConsentPanel
      consent={consent}
      onChange={updateConsent}
      isOpen={isOpen}
      onOpen={() => setIsOpen(true)}
    />
  );
}
