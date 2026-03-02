import React from 'react'
import HomeSection from './HomeSection'
import Image from 'next/image'
import SectionColumn from './SectionColumn'
import { Heading2 } from './Typography/Heading'
import { Eyebrow } from './Typography/Eyebrow'
import { Paragraph1 } from './Typography/Paragraph'

export default function HowWeWork() {
  return (
    <HomeSection>
      <SectionColumn orderClasses="order-last md:order-first">
        <Eyebrow>
          HOW WE WORK
        </Eyebrow>
        <Heading2>
          SPEC is organized as an open collective, which
          <span className="text-spec-turquoise">
            &nbsp;raises and spends funds transparently&nbsp;
          </span>
          to achieve its goals.
        </Heading2>
        <Paragraph1>
          We operate as a fully distributed Collective, with members located across the United States.
          Donations to SPEC directly contribute to supporting career development and learning opportunities for our members.
        </Paragraph1>
        <Paragraph1>
          SPEC is fiscally sponsored by the Hack Club Bank 501(c)(3), which enables SPEC to receive tax-deductible donations in full transparency.
        </Paragraph1>
      </SectionColumn>
      <SectionColumn>
        <Image
          className="m-auto text-left mb-6 hidden lg:block lg:order-last"
          src="/ProjectsImage.svg"
          alt="People collaborating on a project"
          width={300}
          height={300}
        />
        <Image
          className="m-auto text-left mb-6 block lg:hidden"
          src="/ProjectsImage.svg"
          alt="People collaborating on a project"
          width={200}
          height={200}
        />
      </SectionColumn>
    </HomeSection>
  );
}
