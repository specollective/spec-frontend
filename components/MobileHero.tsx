import React from 'react';
import { Heading1, Heading2, Heading0 } from './Typography/Heading';
import { Paragraph1, Paragraph0 } from './Typography/Paragraph';
import Link from 'next/link';
import HomeSection from './HomeSection';
interface HeroProps {
  backgroundImage: string;
  title: string;
  description: string;
  buttonText: string;
  onButtonClick: () => void;
}

const MobileHero: React.FC<HeroProps> = ({ backgroundImage, title, description, buttonText, onButtonClick }) => {
  return (
    <div className="relative flex items-center justify-center text-center h-fit">
      <HomeSection>
        {/* Background Image */}
        <img src={backgroundImage} alt="Hero Background" className="absolute w-full h-full object-cover" />

        {/* Translucent Overlay */}
        <div className="absolute w-full h-full bg-black opacity-10"></div>

        {/* Opaque Card */}
        {/* <div className="bg-white bg-opacity-90 rounded-lg shadow-lg z-10 p-6 2xl:w-1/2 mx-6"> */}
        <div className="bg-spec-gray bg-opacity-90 rounded-lg shadow-lg px-6 py-20 w-full z-10">
          <div className="w-11/12 mx-auto">
            <Heading1 className="text-white text-left">
              {title}
            </Heading1>
            <Paragraph0 className="text-white text-left pt-14 pb-14 w-full">
              {description}
            </Paragraph0>
            <div className="">
              <Link href="/home/#get-involved-section" className="block font-montserrat rounded-br-3xl rounded-tl-3xl bg-spec-sunshine text-center text-lg py-4 tracking-wider text-black w-full md:w-1/3 px-2 font-semibold" scroll={false}>
                JOIN OUR COMMUNITY
              </Link>
            </div>
          </div>
        </div>
      </HomeSection>
    </div>
  );
}

export default MobileHero;