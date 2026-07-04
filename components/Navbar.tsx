import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useTranslation } from "next-i18next/pages";

import logo from "../public/spec-logo.svg";
import menu from "../public/menuSign.svg";
import close from "../public/menuClose.svg";
// Temporarily hidden until Spanish/English translations are ready.
// import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  const { t } = useTranslation("common");
  const [displayMenu, setDisplayMenu] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLElement>(null);

  function toggleMenu() {
    setDisplayMenu(!displayMenu);
  }

  useEffect(() => {
    if (displayMenu) {
      // Move focus into the overlay so keyboard users aren't left on content
      // hidden behind it, and hand it back to the toggle when Escape closes.
      menuRef.current?.querySelector<HTMLElement>('a')?.focus();
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setDisplayMenu(false);
          menuButtonRef.current?.focus();
        }
      };
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [displayMenu]);
  return (
    <header className="sticky top-0 z-50 bg-white md:pt-4">
      <div className="flex justify-between items-center border-b border-black px-4 py-3 h-14 md:hidden">
        <div className="flex items-center gap-2">
          <Image src={logo} alt="SPEC logo" width={40} height={50} />
          <span className="text-2xl leading-9 font-semibold tracking-wider">
            SPEC
          </span>
        </div>
        <div className="flex items-center gap-3">
          {/* Temporarily hidden until Spanish/English translations are ready. */}
          {/* <LanguageSwitcher /> */}
          <button
            ref={menuButtonRef}
            onClick={toggleMenu}
            aria-label={displayMenu ? t("nav.closeMenu") : t("nav.openMenu")}
            aria-expanded={displayMenu}
            aria-controls="mobile-menu"
            className="p-2 focus:outline-none focus:ring-2 focus:ring-spec-turquoise focus:ring-offset-2"
          >
            <Image
              className="w-9"
              src={displayMenu ? close : menu}
              alt=""
            />
          </button>
        </div>
      </div>
      {displayMenu && (
        <nav id="mobile-menu" ref={menuRef} aria-label={t("nav.mobileNavigation")} className="left-0 h-screen w-screen bg-black opacity-100 z-50 mt-0 md:hidden">
          <div className="flex flex-col justify-center items-center font-montserrat">
            <a
              href="#connect"
              onClick={() => setDisplayMenu(false)}
              className="font-semibold text-center bg-white opacity-100 leading-6 w-screen border-b border-black tracking-wide py-4 px-6 text-lg focus:outline-none focus:ring-2 focus:ring-spec-turquoise focus:ring-offset-2"
            >
              {t("nav.contact")}
            </a>
          </div>
        </nav>
      )}
      <nav aria-label={t("nav.mainNavigation")} className="hidden md:block">
        <div className="flex justify-between items-center border-b-2 border-black px-6 md:px-12 lg:px-16 xl:px-20 max-w-screen-xl mx-auto mt-4 pb-6">
          <div className="flex items-center gap-2">
            <Image
              className="sm:hidden md:block lg:hidden text-left mt-2"
              src={logo}
              alt="SPEC logo"
              width={40}
              height={20}
            />
            <span className="md:visible lg:hidden mt-2 text-2xl leading-9 font-semibold tracking-wider">
              SPEC
            </span>
            <Image
              className="sm:hidden md:hidden lg:block text-left"
              src={logo}
              alt="SPEC logo"
              width={60}
              height={80}
            />
            <span className="md:hidden lg:block font-poppins text-xs lg:text-2xl leading-9 font-medium pt-2 tracking-wider">
              SPEC
            </span>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="#connect"
              className="font-montserrat font-semibold tracking-wide text-lg text-spec-turquoise-dark hover:text-spec-black transition-colors focus:outline-none focus:ring-2 focus:ring-spec-turquoise focus:ring-offset-2 rounded"
            >
              {t("nav.contact")}
            </a>
            {/* Temporarily hidden until Spanish/English translations are ready. */}
            {/* <LanguageSwitcher /> */}
          </div>
        </div>
      </nav>
    </header>
  );
}
