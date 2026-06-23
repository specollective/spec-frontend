import { ReactNode } from "react";
import AppHead from "./AppHead";
import GieeNavbar from "./GieeNavbar";
import GieeFooter from "./GieeFooter";

interface GieeLayoutProps {
  children: ReactNode;
}

export default function GieeLayout({ children }: GieeLayoutProps) {
  return (
    <>
      <AppHead />
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
