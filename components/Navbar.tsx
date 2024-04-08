import React, { useState } from "react";
import Image from "next/image";
import logo from "../public/spec-logo.svg";
import menu from "../public/menuSign.svg";
import close from "../public/menuClose.svg";

export default function Navbar() {
  const [displayMenu, setDisplayMenu] = useState(false);
  function toggleMenu() {
    setDisplayMenu(!displayMenu);
  }
  return (
    <div className="sticky top-0 z-50 bg-white md:pt-4">
      <div className="flex space-x-2 justify-between items-center border-b border-black px-1.5 py-3 h-14 md:hidden">
        <div className="flex space-x-2">
          <Image src={logo} alt="spec-logo" width={40} height={50} />
          <p className="text-2xl leading-9 font-semibold tracking-wider">
            SPEC
          </p>
        </div>
        <div onClick={toggleMenu}>
          <Image
            className="w-9"
            src={displayMenu ? close : menu}
            alt={displayMenu ? "close menu" : "menu"}
          />
        </div>
      </div>
      {displayMenu && (
        <div className="left-0 h-screen w-screen bg-black opacity-100 z-50 mt-0 md:hidden">
          <div className="flex flex-col justify-center items-center font-montserrat">
            <a
              href="https://docs.specollective.org/introduction/"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-center bg-white opacity-100 leading-6 w-screen border-b border-black tracking-wide py-5 px-10 text-lg p-4"
            >
              DOCUMENTATION
            </a>
            <a
              href="https://hcb.hackclub.com/donations/start/spec"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-center bg-white opacity-100 leading-6 w-screen border-b border-black tracking-wide py-5 px-10 text-lg p-4 "
            >
              DONATE TO SPEC
            </a>
          </div>
        </div>
      )}
      <div className="hidden md:block">
        <div className="flex justify-between items-center border-b-2 border-black mx-20 mt-4">
          <div className="flex space-x-2 mb-6">
            <Image
              className="sm:hidden md:block lg:hidden text-left mt-2"
              src={logo}
              alt="spec-logo"
              width={40}
              height={20}
            />
            <p className="md:visible lg:hidden mt-2 text-2xl leading-9 font-semibold tracking-wider">
              SPEC
            </p>
            <Image
              className="sm:hidden md:hidden lg:block text-left"
              src={logo}
              alt="spec-logo"
              width={60}
              height={80}
            />
            <p className="md:hidden lg:block font-poppins text-xs lg:text-2xl leading-9 font-medium pt-2 tracking-wider">
              SPEC
            </p>
          </div>
          <div className="flex justify-center items-center space-x-8 font-montserrat leading-5 text-lg mb-6">
            <a
              href="https://docs.specollective.org/introduction/"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-center hover:underline hover:font-medium tracking-wide"
            >
              Documentation
            </a>
            <a
              href="https://hcb.hackclub.com/donations/start/spec"
              target="_blank"
              rel="noreferrer"
              className="flex  w-40 h-14 items-center justify-center font-semibold  border-spec-turquiose border-4 bg-spec-turquiose tracking-wide py-5 px-16 text-lg text-white rounded-br-3xl rounded-tl-3xl font-montserrat hover:text-black hover:bg-white hover:border-spec-turquiose"
            >
              DONATE
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
