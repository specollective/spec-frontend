import { useEffect, useId, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next/pages";
import nextI18NextConfig from "../next-i18next.config";
import { GieeMark, ScaledBoard } from "./GieeGlass";
import { TAB_PATH } from "../constants/giee-glass";

// v3 header. It sits over each page's navy hero panel (drawn by GieeHero):
// on desktop it is laid out on the 1440 px board and scales with it; on phones
// it is a compact bar with a menu.

type Section = "home" | "research" | "partner";

function useSection(): Section {
  const { pathname } = useRouter();
  if (pathname.startsWith("/giee/research")) return "research";
  if (pathname.startsWith("/giee/partner")) return "partner";
  return "home";
}

const linkUnderline =
  "bg-[length:0%_1.5px] bg-left-bottom bg-no-repeat [background-image:linear-gradient(currentColor,currentColor)] transition-[background-size] duration-300 ease-giee hover:bg-[length:100%_1.5px]";
const linkCurrent = "bg-[length:100%_1.5px]";

function LanguageLinks({ className = "" }: { className?: string }) {
  const { asPath, locale } = useRouter();
  const { t } = useTranslation("giee");
  const { t: tCommon } = useTranslation("common");
  const locales: string[] = nextI18NextConfig.i18n.locales;
  if (locales.length < 2) return null;
  const active = locale && locales.includes(locale) ? locale : locales[0];
  return (
    <ul
      aria-label={t("nav.language")}
      className={`flex list-none items-center gap-[0.6em] p-0 ${className}`}
    >
      {locales.map((code) => {
        const current = code === active;
        const language = tCommon(`languageSwitcher.${code}`);
        return (
          <li key={code}>
            <Link
              href={asPath}
              locale={code}
              hrefLang={code}
              lang={code}
              aria-current={current ? "true" : undefined}
              aria-label={current ? language : t("nav.switchTo", { language })}
              className={`${linkUnderline} ${current ? linkCurrent : "opacity-75 hover:opacity-100"}`}
            >
              {code.toUpperCase()}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

function Wordmark({ size }: { size: "desktop" | "phone" }) {
  const { t } = useTranslation("giee");
  return (
    <span
      aria-hidden="true"
      className={
        size === "desktop"
          ? "block w-[210px] text-[20.43px] font-bold leading-none tracking-[-0.03em]"
          : "block text-[14px] font-bold leading-none tracking-[-0.02em]"
      }
    >
      {t("nav.wordmarkLine1")}
      <br />
      {t("nav.wordmarkLine2")}
    </span>
  );
}

export default function GieeNavbar() {
  const { t } = useTranslation("giee");
  const { t: tCommon } = useTranslation("common");
  const section = useSection();
  const [open, setOpen] = useState(false);
  const drawerId = useId();
  const router = useRouter();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // Close the phone menu whenever a link inside it navigates.
  useEffect(() => {
    const close = () => setOpen(false);
    router.events?.on("routeChangeStart", close);
    router.events?.on("hashChangeStart", close);
    return () => {
      router.events?.off("routeChangeStart", close);
      router.events?.off("hashChangeStart", close);
    };
  }, [router.events]);

  const links = [
    { href: "/giee#about", label: t("nav.about"), current: false },
    {
      href: "/giee/research",
      label: t("nav.research"),
      current: section === "research",
    },
  ];

  return (
    <header className="giee-on-navy absolute inset-x-0 top-0 z-30 text-giee-cream">
      <div className="relative mx-auto max-w-[1440px]">
        {/* Desktop: on the 1440 board, scaled with the hero below it. */}
        <div className="pointer-events-none hidden lg:block">
          <ScaledBoard width={1440} height={100}>
            <Link
              href="/giee"
              aria-label={t("nav.home")}
              aria-current={section === "home" ? "page" : undefined}
              className="pointer-events-auto absolute left-[57px] top-[50px] flex items-start gap-[12px] rounded-[6px]"
            >
              <GieeMark tone="cream" className="mt-[5px] h-[38px] w-[58px]" />
              <Wordmark size="desktop" />
            </Link>

            <nav
              aria-label={t("nav.ariaLabel")}
              className="pointer-events-auto absolute left-[806px] top-[40px] flex h-[40px] items-center gap-[28px] text-[18px] font-bold uppercase leading-[0.9] tracking-[0.05em]"
            >
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  aria-current={l.current ? "page" : undefined}
                  className={`whitespace-nowrap ${linkUnderline} ${l.current ? linkCurrent : ""}`}
                >
                  {l.label}
                </Link>
              ))}
              <LanguageLinks className="ml-[10px] text-[14px] tracking-[0.06em]" />
            </nav>

            <Link
              href="/giee/partner"
              aria-current={section === "partner" ? "page" : undefined}
              className="pointer-events-auto absolute left-[1127px] top-[20px] h-[80px] w-[274px] bg-giee-navy transition-transform duration-300 ease-giee hover:-translate-y-[2px]"
              style={{ clipPath: `path('${TAB_PATH}')` }}
            >
              <span className="absolute left-[45px] top-[31.75px] whitespace-nowrap text-[18px] font-extrabold uppercase leading-[0.9] tracking-[0.05em]">
                {t("nav.partnerCta")}
              </span>
            </Link>
          </ScaledBoard>
        </div>

        {/* Phone and tablet: a compact bar inside the navy panel. */}
        <div className="mx-[10px] mt-[10px] flex h-[76px] items-center justify-between pl-4 pr-[6px] lg:hidden">
          <Link
            href="/giee"
            aria-label={t("nav.home")}
            className="flex items-center gap-[10px]"
          >
            <GieeMark tone="cream" className="h-[26px] w-[40px] flex-none" />
            <Wordmark size="phone" />
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls={drawerId}
            aria-label={open ? tCommon("nav.closeMenu") : tCommon("nav.openMenu")}
            className="flex h-12 w-12 items-center justify-center"
          >
            <svg
              aria-hidden="true"
              focusable="false"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              {open ? (
                <path
                  d="M6 6l12 12M18 6 6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M3 8h18M3 16h12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>

        <div
          id={drawerId}
          hidden={!open}
          className="absolute inset-x-[10px] top-[86px] z-40 rounded-[0_0_24px_24px] bg-giee-navy px-4 pb-6 pt-2 shadow-[0_24px_48px_-24px_rgba(17,19,34,0.6)] lg:hidden"
        >
          <nav aria-label={t("nav.ariaLabel")}>
            <ul className="flex list-none flex-col p-0 text-[22px] font-bold uppercase tracking-[0.04em]">
              {[
                ...links,
                {
                  href: "/giee/partner",
                  label: t("nav.partnerCta"),
                  current: section === "partner",
                },
              ].map((l) => (
                <li key={l.href} className="border-t border-white/15 first:border-t-0">
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    aria-current={l.current ? "page" : undefined}
                    className="block py-3"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <LanguageLinks className="mt-3 gap-4 border-t border-white/15 pt-4 text-[15px] font-bold" />
        </div>
      </div>
    </header>
  );
}
