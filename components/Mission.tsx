import React from 'react'
import Image from 'next/image'
import HomeSection from './HomeSection'
import SectionColumn from './SectionColumn'
import { Paragraph1 } from './Typography/Paragraph'
import { Heading2, Heading3, Heading4 } from './Typography/Heading'

export default function Mission() {
  return (
    <HomeSection>
      <div id="mission-section" className="relative -top-96"></div>
      <SectionColumn orderClasses="order-last md:order-first">
        <Heading4>
          OUR MISSION
        </Heading4>
        <Heading2 className="">
          We are on a mission to <span className='text-spec-turquiose'>provide diverse peoples the resources and opportunities </span> essential to learn skills, build careers, and become leaders of sustainable social impact.
        </Heading2>
        <Paragraph1>
          We  understand that for many people from underserved communities, they can&apos;t give back or help others until they can access essential goods and services, learn professional skills, and achieve physical and financial security.
        </Paragraph1>
      </SectionColumn>
      <SectionColumn orderClasses="mb-6">
        <Image
          className="m-auto"
          src="/MissionImg.svg"
          alt="two people talking"
          width={400}
          height={400}
        />
        {/* <Image
          className="m-auto text-left mb-6 block lg:hidden"
          src={missionImg}
          alt="two people talking"
          width={300}
          height={100}
        /> */}
      </SectionColumn>
    </HomeSection>
  )
}
