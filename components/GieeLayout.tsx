import { ReactNode } from "react";
import Head from "next/head";
import AppHead from "./AppHead";
import GieeNavbar from "./GieeNavbar";
import GieeFooter from "./GieeFooter";
import { INDEXABLE } from "../constants/seo";

interface GieeLayoutProps {
  children: ReactNode;
}

export default function GieeLayout({ children }: GieeLayoutProps) {
  return (
    <>
      <AppHead />
      {!INDEXABLE.giee && (
        <Head>
          <meta name="robots" content="noindex, nofollow" />
        </Head>
      )}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <div className="bg-giee-paper text-giee-ink">
        <GieeNavbar />
        <main id="main-content">{children}</main>
        <GieeFooter />
      </div>
    </>
  );
}
