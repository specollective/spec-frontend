import type { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";
import { useTranslation } from "next-i18next/pages";
import Layout from "../components/Layout";
import nextI18NextConfig from "../next-i18next.config";

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(
      locale ?? nextI18NextConfig.i18n.defaultLocale,
      ["common", "ourTeam"],
      nextI18NextConfig
    )),
  },
});

export default function OurTeam() {
  const { t } = useTranslation("ourTeam");
  return (
    <Layout>
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-bold">{t("title")}</h1>
      </div>
    </Layout>
  );
}
