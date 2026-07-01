import Link from "next/link";
import type { GetStaticProps } from "next";
import { useTranslation } from "next-i18next/pages";
import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";
import GieeLayout from "../../components/GieeLayout";
import GieeCommunityBand from "../../components/GieeCommunityBand";
import GieePartnerLogos from "../../components/GieePartnerLogos";
import nextI18NextConfig from "../../next-i18next.config";

interface Initiative {
  name: string;
  description: string;
  partners: string[];
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

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-giee-sans text-xs font-semibold uppercase tracking-[0.22em] text-giee-accent md:text-sm">
      {children}
    </p>
  );
}

export default function GieeResearchPage() {
  const { t } = useTranslation("giee");
  const initiatives = t("research.initiatives", {
    returnObjects: true,
  }) as Initiative[];
  return (
    <GieeLayout>
      {/* INTRO */}
      <section className="bg-giee-paper px-6 pb-16 pt-20 md:pb-20 md:pt-28">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/giee"
            className="font-giee-sans text-sm text-giee-slate transition-colors hover:text-giee-ink"
          >
            {t("research.back")}
          </Link>
          <h1 className="mt-6 font-giee-serif text-4xl leading-[1.08] text-giee-ink md:text-5xl lg:text-6xl">
            {t("research.heading")}
          </h1>
          <p className="mt-8 font-giee-sans text-lg leading-relaxed text-giee-ink-soft md:text-xl">
            {t("research.intro")}
          </p>
        </div>
      </section>

      {/* PORTFOLIO GRID */}
      <section className="bg-giee-white px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <Eyebrow>{t("research.eyebrow")}</Eyebrow>

          <ul className="mt-12 grid list-none gap-6 p-0 md:grid-cols-2 lg:grid-cols-3">
            {initiatives.map((item) => (
              <li key={item.name} className="h-full">
                <article className="flex h-full flex-col border border-giee-line bg-giee-paper p-8 transition-all hover:-translate-y-1 hover:border-giee-ink hover:shadow-md">
                  <h2 className="font-giee-serif text-2xl leading-snug text-giee-ink">
                    {item.name}
                  </h2>
                  <p className="mt-4 font-giee-sans text-base leading-relaxed text-giee-ink-soft">
                    {item.description}
                  </p>

                  <div className="mt-6 border-t border-giee-line pt-5">
                    <p className="font-giee-sans text-xs font-semibold uppercase tracking-[0.18em] text-giee-accent">
                      {t("research.ecosystemPartners")}
                    </p>
                    <ul className="mt-3 flex list-none flex-col gap-2 p-0">
                      {item.partners.map((partner) => (
                        <li
                          key={partner}
                          className="font-giee-sans text-sm leading-relaxed text-giee-slate"
                        >
                          {partner}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </li>
            ))}
          </ul>

          <div className="mt-16 text-center">
            <Link
              href="/giee/partner"
              className="inline-flex items-center justify-center bg-giee-green px-8 py-4 font-giee-sans text-base font-semibold text-giee-white transition-colors hover:bg-giee-green/90"
            >
              {t("research.partnerCta")}
            </Link>
          </div>

          <GieePartnerLogos className="mt-12" />
        </div>
      </section>

      <GieeCommunityBand />
    </GieeLayout>
  );
}
