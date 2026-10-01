import { ReactNode } from "react";
import { useTranslation } from "next-i18next/pages";
import AppHead, { type JsonLd } from "./AppHead";
import GieeNavbar from "./GieeNavbar";
import GieeFooter from "./GieeFooter";
import { GieeFilters } from "./GieeGlass";
import { gieeFont } from "./gieeFont";
import { INDEXABLE, SITE_URL } from "../constants/seo";

const GIEE_OG_IMAGE = `${SITE_URL}/giee-og.jpg`;

interface GieeLayoutProps {
  children: ReactNode;
  title: string;
  description: string;
  /** Page-specific structured data, merged with the site-wide graph. */
  jsonLd?: JsonLd[];
  /** How far down the cream-to-ground fade at the top of the page runs. */
  fade?: number;
}

export default function GieeLayout({
  children,
  title,
  description,
  jsonLd,
  fade = 460,
}: GieeLayoutProps) {
  const { t } = useTranslation("common");
  return (
    <>
      <AppHead
        title={title}
        description={description}
        image={GIEE_OG_IMAGE}
        imageAlt={title}
        noindex={!INDEXABLE.giee}
        jsonLd={jsonLd}
      />
      <a href="#main-content" className="skip-link">
        {t("skipToContent")}
      </a>
      <div
        className={`${gieeFont.variable} giee relative overflow-x-clip font-giee text-giee-navy antialiased selection:bg-giee-orange selection:text-giee-navy`}
        style={{
          background: `#FAF8F1 linear-gradient(180deg, #F1ECDB 0px, #F1ECDB ${Math.round(
            fade * 0.11,
          )}px, #F4F0E3 ${Math.round(fade * 0.45)}px, #FAF8F1 ${fade}px) no-repeat`,
          backgroundSize: `100% ${fade}px`,
        }}
      >
        <GieeFilters />
        <GieeNavbar />
        <main id="main-content" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <GieeFooter />
      </div>
    </>
  );
}
