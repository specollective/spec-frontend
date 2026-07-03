import { ReactNode } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next/pages";
import AppHead from "./AppHead";
import GieeNavbar from "./GieeNavbar";
import GieeFooter from "./GieeFooter";
import { INDEXABLE, SITE_URL } from "../constants/seo";

const GIEE_OG_IMAGE = `${SITE_URL}/giee-og.png`;

interface GieeLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

export default function GieeLayout({
  children,
  title,
  description,
}: GieeLayoutProps) {
  const { t } = useTranslation("common");
  const { asPath } = useRouter();
  return (
    <>
      <AppHead
        title={title}
        description={description}
        image={GIEE_OG_IMAGE}
        path={asPath}
      />
      {!INDEXABLE.giee && (
        <Head>
          <meta name="robots" content="noindex, nofollow" />
        </Head>
      )}
      <a href="#main-content" className="skip-link">
        {t("skipToContent")}
      </a>
      <div className="bg-giee-paper text-giee-ink">
        <GieeNavbar />
        <main id="main-content">{children}</main>
        <GieeFooter />
      </div>
    </>
  );
}
