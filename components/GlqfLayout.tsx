import { ReactNode } from "react";
import Head from "next/head";
import AppHead from "./AppHead";
import GlqfNavbar from "./GlqfNavbar";
import GlqfFooter from "./GlqfFooter";
import { INDEXABLE } from "../constants/seo";

interface GlqfLayoutProps {
  children: ReactNode;
}

export default function GlqfLayout({ children }: GlqfLayoutProps) {
  return (
    <>
      <AppHead />
      {!INDEXABLE.glqf && (
        <Head>
          <meta name="robots" content="noindex, nofollow" />
        </Head>
      )}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <div className="bg-glqf-paper text-glqf-ink">
        <GlqfNavbar />
        <main id="main-content">{children}</main>
        <GlqfFooter />
      </div>
    </>
  );
}
