import Link from "next/link";
import type { GetStaticProps } from "next";
import { useTranslation, Trans } from "next-i18next/pages";
import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";
import * as Flags from "country-flag-icons/react/3x2";
import GlqfLayout from "../components/GlqfLayout";
import { GlqfDiagram } from "../components/GlqfDiagram";
import nextI18NextConfig from "../next-i18next.config";

const constructs = [
  { slug: "integration" },
  { slug: "knowledge" },
  { slug: "engagement" },
];

const countries: { name: string; code: keyof typeof Flags }[] = [
  { name: "Andorra", code: "AD" },
  { name: "Angola", code: "AO" },
  { name: "Antigua and Barbuda", code: "AG" },
  { name: "Australia", code: "AU" },
  { name: "Bahamas, The", code: "BS" },
  { name: "Barbados", code: "BB" },
  { name: "Belgium", code: "BE" },
  { name: "Belize", code: "BZ" },
  { name: "Bosnia and Herzegovina", code: "BA" },
  { name: "Botswana", code: "BW" },
  { name: "Brunei Darussalam", code: "BN" },
  { name: "Cambodia", code: "KH" },
  { name: "Canada", code: "CA" },
  { name: "Chile", code: "CL" },
  { name: "Croatia", code: "HR" },
  { name: "Czech Republic", code: "CZ" },
  { name: "Democratic Republic of the Congo", code: "CD" },
  { name: "Denmark", code: "DK" },
  { name: "Dominica", code: "DM" },
  { name: "Egypt", code: "EG" },
  { name: "Estonia", code: "EE" },
  { name: "Fiji", code: "FJ" },
  { name: "Finland", code: "FI" },
  { name: "France", code: "FR" },
  { name: "Gambia, The", code: "GM" },
  { name: "Georgia", code: "GE" },
  { name: "Germany", code: "DE" },
  { name: "Greece", code: "GR" },
  { name: "Grenada", code: "GD" },
  { name: "Guyana", code: "GY" },
  { name: "Haiti", code: "HT" },
  { name: "Hungary", code: "HU" },
  { name: "Ireland", code: "IE" },
  { name: "Italy", code: "IT" },
  { name: "Jamaica", code: "JM" },
  { name: "Jordan", code: "JO" },
  { name: "Kiribati", code: "KI" },
  { name: "Lao People’s Democratic Republic", code: "LA" },
  { name: "Latvia", code: "LV" },
  { name: "Lesotho", code: "LS" },
  { name: "Liechtenstein", code: "LI" },
  { name: "Lithuania", code: "LT" },
  { name: "Madagascar", code: "MG" },
  { name: "Malawi", code: "MW" },
  { name: "Malaysia", code: "MY" },
  { name: "Maldives", code: "MV" },
  { name: "Malta", code: "MT" },
  { name: "Mauritius", code: "MU" },
  { name: "Montenegro", code: "ME" },
  { name: "Montserrat", code: "MS" },
  { name: "Morocco", code: "MA" },
  { name: "Mozambique", code: "MZ" },
  { name: "Myanmar", code: "MM" },
  { name: "Namibia", code: "NA" },
  { name: "Netherlands", code: "NL" },
  { name: "New Zealand", code: "NZ" },
  { name: "Norway", code: "NO" },
  { name: "Pakistan", code: "PK" },
  { name: "Papua New Guinea", code: "PG" },
  { name: "Philippines", code: "PH" },
  { name: "Poland", code: "PL" },
  { name: "Portugal", code: "PT" },
  { name: "Romania", code: "RO" },
  { name: "Russian Federation", code: "RU" },
  { name: "Samoa", code: "WS" },
  { name: "Saudi Arabia", code: "SA" },
  { name: "Seychelles", code: "SC" },
  { name: "Sierra Leone", code: "SL" },
  { name: "Singapore", code: "SG" },
  { name: "Slovakia", code: "SK" },
  { name: "Solomon Islands, The", code: "SB" },
  { name: "South Africa", code: "ZA" },
  { name: "Spain", code: "ES" },
  { name: "St. Kitts and Nevis", code: "KN" },
  { name: "St. Lucia", code: "LC" },
  { name: "St. Vincent and the Grenadines", code: "VC" },
  { name: "Swaziland", code: "SZ" },
  { name: "Sweden", code: "SE" },
  { name: "Switzerland", code: "CH" },
  { name: "Thailand", code: "TH" },
  { name: "Tonga", code: "TO" },
  { name: "Trinidad and Tobago", code: "TT" },
  { name: "Turkey", code: "TR" },
  { name: "Tuvalu", code: "TV" },
  { name: "United Arab Emirates", code: "AE" },
  { name: "United Kingdom", code: "GB" },
  { name: "United Republic of Tanzania", code: "TZ" },
  { name: "United States — Lumina", code: "US" },
  { name: "United States — AAC&U", code: "US" },
  { name: "Vanuatu", code: "VU" },
  { name: "Zambia", code: "ZM" },
  { name: "Zimbabwe", code: "ZW" },
];

