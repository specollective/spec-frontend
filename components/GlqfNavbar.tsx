import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next/pages";
import nextI18NextConfig from "../next-i18next.config";

const NAV_LINKS = [
  { href: "/glqf#overview", labelKey: "navbar.overview" },
  { href: "/glqf#constructs", labelKey: "navbar.constructs" },
  { href: "/glqf#domains", labelKey: "navbar.domains" },
  { href: "/glqf#international", labelKey: "navbar.research" },
];

// Switches the active locale while preserving the current GLQF route. Styled to
// match the GLQF navbar rather than reusing the SPEC-branded shared switcher.
function GlqfLanguageSwitcher({ className = "" }: { className?: string }) {
  const router = useRouter();
  const { t } = useTranslation("common");
  const { pathname, asPath, query, locale } = router;
  const locales: string[] = nextI18NextConfig.i18n.locales;

  function changeLanguage(event: React.ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value;
    router.push({ pathname, query }, asPath, { locale: nextLocale });
  }

  return (
    <select
      aria-label={t("languageSwitcher.label")}
      value={locale}
      onChange={changeLanguage}
      className={`cursor-pointer border border-glqf-line bg-glqf-paper px-2 py-1 font-montserrat text-sm font-medium text-glqf-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-glqf-accent ${className}`}
    >
      {locales.map((lng) => (
        <option key={lng} value={lng}>
          {t(`languageSwitcher.${lng}`)}
        </option>
      ))}
    </select>
  );
}

function Wordmark({
  className = "",
  label,
}: {
  className?: string;
  label: string;
}) {
  return (
    <Link
      href="/glqf"
      className={`group inline-flex items-baseline gap-3 ${className}`}
      aria-label={label}
    >
      <span className="font-dmserif text-2xl leading-none tracking-tight text-glqf-ink md:text-3xl">
        GLQF
      </span>
    </Link>
  );
}

export default function GlqfNavbar() {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation("glqf");
  const { t: tCommon } = useTranslation("common");

  useEffect(() => {
    if (!open) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-glqf-line bg-glqf-paper/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 md:h-20 md:px-10">
        <Wordmark label={t("navbar.wordmarkLabel")} />

        {/* Desktop nav */}
        <nav
          aria-label={t("navbar.navLabel")}
          className="hidden items-center gap-8 md:flex"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-montserrat text-sm font-medium text-glqf-ink-soft transition-colors hover:text-glqf-ink"
            >
              {t(link.labelKey)}
            </a>
          ))}
          <GlqfLanguageSwitcher />
        </nav>

        {/* Mobile controls */}
        <div className="flex items-center gap-3 md:hidden">
          <GlqfLanguageSwitcher />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? tCommon("nav.closeMenu") : tCommon("nav.openMenu")}
            aria-expanded={open}
            aria-controls="glqf-mobile-nav"
            className="inline-flex h-10 w-10 items-center justify-center rounded text-glqf-ink"
          >
            <span className="sr-only">{t("navbar.menu")}</span>
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
      </div>

      {/* Mobile drawer */}
      {open && (
        <nav
          id="glqf-mobile-nav"
          aria-label={t("navbar.mobileNavLabel")}
          className="border-t border-glqf-line bg-glqf-paper md:hidden"
        >
          <ul className="flex flex-col p-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded px-4 py-3 font-montserrat text-base font-medium text-glqf-ink hover:bg-glqf-paper-2"
                >
                  {t(link.labelKey)}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
