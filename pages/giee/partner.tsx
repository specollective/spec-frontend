import Link from "next/link";
import type { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { Trans, useTranslation } from "next-i18next/pages";
import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";
import GieeLayout from "../../components/GieeLayout";
import GieeHero from "../../components/GieeHero";
import GieePartnerForm from "../../components/GieePartnerForm";
import { breadcrumbLd, partnerPageLd } from "../../utils/seo";
import nextI18NextConfig from "../../next-i18next.config";

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

export default function GieePartnerPage() {
  const { t } = useTranslation("giee");
  const { locale } = useRouter();
  const features = t("partner.features", { returnObjects: true }) as Item[];
  const titleLines = t("partner.titleLines", { returnObjects: true }) as string[];

  return (
    <GieeLayout
      title={t("meta.partner.title")}
      description={t("meta.partner.description")}
      jsonLd={[
        breadcrumbLd(
          [
            { name: t("breadcrumb.home"), path: "/giee/" },
            { name: t("nav.partnerCta"), path: "/giee/partner/" },
          ],
          locale,
        ),
        partnerPageLd(t, locale),
      ]}
    >
      <GieeHero
        id="partner-title"
        titleLines={titleLines}
        fallbackTitle={t("meta.partner.title")}
        boardHeight={350}
        panelHeight={330}
        titleTop={150}
        titleSize={128}
      />

      <section className="mx-auto max-w-[1440px] px-4 pt-12 lg:grid lg:grid-cols-12 lg:gap-x-6 lg:px-16 lg:pt-[72px]">
        <p className="m-0 text-[22px] font-medium leading-[1.22] tracking-[-0.02em] [text-wrap:pretty] lg:col-span-9 lg:text-[34px] lg:leading-[1.18]">
          {t("partner.intro")}
        </p>
      </section>

      <section
        id="p-form"
        aria-label={t("partner.sectionLabel")}
        className="mx-auto max-w-[1440px] scroll-mt-6 px-4 pt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-6 lg:px-16 lg:pt-24"
      >
        <ul className="m-0 list-none border-t-[1.5px] border-giee-navy p-0 lg:col-span-5">
          {features.map((f, i) => (
            <li
              key={f.title}
              className="flex flex-col gap-[10px] border-b border-giee-rule pb-[30px] pt-[26px]"
            >
              <h2 className="m-0 text-[22px] font-bold leading-[1.1] tracking-[-0.02em] lg:text-[26px]">
                {f.title}
              </h2>
              <p className="m-0 text-[16px] leading-[1.5] text-giee-ink-3 lg:text-[17px]">
                {i === features.length - 1 ? (
                  <Trans
                    i18nKey={`partner.features.${i}.body`}
                    t={t}
                    components={{
                      portfolio: (
                        <Link
                          href="/giee/research"
                          className="font-medium text-giee-navy underline decoration-[1.5px] underline-offset-[3px]"
                        />
                      ),
                    }}
                  />
                ) : (
                  f.body
                )}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-10 bg-giee-field px-5 pb-10 pt-9 sm:px-8 lg:col-span-6 lg:col-start-7 lg:mt-0 lg:min-h-[1200px] lg:px-[52px] lg:pb-14 lg:pt-[52px]">
          <GieePartnerForm />
        </div>
      </section>
    </GieeLayout>
  );
}
