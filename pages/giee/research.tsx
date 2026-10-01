import type { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next/pages";
import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";
import GieeLayout from "../../components/GieeLayout";
import GieeHero from "../../components/GieeHero";
import GieePartnerLogos from "../../components/GieePartnerLogos";
import {
  LocationChips,
  caseAccent,
  caseTint,
  type CaseStudy,
} from "../../components/GieeCaseStudy";
import { breadcrumbLd, caseStudyListLd } from "../../utils/seo";
import nextI18NextConfig from "../../next-i18next.config";

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(
      locale ?? nextI18NextConfig.i18n.defaultLocale,
      ["common", "giee"],
      nextI18NextConfig
    )),
  },
});

export default function GieeResearchPage() {
  const { t } = useTranslation("giee");
  const { locale } = useRouter();
  const studies = t("caseStudies", { returnObjects: true }) as CaseStudy[];
  const titleLines = t("research.titleLines", { returnObjects: true }) as string[];

  return (
    <GieeLayout
      title={t("meta.research.title")}
      description={t("meta.research.description")}
      jsonLd={[
        breadcrumbLd(
          [
            { name: t("breadcrumb.home"), path: "/giee/" },
            { name: t("nav.research"), path: "/giee/research/" },
          ],
          locale,
        ),
        caseStudyListLd(studies, locale, t("research.listLabel")),
      ]}
    >
      <GieeHero
        id="research-title"
        titleLines={titleLines}
        fallbackTitle={t("meta.research.title")}
        boardHeight={420}
        panelHeight={400}
        titleTop={150}
        titleSize={96}
      />

      <section className="mx-auto max-w-[1440px] px-4 pt-12 lg:grid lg:grid-cols-12 lg:gap-x-6 lg:px-16 lg:pt-[72px]">
        <p className="m-0 text-[22px] font-medium leading-[1.22] tracking-[-0.02em] [text-wrap:pretty] lg:col-span-9 lg:text-[34px] lg:leading-[1.18]">
          {t("research.intro")}
        </p>
      </section>

      <section
        aria-label={t("research.listLabel")}
        className="mx-auto max-w-[1440px] px-4 pt-12 lg:px-16 lg:pt-24"
      >
        <ol className="m-0 grid list-none items-start gap-3 p-0 lg:grid-cols-2 lg:gap-6 lg:pb-32">
          {studies.map((s, i) => {
            const right = i % 2 === 1;
            return (
              <li
                key={s.slug}
                id={s.slug}
                className={`flex scroll-mt-6 flex-col px-6 pb-8 pt-7 lg:px-12 lg:pb-12 lg:pt-11 ${
                  right
                    ? "rounded-[24px_170px_24px_24px/24px_140px_24px_24px] lg:translate-y-32 lg:rounded-[36px_280px_36px_36px/36px_240px_36px_36px]"
                    : "rounded-[24px_24px_170px_24px/24px_24px_140px_24px] lg:rounded-[36px_36px_280px_36px/36px_36px_240px_36px]"
                }`}
                style={{ background: caseTint(i) }}
              >
                <span
                  aria-hidden="true"
                  className="-ml-[6px] block text-[96px] font-light leading-[0.74] tracking-[-0.06em] lg:-ml-2 lg:text-[150px]"
                >
                  {i + 1}
                </span>
                <LocationChips locations={s.locations} className="mt-8 max-w-[380px] lg:mt-10" />
                <h2 className="mb-0 mt-8 max-w-[540px] text-[28px] font-bold leading-[1.04] tracking-[-0.03em] [text-wrap:balance] lg:mt-12 lg:text-[42px] lg:leading-[1.02]">
                  {s.name}
                </h2>
                <p className="mb-0 mt-4 max-w-[540px] text-[16px] leading-[1.55] text-giee-ink-2 lg:mt-5 lg:text-[18px]">
                  {s.description}
                </p>
                <h3 className="mb-0 mt-7 text-[14px] font-bold lg:mt-9">
                  {t("research.ecosystemPartners")}
                </h3>
                <ul
                  className={`m-0 mt-3 list-none p-0 ${right ? "" : "lg:max-w-[74%]"}`}
                >
                  {s.partners.map((p) => (
                    <li
                      key={p}
                      className="flex items-center gap-3 border-t border-giee-navy/[0.14] py-[13px] text-[15px] font-medium leading-[1.35] lg:text-[17px]"
                    >
                      <span
                        aria-hidden="true"
                        className="h-[10px] w-[10px] flex-none rounded-[2px_2px_7px_2px]"
                        style={{ background: caseAccent(i) }}
                      />
                      {p}
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ol>
      </section>

      <section
        aria-labelledby="research-partners"
        className="mx-auto max-w-[1440px] px-4 pt-20 lg:px-16 lg:pt-[120px]"
      >
        <h2 id="research-partners" className="m-0 text-[16px] font-bold leading-[1.3] lg:text-[18px]">
          {t("research.partnersTitle")}
        </h2>
        <GieePartnerLogos className="mt-5" />
      </section>
    </GieeLayout>
  );
}
