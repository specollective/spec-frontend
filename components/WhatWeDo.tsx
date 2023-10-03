import React from 'react'
import HomeSection from './HomeSection'
import Image from 'next/image'
import SectionColumn from './SectionColumn'
import TeamImg from '../public/Team.svg'
import { Heading4, Heading2 } from './Typography/Heading'
import { Paragraph1 } from './Typography/Paragraph'

export default function WhatWeDo() {
  return (
    <HomeSection>
      <SectionColumn orderClasses="md:order-first">
        <Image
          className="m-auto text-left mb-6 hidden lg:block float-left"
          src={TeamImg}
          alt="two person talking"
          width={375}
          height={275}
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
        <Heading4>
          WHAT WE DO
        </Heading4>
        <Heading2>
          We are a <span className="text-spec-turquiose">radically transparent and inclusive community.</span>
        </Heading2>
        <Paragraph1>
          At SPEC, we are dedicated to fostering social impact and driving positive change through our diverse range of programs and services. Our approach centers around engaged research, collaborative mentorship, applied learning, capacity building, and pathways to sustainable careers.
        </Paragraph1>
        <Paragraph1>
          Through these initiatives, we empower individuals and organizations to make a meaningful difference in their communities and beyond.
        </Paragraph1>
      </SectionColumn>
    </HomeSection>
  );
}
