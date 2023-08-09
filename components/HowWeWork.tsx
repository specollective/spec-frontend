import React from 'react';
import Image from 'next/image';
import ProjectsImg from '../public/ProjectsImage.svg';

export default function HowWeWork() {
  return (
    <section>
      <div className="flex flex-col md:flex md:flex-row m-20 items-center justify-center">
        <div className="md:w-1/2 md:pl-10">
          <h1 className="font-montserrat font-medium text-sm leading-5 opacity-40 tracking-wider mb-4 md:text-lg md:leading-7">
            HOW WE WORK
          </h1>
          <p className="font-dmserif text-base font-normal leading-8 mb-6 md:text-4xl md:leading-10">
            SPEC is organized as an open collective, which
            <span className="text-spec-turquiose">
              &nbsp;raises and spends funds transparently&nbsp;
            </span>
            to achieve its goals.
          </p>
          <p className="font-montserrat opacity-70 font-medium text-base leading-nromal md:text-lg md:leading-7">
            Your donations help Research Associates &#40;RAs&#41; receive
            mentoring, career training, and professional development as they
            work on these current projects.

            Your donations help Research Associates &#40;RAs&#41; receive
            mentoring, career training, and professional development as they
            work on these current projects.
          </p>
        </div>
        <div className="md:w-1/2 md:order-last">
          <Image
            className="m-auto text-left mb-6 hidden md:block md:order-last"
            src={ProjectsImg}
            alt="two person talking"
            width={300}
            height={200}
          />
          <Image
            className="m-auto text-left mb-6 block md:hidden"
            src={ProjectsImg}
            alt="people talking"
            width={300}
            height={100}
          />
        </div>
      </div>
    </section>
  );
}