import React from 'react';
import Image from 'next/image';
import ProjectsImg from '../public/ProjectsImage.svg';
import HomeSection from './HomeSection';
import SectionColumn from './SectionColumn';

export default function HowWeWork() {
  return (
    <HomeSection>
      <SectionColumn orderClasses="order-last lg:order-first">
        <h1 className="font-montserrat font-medium text-sm leading-5 opacity-40 tracking-wider mb-4 md:text-lg md:leading-7">
          HOW WE WORK
        </h1>
        <p className="font-dmserif text-2xl font-normal leading-8 mb-6 md:text-4xl md:leading-10">
          SPEC is organized as an open collective, which
          <span className="text-spec-turquiose">
            &nbsp;raises and spends funds transparently&nbsp;
          </span>
          to achieve its goals.
        </p>
        <p className="font-montserrat opacity-70 font-medium text-base leading-normal md:text-lg md:leading-7">
          Your donations help Research Associates &#40;RAs&#41; receive
          mentoring, career training, and professional development as they
          work on these current projects.

          Your donations help Research Associates &#40;RAs&#41; receive
          mentoring, career training, and professional development as they
          work on these current projects.
        </p>
      </SectionColumn>
      <SectionColumn>
        <Image
          className="m-auto text-left mb-6 hidden lg:block lg:order-last"
          src={ProjectsImg}
          alt="two person talking"
          width={300}
          height={200}
        />
        <Image
          className="m-auto text-left mb-6 block lg:hidden"
          src={ProjectsImg}
          alt="people talking"
          width={300}
          height={100}
        />
      </SectionColumn>
    </HomeSection>
  );
}
