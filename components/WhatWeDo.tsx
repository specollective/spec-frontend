import React from 'react';
import Image from 'next/image';
import TeamImg from '../public/Team.svg';
import HomeSection from './HomeSection';
import SectionColumn from './SectionColumn';

export default function WhatWeDo() {
  return (
    <HomeSection>
      <SectionColumn className="order-first md:order-last">
        <Image
          className="m-auto text-left mb-6 hidden lg:block"
          src={TeamImg}
          alt="two person talking"
          width={300}
          height={200}
        />
        <Image
          className="m-auto text-left mb-6 block lg:hidden"
          src={TeamImg}
          alt="people talking"
          width={300}
          height={100}
        />
      </SectionColumn>

      <SectionColumn>
        <h1 className="font-montserrat font-medium text-sm leading-5 opacity-40 tracking-wider mb-4 md:text-lg md:leading-7">
          WHAT WE DO
        </h1>
        <p className="font-dmserif text-2xl font-normal leading-8 mb-6 md:text-4xl md:leading-10">
          We are a <span className="text-spec-turquiose">
            radically transparent
            and inclusive community.
          </span>
        </p>
        <p className="font-montserrat opacity-70 font-medium text-base leading-normal md:text-lg md:leading-7">
          At SPEC, we are dedicated to fostering social impact and driving positive change through our diverse range of programs and services. Our approach centers around engaged research, collaborative mentorship, applied learning, capacity building, and pathways to sustainable careers. Through these initiatives, we empower individuals and organizations to make a meaningful difference in their communities and beyond.
        </p>
      </SectionColumn>
    </HomeSection>
  );
}
