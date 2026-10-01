import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next/pages";
import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";
import GieeLayout from "../components/GieeLayout";
import { gieeFont } from "../components/gieeFont";
import GieeHero from "../components/GieeHero";
import GieePartnerLogos from "../components/GieePartnerLogos";
import GieeQuestions, { type HeroQuestion } from "../components/GieeQuestions";
import { GieeArrow, GlassLayers, ScaledBoard } from "../components/GieeGlass";
import {
  LocationChips,
  caseTint,
  type CaseStudy,
} from "../components/GieeCaseStudy";
import { HERO_LAYERS } from "../constants/giee-glass";
import { gieeProjectLd, caseStudyListLd } from "../utils/seo";
import nextI18NextConfig from "../next-i18next.config";

interface Item {
  title: string;
  body: string;
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(
      locale ?? nextI18NextConfig.i18n.defaultLocale,
      ["common", "giee"],
      nextI18NextConfig
    )),
  },
});

// Hero "together" word, set on the 1440 board (desktop) and reused in the
// scaled pebble field on phones. Translations differ in width ("ensemble" is
// wider than "together"), so it shrinks to fit the board once the font is in.
// It is decorative (aria-hidden), so a late resize is harmless.
const TOGETHER_SIZE = 342.45;
const TOGETHER_MEASURE = 1415; // up to the board's right edge

function Together({ word }: { word: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [size, setSize] = useState(TOGETHER_SIZE);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fit = () => {
      const current = el.style.fontSize;
      el.style.fontSize = `${TOGETHER_SIZE}px`;
      const w = el.scrollWidth;
      if (w === 0) {
        // Hidden at this breakpoint; measure when it is shown.
        el.style.fontSize = current;
        return;
      }
      const next = w > TOGETHER_MEASURE ? (TOGETHER_SIZE * TOGETHER_MEASURE) / w : TOGETHER_SIZE;
      el.style.fontSize = `${next}px`;
      setSize(next);
    };
    // Measure with the real font only (never the fallback), so the word is
    // not resized twice.
    if (document.fonts?.load) {
      const family = gieeFont.style.fontFamily.split(",")[0];
      document.fonts.load(`900 100px ${family}`, word).then(fit, fit);
    } else fit();
    // The desktop and phone copies are display:none in turn; refit on resize.
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, [word]);
  return (
    <p
      ref={ref}
      aria-hidden="true"
      style={{ fontSize: size, top: 820.1 + (TOGETHER_SIZE - size) * 0.78 }}
      className="pointer-events-none absolute left-[25px] m-0 whitespace-nowrap font-black leading-none tracking-[-0.05em] text-giee-navy"
    >
      {word}
    </p>
  );
}

// "Find your way in": a marker shape per audience, each a different pebble.
const WAY_IN = [
  { href: "/giee/partner", color: "#DA4792", tint: "#F9DCEA", radius: "5px 5px 22px 5px", phoneRadius: "4px 4px 16px 4px" },
  { href: "/giee/research", color: "#2F4AF4", tint: "#DDE2FE", radius: "22px 5px 5px 5px", phoneRadius: "16px 4px 4px 4px" },
  { href: "/giee#research", color: "#459B3D", tint: "#DCEEDA", radius: "5px 5px 15px 15px", phoneRadius: "4px 4px 11px 11px" },
];

const rowHover =
  "transition-colors duration-[250ms] hover:bg-[var(--tint)] focus-visible:bg-[var(--tint)]";
const arrowSlide =
  "transition-transform duration-[350ms] ease-giee group-hover:translate-x-2 motion-reduce:transform-none";
const sectionPad = "mx-auto max-w-[1440px] px-4 pt-[88px] lg:px-16";
const btnShape =
  "transition-[transform,border-radius] duration-300 ease-giee hover:-translate-y-[2px] hover:!rounded-[26px_10px_26px_26px] motion-reduce:hover:translate-y-0";

