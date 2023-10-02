import React from 'react';
import { Heading1, Heading2, Heading0 } from './Typography/Heading';
import { Paragraph1, Paragraph0 } from './Typography/Paragraph';
import Link from 'next/link';
interface HeroProps {
  backgroundImage: string;
  title: string;
  description: string;
  buttonText: string;
  onButtonClick: () => void;
}

const MobileHero: React.FC<HeroProps> = ({ backgroundImage, title, description, buttonText, onButtonClick }) => {
  return (
    <div className="relative flex items-center justify-center text-center py-32 h-fit">
      {/* Background Image */}
      <img src={backgroundImage} alt="Hero Background" className="absolute w-full h-full object-cover" />

      {/* Translucent Overlay */}
      <div className="absolute w-3/4 h-full bg-black opacity-20"></div>

      {/* Opaque Card */}
      {/* <div className="bg-white bg-opacity-90 rounded-lg shadow-lg z-10 p-6 2xl:w-1/2 mx-6"> */}
      <div className="bg-white bg-opacity-80 rounded-lg shadow-lg px-6 py-20 md:w-3/4 2xl:w-1/2 z-10">
        <div className="w-11/12 mx-auto">
          <Heading1 className="text-black text-left">
            {title}
          </Heading1>
          <Paragraph0 className="text-black text-left pt-10 pb-10 md:text-left md:w-full 2xl:w-1/2 2xl:py-20">
            {description}
          </Paragraph0>
          <div className="grid md:grid-cols-1 gap-1 w-full md:w-1/2 2xl:w-1/4">
            {/* <Link href="/home/#mission-section"className="block col-span-1 bg-blue-500 text-white px-4 py-2 rounded lg:text-2xl 2xl:text-5xl" scroll={false}>
              Learn More
            </Link> */}
            <Link href="/home/#get-involved-section" className="block font-montserrat rounded-br-3xl rounded-tl-3xl bg-spec-sunshine text-center text-2xl p-6 font-semibold tracking-wider text-black w-3/4" scroll={false}>
              Join Our Community
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobileHero;