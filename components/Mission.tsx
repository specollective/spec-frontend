import React from 'react';
import Image from 'next/image'
import missionImg from '../public/MissionImg.svg'
import HomeSection from './HomeSection';
import SectionColumn from './SectionColumn';

export default function Mission() {
  return (
    <HomeSection>
      <SectionColumn orderClasses="order-last md:order-first">
        <p className='font-montserrat font-medium text-sm leading-5 opacity-40 tracking-wider mb-4
    md:text-lg md:leading-7'>
          OUR MISSION
        </p>
        <h1 className='font-dmserif text-2xl font-normal leading-8 mb-6 md:text-4xl md:leading-10'> We are on a mission to <span className='text-spec-turquiose'>provide diverse peoples the resources and opportunities </span> essential to learn skills, build careers, and become leaders of sustainable social impact.
        </h1>
        <p className='font-montserrat opacity-70 font-medium text-base leading-normal md:text-lg md:leading-7'>
          We  understand that for many people from underserved communities, they can&apos;t give back or help others until they are able to access essential goods and services, learn professional skills, and achieve physical and financial security.
        </p>
      </SectionColumn>
      <SectionColumn>
        <Image
          className="m-auto text-left mb-6 hidden lg:block"
          src={missionImg}
          alt="two people talking"
          width={300}
          height={200}
        />
        <Image
          className="m-auto text-left mb-6 block lg:hidden"
          src={missionImg}
          alt="two people talking"
          width={300}
          height={100}
        />
      </SectionColumn>
    </HomeSection>
  )
}
