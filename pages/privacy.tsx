import type { GetStaticProps } from "next";
import { useTranslation } from "next-i18next/pages";
import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";
import Layout from "../components/Layout";
import nextI18NextConfig from "../next-i18next.config";

interface PolicySection {
  heading: string;
  paragraphs: string[];
  list?: string[];
  afterList?: string;
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(
      locale ?? nextI18NextConfig.i18n.defaultLocale,
      ["common", "privacy"],
      nextI18NextConfig
    )),
  },
});

export default function PrivacyPage() {
  const { t } = useTranslation("privacy");
  const intro = t("intro", { returnObjects: true }) as string[];
  const sections = t("sections", { returnObjects: true }) as PolicySection[];
  return (
    <Layout title={t("title")}>
      <div className="max-w-screen-md mx-auto px-6 py-16 md:py-24">
        <h1 className="font-dmserif text-4xl md:text-5xl">{t("title")}</h1>
        <p className="mt-4 font-montserrat text-sm text-spec-gray">
          {t("updated")}
        </p>

        {intro.map((paragraph) => (
          <p
            key={paragraph}
            className="mt-6 font-montserrat text-base leading-relaxed"
          >
            {paragraph}
          </p>
        ))}

        {sections.map((section) => (
          <section key={section.heading} className="mt-12">
            <h2 className="font-dmserif text-2xl md:text-3xl">
              {section.heading}
            </h2>
            {section.paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="mt-4 font-montserrat text-base leading-relaxed"
              >
                {paragraph}
              </p>
            ))}
            {section.list && (
              <ul className="mt-4 list-disc pl-6 font-montserrat text-base leading-relaxed">
                {section.list.map((item) => (
                  <li key={item} className="mt-2">
                    {item}
                  </li>
                ))}
              </ul>
            )}
            {section.afterList && (
              <p className="mt-4 font-montserrat text-base leading-relaxed">
                {section.afterList}
              </p>
            )}
          </section>
        ))}
      </div>
    </Layout>
  );
}