const domains = [
  { slug: "specialized-knowledge", constructSlug: "knowledge" },
  { slug: "applied-knowledge", constructSlug: "knowledge" },
  { slug: "integrated-knowledge", constructSlug: "knowledge" },
  { slug: "communication", constructSlug: "integration" },
  { slug: "information-literacy", constructSlug: "integration" },
  { slug: "ethical-responsibility", constructSlug: "integration" },
  { slug: "sociocultural-and-civic-engagement", constructSlug: "engagement" },
  { slug: "learning-engagement", constructSlug: "engagement" },
];

function Eyebrow({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`font-montserrat text-xs font-semibold uppercase tracking-[0.22em] text-glqf-accent md:text-sm ${className}`}
    >
      {children}
    </p>
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

export default function GlqfPage() {
  const { t } = useTranslation("glqf");

  return (
    <GlqfLayout>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-glqf-paper">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-glqf-line"
        />
        <div className="relative mx-auto flex min-h-[82vh] max-w-5xl flex-col items-center justify-center px-6 pb-28 pt-24 text-center md:pt-32">
          <Eyebrow>{t("hero.eyebrow")}</Eyebrow>
          <h1 className="mt-6 font-dmserif text-4xl leading-[1.05] text-glqf-ink md:text-6xl lg:text-7xl">
            <Trans i18nKey="hero.title" t={t} />
          </h1>
          <p className="mt-8 max-w-2xl font-montserrat text-lg leading-relaxed text-glqf-ink-soft md:text-xl">
            {t("hero.subtitle")}
          </p>
          <div className="mt-12 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
            <a
              href="#overview"
              className="inline-flex w-full items-center justify-center bg-glqf-ink px-8 py-4 font-montserrat text-base font-semibold text-glqf-paper transition-colors hover:bg-glqf-black sm:w-auto sm:min-w-[14rem]"
            >
              {t("hero.exploreCta")}
            </a>
            <a
              href="#diagram"
              className="inline-flex w-full items-center justify-center border-2 border-glqf-ink bg-transparent px-8 py-4 font-montserrat text-base font-semibold text-glqf-ink transition-colors hover:bg-glqf-ink hover:text-glqf-paper sm:w-auto sm:min-w-[14rem]"
            >
              {t("hero.viewModelCta")}
            </a>
          </div>
        </div>

        <a
          href="#overview"
          aria-label={t("hero.scrollLabel")}
          className="group absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-glqf-slate transition-colors hover:text-glqf-ink md:flex"
        >
          <span className="font-montserrat text-[11px] uppercase tracking-[0.25em]">
            {t("hero.scroll")}
          </span>
          <ChevronDown className="h-5 w-5 animate-bounce" />
        </a>
      </section>

      {/* OVERVIEW */}
      <section
        id="overview"
        className="scroll-mt-24 bg-glqf-white px-6 py-24 md:py-32"
      >
        <div className="mx-auto max-w-3xl">
          <Eyebrow>{t("overview.eyebrow")}</Eyebrow>
          <h2 className="mt-3 font-dmserif text-3xl leading-snug text-glqf-ink md:text-4xl">
            {t("overview.heading")}
          </h2>
          <p className="mt-8 font-montserrat text-lg leading-relaxed text-glqf-ink-soft md:text-xl">
            {t("overview.p1")}
          </p>
          <p className="mt-6 font-montserrat text-lg leading-relaxed text-glqf-ink-soft md:text-xl">
            {t("overview.p2")}
          </p>

          <figure className="my-12 border-l-2 border-glqf-accent pl-6 md:pl-8">
            <blockquote className="font-dmserif text-2xl leading-snug text-glqf-ink md:text-3xl">
              {t("overview.quote")}
            </blockquote>
          </figure>
        </div>
      </section>

      {/* CONSTRUCTS */}
      <section
        id="constructs"
        className="scroll-mt-24 bg-glqf-paper px-6 py-24 md:py-32"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>{t("constructsSection.eyebrow")}</Eyebrow>
            <h2 className="mt-3 font-dmserif text-3xl leading-snug text-glqf-ink md:text-4xl">
              {t("constructsSection.heading")}
            </h2>
            <p className="mt-6 font-montserrat text-lg leading-relaxed text-glqf-ink-soft">
              {t("constructsSection.intro")}
            </p>
          </div>

          <ul className="mt-16 grid list-none gap-6 p-0 md:grid-cols-3">
            {constructs.map((c, i) => (
              <li key={c.slug}>
                <Link
                  href={`/glqf/${c.slug}`}
                  className="group flex h-full flex-col border border-glqf-line bg-glqf-white p-8 transition-all hover:-translate-y-1 hover:border-glqf-ink hover:shadow-md"
                >
                  <span className="font-montserrat text-xs font-semibold tracking-[0.22em] text-glqf-accent">
                    0{i + 1}
                  </span>
                  <h3 className="mt-4 font-dmserif text-2xl leading-snug text-glqf-ink md:text-3xl">
                    {t(`items.${c.slug}`)}
                  </h3>
                  <p className="mt-4 flex-1 font-montserrat text-base leading-relaxed text-glqf-ink-soft">
                    {t(`constructDescriptions.${c.slug}`)}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 font-montserrat text-xs font-semibold uppercase tracking-[0.22em] text-glqf-ink">
                    {t("constructsSection.readMore")}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* DIAGRAM */}
      <section
        id="diagram"
        className="scroll-mt-24 bg-glqf-white px-6 py-24 md:py-32"
      >
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>{t("diagramSection.eyebrow")}</Eyebrow>
            <h2 className="mt-3 font-dmserif text-3xl leading-snug text-glqf-ink md:text-4xl">
              {t("diagramSection.heading")}
            </h2>
            <p className="mt-6 font-montserrat text-lg leading-relaxed text-glqf-ink-soft">
              {t("diagramSection.intro")}
            </p>
          </div>
          <div className="mt-16 border border-glqf-line bg-glqf-paper p-6 md:p-12">
            <GlqfDiagram className="mx-auto h-auto w-full max-w-3xl" />
          </div>
        </div>
      </section>

      {/* DOMAINS */}
      <section
        id="domains"
        className="scroll-mt-24 bg-glqf-paper px-6 py-24 md:py-32"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>{t("domainsSection.eyebrow")}</Eyebrow>
            <h2 className="mt-3 font-dmserif text-3xl leading-snug text-glqf-ink md:text-4xl">
              {t("domainsSection.heading")}
            </h2>
            <p className="mt-6 font-montserrat text-lg leading-relaxed text-glqf-ink-soft">
              {t("domainsSection.intro")}
            </p>
          </div>

          <ul className="mt-16 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-4">
            {domains.map((d) => (
              <li key={d.slug}>
                <Link
                  href={`/glqf/${d.slug}`}
                  className="group flex h-full flex-col justify-between border border-glqf-line bg-glqf-white p-6 transition-all hover:-translate-y-1 hover:border-glqf-ink hover:shadow-md"
                >
                  <div>
                    <p className="font-montserrat text-[11px] uppercase tracking-[0.22em] text-glqf-slate">
                      {t(`items.${d.constructSlug}`)}
                    </p>
                    <p className="mt-3 font-dmserif text-xl leading-snug text-glqf-ink md:text-2xl">
                      {t(`items.${d.slug}`)}
                    </p>
                  </div>
                  <ArrowRight className="mt-6 h-5 w-5 text-glqf-ink transition-transform group-hover:translate-x-1" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* INTERNATIONAL */}
      <section
        id="international"
        className="scroll-mt-24 bg-glqf-white px-6 py-24 md:py-32"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>{t("internationalSection.eyebrow")}</Eyebrow>
            <h2 className="mt-3 font-dmserif text-3xl leading-snug text-glqf-ink md:text-4xl">
              {t("internationalSection.heading")}
            </h2>
            <p className="mt-6 font-montserrat text-lg leading-relaxed text-glqf-ink-soft">
              {t("internationalSection.intro")}
            </p>
          </div>

          <ul
            role="list"
            className="mx-auto mt-16 grid max-w-5xl list-none grid-cols-1 gap-x-8 gap-y-3 p-0 sm:grid-cols-2 lg:grid-cols-3"
          >
            {countries.map(({ name, code }) => {
              const Flag = Flags[code];
              return (
                <li
                  key={name}
                  className="flex items-center gap-3 font-montserrat text-sm text-glqf-ink-soft md:text-base"
                >
                  {Flag && (
                    <Flag
                      title={name}
                      className="h-5 w-7 flex-shrink-0 ring-1 ring-glqf-line"
                    />
                  )}
                  <span>{name}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-glqf-ink px-6 py-24 text-glqf-paper md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-montserrat text-xs font-semibold uppercase tracking-[0.22em] text-glqf-accent md:text-sm">
            {t("cta.eyebrow")}
          </p>
          <h2 className="mt-3 font-dmserif text-3xl leading-snug text-glqf-paper md:text-4xl">
            {t("cta.heading")}
          </h2>
          <p className="mt-8 font-montserrat text-lg leading-relaxed text-glqf-paper/85 md:text-xl">
            {t("cta.body")}
          </p>
          <Link
            href="/contact"
            className="mt-12 inline-flex items-center justify-center border-2 border-glqf-paper bg-glqf-paper px-8 py-4 font-montserrat text-base font-semibold text-glqf-ink transition-colors hover:bg-transparent hover:text-glqf-paper"
          >
            {t("cta.button")}
          </Link>
        </div>
      </section>
    </GlqfLayout>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(
        locale ?? nextI18NextConfig.i18n.defaultLocale,
        ["common", "glqf"],
        nextI18NextConfig
      )),
    },
  };
};
