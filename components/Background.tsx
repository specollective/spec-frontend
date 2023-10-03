import React from 'react'
import Image from 'next/image'
import bpImg from '../public/BPImage.svg'
import HomeSection from './HomeSection'
import SectionColumn from './SectionColumn'
import { Paragraph0, Paragraph1 } from './Typography/Paragraph'
import { Heading4, Heading2 } from './Typography/Heading'

export default function Background() {
  return (
    <HomeSection>
      <SectionColumn>
        <Image
          className="m-auto text-left mb-6 hidden lg:block lg:order-last float-left"
          src={bpImg}
          alt="two person talking"
          width={400}
          height={400}
        />
        <Image
          className="m-auto text-left mb-6 block lg:hidden"
          src={bpImg}
          alt="people talking"
          width={400}
          height={400}
        />
      </SectionColumn>
      <SectionColumn>
        <Heading4>
          OUR HISTORY
        </Heading4>
        <Heading2>
          Uncovering a Cultural Gap: <span className="text-spec-turquiose">The Buffalo Project’s 10-Year data analysis reveals alarming lack of diversity awareness</span> among students.
        </Heading2>
        <Paragraph1>
            This illustrates that students  were not being adequately taught the importance of intercultural competencies and cross-cultural communication.
        </Paragraph1>
        <Paragraph1>
          The Buffalo Project, led by Dr. Rhianna C. Rogers, worked with community stakeholders and WNY data to engage in a participatory action research study of perceptions of culture in the region.
        </Paragraph1>
        {/* <a
          href="https://thebuffaloproject.wixsite.com/tbpinternship"
          target="_blank"
          rel="noreferrer"
          className="underline font-montserrat font-medium text-base leading-normal mb-4 md:text-lg md:leading-7"
        >
          LEARN MORE ABOUT THE BUFFALO PROJECT
        </a> */}
      </SectionColumn>
    </HomeSection>
  );
}
