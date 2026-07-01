import type { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";
import Layout from "../../components/Layout";
import { JoerFormHeader } from "../../components/JoerFormHeader/JoerFormHeader";
import nextI18NextConfig from "../../next-i18next.config";

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(
      locale ?? nextI18NextConfig.i18n.defaultLocale,
      ["common", "journal"],
      nextI18NextConfig
    )),
  },
});

export default function JoerSubmissionsPage() {
  return (
    <Layout>
      <JoerFormHeader />
    </Layout>
  );
}
