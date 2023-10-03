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
          BACKGROUND
        </Heading4>
        <Heading2>
          SPEC was born out of research from <span className="text-spec-turquiose">The Buffalo Project</span>, a 10-year participatory research project that investigated using cultural data in the development of learning programs.
        </Heading2>
        <Paragraph1>
          This research illustrated that students were not being adequately taught the importance of intercultural competencies. It also demonstrated the efficacy of engaging communities to improve learning program design and delivery.
        </Paragraph1>
        <Paragraph1>
        SPEC was founded to expand on this research and provide a platform for students to learn these skills and apply them to real-world projects.
        </Paragraph1>
      </SectionColumn>
    </HomeSection>
  );
}
