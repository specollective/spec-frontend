import { ReactNode } from "react";
import AppHead from "./AppHead";
import GlqfNavbar from "./GlqfNavbar";
import GlqfFooter from "./GlqfFooter";

interface GlqfLayoutProps {
  children: ReactNode;
}

export default function GlqfLayout({ children }: GlqfLayoutProps) {
  return (
    <>
      <AppHead />
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
