import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next/pages";
import nextI18NextConfig from "../next-i18next.config";
import { GieeMark, ScaledBoard } from "./GieeGlass";
import { TAB_PATH } from "../constants/giee-glass";

// v3 header, fixed to the top of the viewport.
//
// On load it sits on the page's navy hero panel. As you scroll, that panel
// morphs into the header: its top stays put while its bottom edge rides up
// with the page, until only a compact band is left (80 board px on desktop,
// 76 px on phones). The panel's corner radii shrink with it, so the compact
// header keeps the panel's big bottom-right curve. Scrolling back up reverses
// it.
//
// The panel is drawn twice, from the same geometry:
//   1. behind the page content (so the hero's glass pieces still overlap it),
//   2. clipped to the top band, above the page content (so whatever scrolls
//      up passes under the header).
// Together they read as one shape. The in-page panels in GieeHero
// ([data-giee-panel]) stay as the no-JS fallback and as the measurement
// source, and are hidden once the morph is running.

type Section = "home" | "research" | "partner";

const DESKTOP_BAND = 80; // compact height on the 1440 board (panel top is at 20)
const PHONE_BAND = 76; // compact height in CSS px (panel top is at 10)

function useSection(): Section {
  const { pathname } = useRouter();
  if (pathname.startsWith("/giee/research")) return "research";
  if (pathname.startsWith("/giee/partner")) return "partner";
  return "home";
}

const linkUnderline =
  "bg-[length:0%_1.5px] bg-left-bottom bg-no-repeat [background-image:linear-gradient(currentColor,currentColor)] transition-[background-size] duration-300 ease-giee hover:bg-[length:100%_1.5px]";
const linkCurrent = "bg-[length:100%_1.5px]";

function useLocales() {
  const { locale } = useRouter();
  const locales: string[] = nextI18NextConfig.i18n.locales;
  const active = locale && locales.includes(locale) ? locale : locales[0];
  return { locales, active };
}

/** Desktop: every language inline, in the nav. */
function LanguageLinks({ className = "" }: { className?: string }) {
  const { asPath } = useRouter();
  const { t } = useTranslation("giee");
  const { t: tCommon } = useTranslation("common");
  const { locales, active } = useLocales();
  if (locales.length < 2) return null;
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

/** Phone: a small "EN ▾" pill that opens the list of languages. */
function LanguageMenu() {
  const { asPath, events } = useRouter();
  const { t } = useTranslation("giee");
  const { t: tCommon } = useTranslation("common");
  const { locales, active } = useLocales();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const listId = useId();

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    const close = () => setOpen(false);
    events?.on("routeChangeStart", close);
    return () => events?.off("routeChangeStart", close);
  }, [events]);

  if (locales.length < 2) return null;
  const activeName = tCommon(`languageSwitcher.${active}`);
  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={listId}
        aria-label={`${t("nav.language")}: ${activeName}`}
        className="flex h-9 items-center gap-1 rounded-[8px_8px_16px_8px] px-[10px] text-[13px] font-bold tracking-[0.04em] shadow-[inset_0_0_0_1.5px_rgba(241,236,219,0.35)] transition-colors hover:bg-white/10"
      >
        {active.toUpperCase()}
        <svg
          aria-hidden="true"
          focusable="false"
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <path d="M2 3.5 5 6.5 8 3.5" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      </button>
      <ul
        id={listId}
        hidden={!open}
        aria-label={t("nav.language")}
        className="absolute right-0 top-[calc(100%+8px)] m-0 min-w-[150px] list-none rounded-[12px_12px_24px_12px] bg-giee-navy p-1.5 shadow-[0_18px_40px_-18px_rgba(17,19,34,0.7)] ring-1 ring-white/15"
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
                className={`flex items-center justify-between gap-4 rounded-[8px] px-3 py-2.5 text-[15px] font-medium hover:bg-white/10 ${
                  current ? "bg-white/10" : ""
                }`}
              >
                {language}
                <span className="text-[12px] font-bold tracking-[0.06em] opacity-60">
                  {code.toUpperCase()}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
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
          : "hidden text-[14px] font-bold leading-none tracking-[-0.02em] min-[430px]:block"
      }
    >
      {t("nav.wordmarkLine1")}
      <br />
      {t("nav.wordmarkLine2")}
    </span>
  );
}

