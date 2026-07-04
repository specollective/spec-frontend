import { ReactNode } from "react";
import Head from "next/head";
import { useTranslation } from "next-i18next/pages";
import AppHead from "./AppHead";
import GlqfNavbar from "./GlqfNavbar";
import GlqfFooter from "./GlqfFooter";
import { INDEXABLE } from "../constants/seo";

interface GlqfLayoutProps {
  children: ReactNode;
  title?: string;
}

export default function GlqfLayout({ children, title }: GlqfLayoutProps) {
  const { t } = useTranslation("common");
  return (
    <>
      <AppHead title={title} />
      {!INDEXABLE.glqf && (
        <Head>
          <meta name="robots" content="noindex, nofollow" />
        </Head>
      )}
      <a href="#main-content" className="skip-link">
        {t("skipToContent")}
      </a>
      <div className="bg-glqf-paper text-glqf-ink">
        <GlqfNavbar />
        <main id="main-content">{children}</main>
        <GlqfFooter />
      </div>
    </>
  );
}
