import Link from "next/link";
import type { GetStaticProps } from "next";
import { Trans, useTranslation } from "next-i18next/pages";
import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";
import GieeLayout from "../components/GieeLayout";
import GieePartnerLogos from "../components/GieePartnerLogos";
import nextI18NextConfig from "../next-i18next.config";

interface Pillar {
  name: string;
  description: string;
}

interface Initiative {
  name: string;
  description: string;
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

function Eyebrow({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`font-giee-sans text-xs font-semibold uppercase tracking-[0.22em] text-giee-accent md:text-sm ${className}`}
    >
      {children}
    </h2>
  );
}

function ChevronDown({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function ArrowRight({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

export default function GieePage() {
  const { t } = useTranslation("giee");
  const pillars = t("home.pillars.items", { returnObjects: true }) as Pillar[];
  const initiatives = t("home.initiatives.items", {
    returnObjects: true,
  }) as Initiative[];
  return (
    <GieeLayout title={t("pageTitle")} description={t("home.hero.subtitle")}>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-giee-paper">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-giee-line"
        />
        <div className="relative mx-auto flex min-h-[82vh] max-w-5xl flex-col items-center justify-center px-6 pb-28 pt-24 text-center md:pt-32">
          <h1 className="font-giee-serif text-4xl leading-[1.05] text-giee-ink md:text-6xl lg:text-7xl">
            <Trans i18nKey="home.hero.title" t={t} />
          </h1>
          <p className="mt-8 max-w-2xl font-giee-sans text-lg leading-relaxed text-giee-ink-soft md:text-xl">
            {t("home.hero.subtitle")}
          </p>
          <div className="mt-12 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
            <a
              href="#overview"
              className="inline-flex w-full items-center justify-center bg-giee-green px-8 py-4 font-giee-sans text-base font-semibold text-giee-white transition-colors hover:bg-giee-green/90 sm:w-auto sm:min-w-[14rem]"
            >
              {t("home.hero.explore")}
            </a>
            <a
              href="#pillars"
              className="inline-flex w-full items-center justify-center border-2 border-giee-ink bg-transparent px-8 py-4 font-giee-sans text-base font-semibold text-giee-ink transition-colors hover:bg-giee-ink hover:text-giee-paper sm:w-auto sm:min-w-[14rem]"
            >
              {t("home.hero.pillarsCta")}
            </a>
          </div>
        </div>

        <a
          href="#overview"
          aria-label={t("home.hero.scrollAria")}
          className="group absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-giee-slate transition-colors hover:text-giee-ink md:flex"
        >
          <span className="font-giee-sans text-[11px] uppercase tracking-[0.25em]">
            {t("home.hero.scroll")}
          </span>
          <ChevronDown className="h-5 w-5 animate-bounce" />
        </a>
      </section>

      {/* OVERVIEW */}
      <section
        id="overview"
        className="scroll-mt-24 bg-giee-white px-6 py-24 md:py-32"
      >
        <div className="mx-auto max-w-3xl">
          <Eyebrow>{t("home.overview.eyebrow")}</Eyebrow>
          <p className="mt-8 font-giee-sans text-lg leading-relaxed text-giee-ink-soft md:text-xl">
            {t("home.overview.p1")}
          </p>
          <p className="mt-6 font-giee-sans text-lg leading-relaxed text-giee-ink-soft md:text-xl">
            {t("home.overview.p2")}
          </p>
        </div>
      </section>

      {/* PARTNERS */}
      <section
        id="partners"
        className="scroll-mt-24 bg-giee-white px-6 pb-24 pt-4 md:pb-32"
      >
        <div className="mx-auto max-w-6xl">
          <GieePartnerLogos />
        </div>
      </section>

      {/* PILLARS */}
      <section
        id="pillars"
        className="scroll-mt-24 bg-giee-paper px-6 py-24 md:py-32"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>{t("home.pillars.eyebrow")}</Eyebrow>
            <p className="mt-6 font-giee-sans text-lg leading-relaxed text-giee-ink-soft">
              {t("home.pillars.intro")}
            </p>
          </div>

          <ul className="mt-16 grid list-none gap-6 p-0 md:grid-cols-3">
            {pillars.map((p, i) => (
              <li key={p.name}>
                <div className="group flex h-full flex-col border border-giee-line bg-giee-white p-8 transition-all hover:-translate-y-1 hover:border-giee-ink hover:shadow-md">
                  <span className="font-giee-sans text-xs font-semibold tracking-[0.22em] text-giee-accent">
                    0{i + 1}
                  </span>
                  <h3 className="mt-4 font-giee-serif text-2xl leading-snug text-giee-ink md:text-[1.65rem]">
                    {p.name}
                  </h3>
                  <p className="mt-4 flex-1 font-giee-sans text-base leading-relaxed text-giee-ink-soft">
                    {p.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* INITIATIVES */}
      <section
        id="initiatives"
        className="scroll-mt-24 bg-giee-white px-6 py-24 md:py-32"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>{t("home.initiatives.eyebrow")}</Eyebrow>
          </div>

          <ul className="mt-16 grid list-none gap-6 p-0 md:grid-cols-2">
            {initiatives.map((item) => (
              <li key={item.name}>
                <div className="flex h-full flex-col border border-giee-line bg-giee-paper p-8 md:p-10">
                  <h3 className="font-giee-serif text-2xl leading-snug text-giee-ink md:text-3xl">
                    {item.name}
                  </h3>
                  <p className="mt-5 flex-1 font-giee-sans text-base leading-relaxed text-giee-ink-soft md:text-lg">
                    {item.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section
        id="engage"
        className="scroll-mt-24 bg-giee-ink px-6 py-24 text-giee-paper md:py-32"
      >
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-giee-serif text-3xl leading-snug text-giee-paper md:text-4xl">
            {t("home.cta.heading")}
          </h2>
          <p className="mt-8 font-giee-sans text-lg leading-relaxed text-giee-paper/85 md:text-xl">
            {t("home.cta.body")}
          </p>
          <div className="mt-12 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
            <Link
              href="/giee/research"
              className="inline-flex w-full items-center justify-center gap-2 border-2 border-giee-green bg-giee-green px-8 py-4 font-giee-sans text-base font-semibold text-giee-white transition-colors hover:bg-transparent hover:text-giee-white sm:w-auto"
            >
              {t("home.cta.research")}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/giee/partner"
              className="inline-flex w-full items-center justify-center border-2 border-giee-paper bg-transparent px-8 py-4 font-giee-sans text-base font-semibold text-giee-paper transition-colors hover:bg-giee-paper hover:text-giee-ink sm:w-auto"
            >
              {t("home.cta.partner")}
            </Link>
          </div>
        </div>
      </section>
    </GieeLayout>
  );
}
