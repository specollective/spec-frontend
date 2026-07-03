import Link from "next/link";
import type { GetStaticProps } from "next";
import { Trans, useTranslation } from "next-i18next/pages";
import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";
import GieeLayout from "../../components/GieeLayout";
import GieePartnerForm from "../../components/GieePartnerForm";
import GieeCommunityBand from "../../components/GieeCommunityBand";
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

export default function GieePartnerPage() {
  const { t } = useTranslation("giee");
  return (
    <GieeLayout
      title={t("partner.eyebrow")}
      description={t("partner.intro")}
    >
      <section className="bg-giee-paper px-6 pb-20 pt-20 md:pb-28 md:pt-28">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/giee"
            className="font-giee-sans text-sm text-giee-slate transition-colors hover:text-giee-ink"
          >
            {t("partner.back")}
          </Link>

          <div className="mt-8 grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* LEFT — content */}
            <div className="lg:pr-4">
              <p className="font-giee-sans text-xs font-semibold uppercase tracking-[0.22em] text-giee-accent md:text-sm">
                {t("partner.eyebrow")}
              </p>
              <h1 className="mt-6 font-giee-serif text-4xl leading-[1.08] text-giee-ink md:text-5xl">
                {t("partner.heading")}
              </h1>
              <p className="mt-8 font-giee-sans text-lg leading-relaxed text-giee-ink-soft md:text-xl">
                {t("partner.intro")}
              </p>

              <dl className="mt-12 flex flex-col gap-8 border-t border-giee-line pt-10">
                <div>
                  <dt className="font-giee-serif text-xl text-giee-ink">
                    {t("partner.features.sandbox.term")}
                  </dt>
                  <dd className="mt-2 font-giee-sans text-base leading-relaxed text-giee-ink-soft">
                    {t("partner.features.sandbox.description")}
                  </dd>
                </div>
                <div>
                  <dt className="font-giee-serif text-xl text-giee-ink">
                    {t("partner.features.collaboration.term")}
                  </dt>
                  <dd className="mt-2 font-giee-sans text-base leading-relaxed text-giee-ink-soft">
                    {t("partner.features.collaboration.description")}
                  </dd>
                </div>
                <div>
                  <dt className="font-giee-serif text-xl text-giee-ink">
                    {t("partner.features.portfolio.term")}
                  </dt>
                  <dd className="mt-2 font-giee-sans text-base leading-relaxed text-giee-ink-soft">
                    <Trans
                      i18nKey="partner.features.portfolio.description"
                      t={t}
                      components={{
                        portfolio: (
                          <Link
                            href="/giee/research"
                            className="font-semibold text-giee-green underline-offset-2 hover:underline"
                          />
                        ),
                      }}
                    />
                  </dd>
                </div>
              </dl>
            </div>

            {/* RIGHT — form */}
            <div className="border border-giee-line bg-giee-white p-6 md:p-10">
              <GieePartnerForm />
            </div>
          </div>
        </div>
      </section>

      <GieeCommunityBand />
    </GieeLayout>
  );
}
