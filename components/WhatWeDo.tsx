import React from 'react';
import Image from 'next/image';
import TeamImg from '../public/Team.svg';

export default function WhatWeDo() {
  return (
    <section>
      <div className="flex flex-col md:flex md:flex-row mx-20 my-36 md:mx-32 lg:mx-44 items-center justify-center">
        <div className="lg:w-1/2 lg:order-last">
          <h1 className="font-montserrat font-medium text-sm leading-5 opacity-40 tracking-wider mb-4 md:text-lg md:leading-7">
            WHAT WE DO
          </h1>
          <p className="font-dmserif text-base font-normal leading-8 mb-6 md:text-4xl md:leading-10">
            We are a <span className="text-spec-turquiose">
              radically transparent
              and inclusive community.
            </span>
          </p>
          <p className="font-montserrat opacity-70 font-medium text-base leading-nromal md:text-lg md:leading-7">
            At SPEC, we are dedicated to fostering social impact and driving positive change through our diverse range of programs and services. Our approach centers around engaged research, collaborative mentorship, applied learning, capacity building, and pathways to sustainable careers. Through these initiatives, we empower individuals and organizations to make a meaningful difference in their communities and beyond.
          </p>
        </div>
        <div className="md:w-1/2 order-first">
          <Image
            className="m-auto text-left mb-6 hidden md:block md:order-first"
            src={TeamImg}
            alt="two person talking"
            width={350}
            height={250}
          />
          <Image
            className="m-auto text-left mb-6 block md:hidden"
            src={TeamImg}
            alt="people talking"
            width={300}
            height={100}
          />
        </div>
      </div>
    </section>
  );
}