/** Drives the morph: writes the panel heights as CSS variables on scroll. */
function useHeaderMorph(
  rootRef: React.RefObject<HTMLDivElement | null>,
  boardRef: React.RefObject<HTMLDivElement | null>,
) {
  useEffect(() => {
    const root = rootRef.current;
    const desktopPanel = document.querySelector<HTMLElement>('[data-giee-panel="desktop"]');
    const phonePanel = document.querySelector<HTMLElement>('[data-giee-panel="phone"]');
    if (!root || (!desktopPanel && !phonePanel)) return;

    const desktopHeight = Number(desktopPanel?.dataset.h) || DESKTOP_BAND;
    let phoneHeight = PHONE_BAND;
    let scale = 1; // rendered board width / 1440
    let raf = 0;
    const wide = window.matchMedia?.("(min-width: 1024px)");

    const measure = () => {
      if (phonePanel && phonePanel.offsetHeight) phoneHeight = phonePanel.offsetHeight;
      scale = (boardRef.current?.offsetWidth || 1440) / 1440;
    };
    const update = () => {
      raf = 0;
      const y = Math.max(0, window.scrollY);
      const ph = Math.max(DESKTOP_BAND, desktopHeight - y / scale);
      const mh = Math.max(PHONE_BAND, phoneHeight - y);
      const compact = (wide?.matches ?? true) ? ph <= DESKTOP_BAND : mh <= PHONE_BAND;
      root.style.setProperty("--ph", `${ph}px`);
      root.style.setProperty("--mh", `${mh}px`);
      root.dataset.compact = compact ? "true" : "false";
      root.dataset.scrolled = y > 2 ? "true" : "false";
    };
    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(update);
    };
    const onResize = () => {
      measure();
      update();
    };

    measure();
    update();
    const page = root.closest(".giee");
    page?.classList.add("giee-morph");
    root.dataset.morph = "on";

    // The phone panel's height follows its title (fonts, language, width).
    const ro =
      phonePanel && "ResizeObserver" in window ? new ResizeObserver(onResize) : null;
    if (phonePanel) ro?.observe(phonePanel);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      ro?.disconnect();
      if (raf) window.cancelAnimationFrame(raf);
      page?.classList.remove("giee-morph");
      delete root.dataset.morph;
    };
  }, [rootRef, boardRef]);
}

