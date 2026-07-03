import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next/pages";
import nextI18NextConfig from "../next-i18next.config";

const NAV_LINKS = [
  { href: "/giee#overview", key: "overview" },
  { href: "/giee#pillars", key: "pillars" },
  { href: "/giee/research", key: "research" },
  { href: "/giee/partner", key: "partner" },
];

function GlobeIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

// Desktop disclosure dropdown. Implemented as a button-triggered panel of
// buttons (rather than a half-finished listbox) so every option is natively
// focusable and operable by keyboard. Selection performs a real locale switch
// via the parent's onChange (router.push with a locale).
function LanguageMenu({
  locales,
  value,
  onChange,
  label,
  buttonLabel,
}: {
  locales: string[];
  value: string;
  onChange: (code: string) => void;
  label: (code: string) => string;
  buttonLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handlePointer = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handlePointer);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handlePointer);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls="giee-language-menu"
        aria-label={buttonLabel}
        className="inline-flex items-center gap-1.5 rounded font-giee-sans text-sm font-medium text-giee-ink-soft transition-colors hover:text-giee-ink"
      >
        <GlobeIcon />
        <span>{value.toUpperCase()}</span>
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div
          id="giee-language-menu"
          className="absolute right-0 mt-2 min-w-[10rem] overflow-hidden rounded-md border border-giee-line bg-giee-paper py-1 shadow-lg"
        >
          {locales.map((code) => {
            const selected = code === value;
            return (
              <button
                key={code}
                type="button"
                onClick={() => {
                  onChange(code);
                  setOpen(false);
                }}
                aria-current={selected ? "true" : undefined}
                className={`flex w-full items-center justify-between gap-3 px-4 py-2 text-left font-giee-sans text-sm transition-colors hover:bg-giee-paper-2 ${
                  selected
                    ? "font-semibold text-giee-ink"
                    : "text-giee-ink-soft"
                }`}
              >
                <span>{label(code)}</span>
                {selected ? (
                  <CheckIcon />
                ) : (
                  <span className="text-xs uppercase tracking-wide text-giee-ink-soft">
                    {code.toUpperCase()}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function Wordmark({
  className = "",
  ariaLabel,
}: {
  className?: string;
  ariaLabel: string;
}) {
  return (
    <Link
      href="/giee"
      className={`group inline-flex items-center ${className}`}
      aria-label={ariaLabel}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/giee-logo.svg"
        alt="GIEE"
        className="h-10 w-auto md:h-12"
      />
    </Link>
  );
}

export default function GieeNavbar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { pathname, asPath, query, locale } = router;
  const { t } = useTranslation("giee");
  const { t: tCommon } = useTranslation("common");

  const locales: string[] = nextI18NextConfig.i18n.locales;
  const activeLocale =
    locale && locales.includes(locale) ? locale : locales[0];

  const languageLabel = (code: string) => tCommon(`languageSwitcher.${code}`);

  // Real locale switch: preserve the current route/query and swap the locale so
  // next-i18next serves the matching catalog. Derived from router.locale — no
  // local mirror of the selection.
  function changeLanguage(nextLocale: string) {
    router.push({ pathname, query }, asPath, { locale: nextLocale });
  }

  useEffect(() => {
    if (!open) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-giee-line bg-giee-paper/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 md:h-20 md:px-10">
        <Wordmark ariaLabel={t("nav.wordmarkAria")} />

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          <nav aria-label={t("nav.ariaLabel")} className="flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-giee-sans text-sm font-medium text-giee-ink-soft transition-colors hover:text-giee-ink"
              >
                {t(`nav.${link.key}`)}
              </a>
            ))}
          </nav>
          {/* Temporarily hidden until Spanish/English translations are ready. */}
          {/* <LanguageMenu
            locales={locales}
            value={activeLocale}
            onChange={changeLanguage}
            label={languageLabel}
            buttonLabel={t("nav.changeLanguage", {
              language: languageLabel(activeLocale),
            })}
          /> */}
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? tCommon("nav.closeMenu") : tCommon("nav.openMenu")}
          aria-expanded={open}
          aria-controls="giee-mobile-nav"
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded text-giee-ink"
        >
          <span className="sr-only">{t("nav.menu")}</span>
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
          >
            {open ? (
              <>
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="18" y1="6" x2="6" y2="18" />
              </>
            ) : (
              <>
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <nav
          id="giee-mobile-nav"
          aria-label={t("nav.mobileAriaLabel")}
          className="border-t border-giee-line bg-giee-paper md:hidden"
        >
          <ul className="flex flex-col p-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded px-4 py-3 font-giee-sans text-base font-medium text-giee-ink hover:bg-giee-paper-2"
                >
                  {t(`nav.${link.key}`)}
                </a>
              </li>
            ))}
          </ul>

          {/* Language options — temporarily hidden until Spanish/English translations are ready. */}
          {/* <div
            role="group"
            aria-label={tCommon("languageSwitcher.label")}
            className="flex items-center gap-2 border-t border-giee-line p-3"
          >
            <GlobeIcon />
            {locales.map((code) => {
              const selected = code === activeLocale;
              return (
                <button
                  key={code}
                  type="button"
                  onClick={() => changeLanguage(code)}
                  aria-pressed={selected}
                  className={`rounded px-3 py-1.5 font-giee-sans text-sm font-medium transition-colors ${
                    selected
                      ? "bg-giee-ink text-giee-paper"
                      : "text-giee-ink-soft hover:bg-giee-paper-2"
                  }`}
                >
                  {code.toUpperCase()}
                  <span className="sr-only"> — {languageLabel(code)}</span>
                </button>
              );
            })}
          </div> */}
        </nav>
      )}
    </header>
  );
}
