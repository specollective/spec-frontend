import React, { useState, useEffect } from "react";
import Image from "next/image";

import logo from "../public/spec-logo.svg";
import menu from "../public/menuSign.svg";
import close from "../public/menuClose.svg";

export default function Navbar() {
  const [displayMenu, setDisplayMenu] = useState(false);

  function toggleMenu() {
    setDisplayMenu(!displayMenu);
  }

  useEffect(() => {
    if (displayMenu) {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setDisplayMenu(false);
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
        <button
          onClick={toggleMenu}
          aria-label={displayMenu ? "Close menu" : "Open menu"}
          aria-expanded={displayMenu}
          className="p-2 focus:outline-none focus:ring-2 focus:ring-spec-turquoise focus:ring-offset-2"
        >
          <Image
            className="w-9"
            src={displayMenu ? close : menu}
            alt=""
          />
        </button>
      </div>
      {displayMenu && (
        <nav aria-label="Mobile navigation" className="left-0 h-screen w-screen bg-black opacity-100 z-50 mt-0 md:hidden">
          <div className="flex flex-col justify-center items-center font-montserrat">
            <a
              href="#connect"
              onClick={() => setDisplayMenu(false)}
              className="font-semibold text-center bg-white opacity-100 leading-6 w-screen border-b border-black tracking-wide py-4 px-6 text-lg focus:outline-none focus:ring-2 focus:ring-spec-turquoise focus:ring-offset-2"
            >
              Contact
            </a>
          </div>
        </nav>
      )}
      <nav aria-label="Main navigation" className="hidden md:block">
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
          <div className="flex items-center">
            <a
              href="#connect"
              className="font-montserrat font-semibold tracking-wide text-lg text-spec-turquoise hover:text-spec-black transition-colors focus:outline-none focus:ring-2 focus:ring-spec-turquoise focus:ring-offset-2 rounded"
            >
              Contact
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