export default function GieePage() {
  const { t } = useTranslation("giee");
  const { locale } = useRouter();
  const questions = t("hero.questions", { returnObjects: true }) as HeroQuestion[];
  const wayIn = t("about.wayIn.items", { returnObjects: true }) as Item[];
  const beliefs = t("beliefs.items", { returnObjects: true }) as Item[];
  const studies = t("caseStudies", { returnObjects: true }) as CaseStudy[];
  const titleLines = t("hero.titleLines", { returnObjects: true }) as string[];

  return (
    <GieeLayout
      title={t("meta.home.title")}
      description={t("meta.home.description")}
      fade={1120}
      jsonLd={[
        gieeProjectLd(t, locale),
        caseStudyListLd(studies, locale, t("researchList.title")),
      ]}
    >
      <GieeHero
        id="hero-title"
        titleLines={titleLines}
        fallbackTitle={t("meta.home.title")}
        boardHeight={1262}
        panelHeight={474}
        titleTop={137}
        titleSize={122.93}
        art={
          <>
            <GlassLayers layers={HERO_LAYERS} width={1440} height={1300} />
            <Together word={t("hero.together")} />
            <div
              aria-hidden="true"
              className="absolute left-[41px] top-[1120.5px] h-px w-[1307px] bg-giee-navy"
            />
            <p className="absolute left-[37px] top-[1138px] m-0 w-[250px] text-[14px] font-medium leading-[1.45] text-giee-ink-2">
              {t("hero.lede")}
            </p>
            <div className="absolute left-[644px] top-[1133px] w-[520px]">
              <GieeQuestions questions={questions} size="desktop" />
            </div>
            <p className="absolute left-[1229px] top-[1138px] m-0 w-[170px] text-right text-[14px] font-medium leading-[1.45] text-giee-ink-2">
              {t("hero.initiative")}
            </p>
          </>
        }
        phoneArt={
          <>
            {/* The desktop composition, scaled into a field that tucks under
                the panel (as on the phone board). */}
            <div className="pointer-events-none relative -mt-[38.97%] ml-[-1.54%] w-[103.33%]">
              <ScaledBoard width={1440} height={1157}>
                <GlassLayers layers={HERO_LAYERS} width={1440} height={1300} />
                <Together word={t("hero.together")} />
              </ScaledBoard>
            </div>
            <div className="px-4">
              <div aria-hidden="true" className="h-px bg-giee-navy" />
              <div className="mt-4">
                <GieeQuestions questions={questions} size="phone" />
              </div>
              <p className="mb-0 mt-[14px] text-[13px] font-medium leading-[1.45] text-giee-ink-2">
                {t("hero.lede")} {t("hero.initiative")}.
              </p>
              <Link
                href="/giee/partner"
                className="mt-[22px] flex h-[54px] items-center justify-center rounded-[12px_12px_27px_12px] bg-giee-navy text-[15px] font-extrabold uppercase tracking-[0.05em] text-giee-cream"
              >
                {t("nav.partnerCta")}
              </Link>
            </div>
          </>
        }
      />

      {/* WHAT GIEE DOES */}
      <section
        id="about"
        aria-labelledby="about-title"
        className={`${sectionPad} scroll-mt-6 lg:pt-[152px]`}
      >
        <div aria-hidden="true" className="border-t-2 border-giee-navy" />
        <div className="mt-6 lg:mt-12 lg:grid lg:grid-cols-12 lg:gap-x-6">
          <h2
            id="about-title"
            className="m-0 text-[16px] font-bold leading-[1.3] lg:col-span-2 lg:pt-3 lg:text-[18px]"
          >
            {t("about.title")}
          </h2>
          <p className="mb-0 mt-[14px] text-[26px] font-medium leading-[1.14] tracking-[-0.02em] [text-wrap:pretty] lg:col-span-10 lg:col-start-3 lg:mt-0 lg:text-[48px] lg:leading-[1.1] lg:tracking-[-0.025em]">
            {t("about.body")}
          </p>
        </div>

        <div className="mt-9 lg:mt-[72px] lg:grid lg:grid-cols-12 lg:gap-x-6">
          <GieePartnerLogos className="lg:col-span-10 lg:col-start-3" />
        </div>

        <div className="mt-14 lg:mt-[120px] lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-6">
          <h3 className="m-0 text-[26px] font-bold leading-[1.05] tracking-[-0.02em] lg:col-span-4 lg:pt-[30px] lg:text-[34px] lg:tracking-[-0.025em]">
            {t("about.wayIn.title")}
          </h3>
          <ul className="m-0 mt-4 flex list-none flex-col border-b border-giee-rule p-0 lg:col-span-8 lg:col-start-5 lg:mt-0">
            {wayIn.map((item, i) => {
              const style = WAY_IN[i % WAY_IN.length];
              return (
                <li key={item.title}>
                  <Link
                    href={style.href}
                    style={{ "--tint": style.tint } as React.CSSProperties}
                    className={`group grid grid-cols-[24px_minmax(0,1fr)_40px] items-start gap-x-[14px] border-t border-giee-rule py-5 text-giee-navy lg:grid-cols-[34px_minmax(0,4fr)_minmax(0,6fr)_52px] lg:items-center lg:gap-x-7 lg:px-[22px] lg:py-8 ${rowHover}`}
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[3px] h-[22px] w-[22px] rounded-[var(--pr)] lg:mt-0 lg:h-[30px] lg:w-[30px] lg:rounded-[var(--r)]"
                      style={
                        {
                          background: style.color,
                          "--r": style.radius,
                          "--pr": style.phoneRadius,
                        } as React.CSSProperties
                      }
                    />
                    <span className="flex flex-col gap-[6px] lg:contents">
                      <span className="text-[22px] font-bold leading-[1.1] tracking-[-0.02em] lg:text-[32px] lg:leading-[1.05] lg:tracking-[-0.025em]">
                        {item.title}
                      </span>
                      <span className="text-[15px] leading-[1.45] text-giee-ink-3 lg:text-[18px]">
                        {item.body}
                      </span>
                    </span>
                    <span className="flex h-10 w-10 items-center justify-end lg:h-[52px] lg:w-[52px]">
                      <GieeArrow long className={`h-4 w-[34px] lg:w-10 ${arrowSlide}`} />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* WHAT WE BELIEVE */}
      <section
        id="beliefs"
        aria-labelledby="beliefs-title"
        className={`${sectionPad} scroll-mt-6 lg:pt-[168px]`}
      >
        <div aria-hidden="true" className="border-t-2 border-giee-navy" />
        <div className="mt-6 lg:mt-12 lg:grid lg:grid-cols-12 lg:items-end lg:gap-x-6">
          <h2
            id="beliefs-title"
            className="m-0 text-[44px] font-bold leading-[0.98] tracking-[-0.035em] lg:col-span-7 lg:text-[88px] lg:leading-[0.96]"
          >
            {t("beliefs.title")}
          </h2>
          <p className="mb-0 mt-4 text-[16px] leading-[1.5] text-giee-ink-3 [text-wrap:pretty] lg:col-span-4 lg:col-start-9 lg:mt-0 lg:text-[19px]">
            {t("beliefs.intro")}
          </p>
        </div>

        <ol className="m-0 mt-7 flex list-none flex-col gap-3 p-0 lg:mt-[72px] lg:grid lg:grid-cols-12 lg:grid-rows-[minmax(340px,auto)_minmax(340px,auto)] lg:gap-6">
          {beliefs[0] && (
            <li className="flex flex-col gap-9 rounded-[24px_170px_24px_24px/24px_140px_24px_24px] bg-giee-orange px-6 py-7 lg:col-span-6 lg:row-span-2 lg:justify-between lg:gap-0 lg:rounded-[36px_360px_36px_36px/36px_300px_36px_36px] lg:px-[52px] lg:pb-[52px] lg:pt-12">
              <BeliefNumber n={1} big />
              <div className="flex flex-col gap-9 lg:gap-[22px]">
                <h3 className="m-0 max-w-[250px] text-[32px] font-bold leading-none tracking-[-0.03em] [text-wrap:balance] lg:max-w-[470px] lg:text-[60px] lg:leading-[0.98] lg:tracking-[-0.035em]">
                  {beliefs[0].title}
                </h3>
                <p className="m-0 max-w-[500px] text-[15px] leading-[1.5] text-giee-warm lg:text-[19px]">
                  {beliefs[0].body}
                </p>
              </div>
            </li>
          )}
          {beliefs[1] && (
            <li className="flex flex-col gap-7 rounded-[24px_24px_170px_24px/24px_24px_120px_24px] bg-giee-orange-2 px-6 py-7 lg:col-span-6 lg:col-start-7 lg:row-start-1 lg:flex-row lg:rounded-[36px_36px_300px_36px/36px_36px_250px_36px] lg:px-11 lg:py-10">
              <BeliefNumber n={2} className="lg:order-last" />
              <div className="flex flex-1 flex-col gap-7 lg:max-w-[420px] lg:justify-between">
                <h3 className="m-0 text-[28px] font-bold leading-[1.02] tracking-[-0.025em] lg:max-w-[420px] lg:text-[40px] lg:leading-none lg:tracking-[-0.03em]">
                  {beliefs[1].title}
                </h3>
                <p className="m-0 max-w-[250px] text-[15px] leading-[1.5] text-giee-warm lg:max-w-[390px] lg:text-[17px]">
                  {beliefs[1].body}
                </p>
              </div>
            </li>
          )}
          {beliefs[2] && (
            <li className="flex flex-col items-end gap-7 rounded-[24px_24px_24px_170px/24px_24px_24px_120px] bg-giee-orange-3 px-6 py-7 lg:col-span-6 lg:col-start-7 lg:row-start-2 lg:flex-row lg:items-stretch lg:justify-end lg:rounded-[36px_36px_36px_300px/36px_36px_36px_250px] lg:px-11 lg:py-10">
              <BeliefNumber n={3} className="self-start lg:mr-auto" />
              <div className="flex flex-col gap-7 lg:max-w-[400px] lg:flex-[0_1_400px] lg:justify-between">
                <h3 className="m-0 max-w-[260px] text-[28px] font-bold leading-[1.02] tracking-[-0.025em] lg:max-w-[390px] lg:text-[40px] lg:leading-none lg:tracking-[-0.03em]">
                  {beliefs[2].title}
                </h3>
                <p className="m-0 max-w-[250px] text-[15px] leading-[1.5] text-giee-warm lg:max-w-[390px] lg:text-[17px]">
                  {beliefs[2].body}
                </p>
              </div>
            </li>
          )}
        </ol>
      </section>

      {/* RESEARCH */}
      <section
        id="research"
        aria-labelledby="research-title"
        className={`${sectionPad} scroll-mt-6 lg:pt-[104px]`}
      >
        <div aria-hidden="true" className="border-t-2 border-giee-navy" />
        <div className="mt-6 lg:mt-14 lg:grid lg:grid-cols-12 lg:items-end lg:gap-x-6">
          <h2
            id="research-title"
            className="m-0 text-[44px] font-bold leading-[0.98] tracking-[-0.035em] lg:col-span-8 lg:text-[88px] lg:leading-[0.96]"
          >
            {t("researchList.title")}
          </h2>
          <div className="hidden justify-end pb-2 lg:col-span-3 lg:col-start-10 lg:flex">
            <Link
              href="/giee/research"
              className={`inline-flex h-14 items-center rounded-[10px_10px_28px_10px] px-[26px] text-[17px] font-semibold shadow-[inset_0_0_0_1.5px_#111322] ${btnShape}`}
            >
              {t("researchList.all")}
            </Link>
          </div>
        </div>

        <ol className="m-0 mt-7 list-none border-t-[1.5px] border-giee-navy p-0 lg:mt-[72px]">
          {studies.map((s, i) => (
            <li key={s.slug} className="border-b border-giee-rule">
              <Link
                href={`/giee/research#${s.slug}`}
                style={{ "--tint": caseTint(i) } as React.CSSProperties}
                className={`group grid grid-cols-[minmax(0,1fr)_30px] items-start gap-x-[14px] py-5 text-giee-navy lg:grid-cols-[minmax(0,1fr)_380px_52px] lg:items-center lg:gap-x-8 lg:px-[22px] lg:py-[30px] ${rowHover}`}
              >
                <span className="flex flex-col gap-2">
                  <span className="text-[20px] font-bold leading-[1.1] tracking-[-0.015em] lg:text-[34px] lg:leading-[1.05] lg:tracking-[-0.025em]">
                    {s.name}
                  </span>
                  <span className="text-[14px] leading-[1.45] text-giee-muted lg:text-[17px]">
                    {s.summary}
                  </span>
                  <LocationChips locations={s.locations} size="sm" className="mt-[2px] lg:hidden" />
                </span>
                <LocationChips
                  locations={s.locations}
                  className="hidden justify-end lg:flex"
                />
                <span className="flex items-center justify-end pt-[3px] lg:h-[52px] lg:w-[52px] lg:pt-0">
                  <GieeArrow long className={`h-4 w-[30px] lg:w-10 ${arrowSlide}`} />
                </span>
              </Link>
            </li>
          ))}
        </ol>

        <Link
          href="/giee/research"
          className="mt-6 flex h-[52px] items-center justify-center rounded-[10px_10px_26px_10px] text-[16px] font-semibold shadow-[inset_0_0_0_1.5px_#111322] lg:hidden"
        >
          {t("researchList.all")}
        </Link>
      </section>
    </GieeLayout>
  );
}

function BeliefNumber({
  n,
  big = false,
  className = "",
}: {
  n: number;
  big?: boolean;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={`block text-[110px] font-light leading-[0.74] tracking-[-0.06em] ${
        big ? "-ml-[6px] lg:-ml-3 lg:text-[260px]" : "-ml-[6px] lg:ml-0 lg:text-[170px]"
      } ${className}`}
    >
      {n}
    </span>
  );
}
