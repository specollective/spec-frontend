import React from 'react';
import Image from 'next/image';
import ProjectsImg from '../public/ProjectsImage.svg';

export default function HowWeWork() {
  return (
    <section>
      <div className='flex flex-col lg:flex lg:flex-row mx-12 my-16 md:mx-12 lg:mx-44 lg:px-12 items-center justify-center'>
        <div className="lg:w-1/2 lg:max-w-lg lg:pl-10">
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
        </div>
        <div className="lg:w-1/2 order-first lg:order-last">
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
        </div>
      </div>
    </section>
  );
}