export default function GieeNavbar() {
  const { t } = useTranslation("giee");
  const { t: tCommon } = useTranslation("common");
  const section = useSection();
  const [open, setOpen] = useState(false);
  const drawerId = useId();
  const router = useRouter();
  const rootRef = useRef<HTMLDivElement>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  useHeaderMorph(rootRef, boardRef);

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

  // Until the morph is measured (and without JS) the in-page panels show.
  const shown = "opacity-0 group-data-[morph=on]/morph:opacity-100";
  const compactShadow =
    "opacity-0 transition-opacity duration-300 group-data-[compact=true]/morph:opacity-100";

  return (
    <div
      ref={rootRef}
      data-compact="false"
      className="group/morph contents"
      style={{ "--ph": "474px", "--mh": "320px" } as CSSProperties}
    >
      {/* 1. The morphing panel, behind the page content. */}
      <div aria-hidden="true" className={`pointer-events-none fixed inset-x-0 top-0 z-[1] ${shown}`}>
        <div className="mx-auto hidden max-w-[1440px] lg:block">
          <ScaledBoard width={1440} height={100}>
            <div className="absolute left-[20px] top-[20px] h-[var(--ph)] w-[1100px] rounded-[36px_36px_300px_36px] bg-giee-navy" />
          </ScaledBoard>
        </div>
        <div className="absolute inset-x-[10px] top-[10px] h-[var(--mh)] rounded-[24px_24px_130px_24px] bg-giee-navy lg:hidden" />
      </div>

      {/* 2. The header: the panel's top band, above the page content. */}
      <header className="giee-on-navy pointer-events-none fixed inset-x-0 top-0 z-50 text-giee-cream">
        {/* A soft fade of the page ground above the floating header, so content
            passing through the gap at the very top doesn't read as clutter. */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-giee-ground via-giee-ground/80 to-transparent opacity-0 transition-opacity duration-300 group-data-[scrolled=true]/morph:opacity-100 lg:h-9"
        />
        <div ref={boardRef} className="relative mx-auto max-w-[1440px]">
          {/* Desktop: on the 1440 board, scaled with the hero below it. */}
          <div className="hidden lg:block">
            <ScaledBoard width={1440} height={100}>
              <div
                aria-hidden="true"
                className={`absolute left-[20px] top-[20px] h-[80px] w-[1100px] rounded-[36px_36px_300px_36px] shadow-[0_22px_44px_-22px_rgba(17,19,34,0.55)] ${compactShadow}`}
              />
              <div
                aria-hidden="true"
                className={`pointer-events-auto absolute left-[20px] top-[20px] h-[var(--ph)] w-[1100px] rounded-[36px_36px_300px_36px] bg-giee-navy [clip-path:inset(0_0_calc(var(--ph)_-_80px)_0)] ${shown}`}
              />

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
                className="pointer-events-auto absolute right-[350px] top-[40px] flex h-[40px] items-center gap-[28px] text-[18px] font-bold uppercase leading-[0.9] tracking-[0.05em]"
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

              {/* The "Partner with us" tab stays its own shape beside the panel. */}
              <div
                aria-hidden="true"
                className={`absolute left-[1127px] top-[20px] h-[80px] w-[274px] drop-shadow-[0_18px_22px_rgba(17,19,34,0.32)] ${compactShadow}`}
              >
                <div className="h-full w-full bg-giee-navy" style={{ clipPath: `path('${TAB_PATH}')` }} />
              </div>
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

          {/* Phone and tablet: a compact bar with three small buttons. */}
          <div className="relative lg:hidden">
            <div
              aria-hidden="true"
              className={`absolute inset-x-[10px] top-[10px] h-[76px] rounded-[24px_24px_130px_24px] shadow-[0_18px_36px_-18px_rgba(17,19,34,0.55)] ${compactShadow}`}
            />
            <div
              aria-hidden="true"
              className={`pointer-events-auto absolute inset-x-[10px] top-[10px] h-[var(--mh)] rounded-[24px_24px_130px_24px] bg-giee-navy [clip-path:inset(0_0_calc(var(--mh)_-_76px)_0)] ${shown}`}
            />
            <div className="pointer-events-auto relative mx-[10px] mt-[10px] flex h-[76px] items-center justify-between gap-2 pl-4 pr-[10px]">
              <Link
                href="/giee"
                aria-label={t("nav.home")}
                className="flex min-w-0 items-center gap-[10px]"
              >
                <GieeMark tone="cream" className="h-[26px] w-[40px] flex-none" />
                <Wordmark size="phone" />
              </Link>
              <div className="flex flex-none items-center gap-[6px]">
                <LanguageMenu />
                <Link
                  href="/giee/partner"
                  aria-current={section === "partner" ? "page" : undefined}
                  className="flex h-9 items-center whitespace-nowrap rounded-[8px_8px_18px_8px] bg-giee-cream px-3 text-[13px] font-bold text-giee-navy transition-transform duration-200 hover:-translate-y-px"
                >
                  {t("nav.partnerShort")}
                </Link>
                <button
                  type="button"
                  onClick={() => setOpen((v) => !v)}
                  aria-expanded={open}
                  aria-controls={drawerId}
                  aria-label={open ? tCommon("nav.closeMenu") : tCommon("nav.openMenu")}
                  className="flex h-10 w-10 items-center justify-center rounded-[10px] transition-colors hover:bg-white/10"
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
            </div>

            <div
              id={drawerId}
              hidden={!open}
              className="pointer-events-auto absolute inset-x-[10px] top-[86px] z-40 rounded-[0_0_24px_24px] bg-giee-navy px-4 pb-5 pt-2 shadow-[0_24px_48px_-24px_rgba(17,19,34,0.6)]"
            >
              <nav aria-label={t("nav.ariaLabel")}>
                <ul className="m-0 flex list-none flex-col p-0 text-[22px] font-bold uppercase tracking-[0.04em]">
                  {links.map((l) => (
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
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
