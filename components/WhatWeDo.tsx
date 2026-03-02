import React from 'react'
import HomeSection from './HomeSection'
import Image from 'next/image'
import SectionColumn from './SectionColumn'
import TeamImg from '../public/Team.svg'
import { Heading2 } from './Typography/Heading'
import { Eyebrow } from './Typography/Eyebrow'
import { Paragraph1 } from './Typography/Paragraph'

export default function WhatWeDo() {
  return (
    <HomeSection>
      <SectionColumn orderClasses="md:order-first">
        <Image
          className="m-auto text-left mb-6 hidden lg:block float-left"
          src={TeamImg}
          alt="Team members working together"
          width={375}
          height={275}
        />
        <Image
          className="m-auto text-left mb-6 block lg:hidden"
          src={TeamImg}
          alt="Team members working together"
          width={300}
          height={100}
        />
      </SectionColumn>
      <SectionColumn>
        <Eyebrow>
          WHAT WE DO
        </Eyebrow>
        <Heading2>
          We are a <span className="text-spec-turquoise">radically transparent and inclusive community.</span>
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
