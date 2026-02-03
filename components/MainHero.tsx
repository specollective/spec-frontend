import React from 'react'
import { Heading1, } from './Typography/Heading'
import { Paragraph0 } from './Typography/Paragraph'
import Link from 'next/link'
import HomeSection from './HomeSection'
import Image from 'next/image'

function MainHero({ title, content }: { title: string; content: string; }) {
  return (
    <div className="relative flex items-center justify-center text-center h-fit">
      <HomeSection className="pb-20">
        {/* Background Image */}
        <Image
          src="/background.jpeg"
          alt=""
          className="absolute w-full h-full object-cover"
          width={500}
          height={500}
        />

        {/* Translucent Overlay */}
        <div className="absolute w-full h-full bg-black opacity-30"></div>

        {/* Opaque Card */}
        {/* <div className="bg-white bg-opacity-90 rounded-lg shadow-lg z-10 p-6 2xl:w-1/2 mx-6"> */}
        <div className="bg-spec-gray bg-opacity-90 rounded-lg shadow-lg px-6 md:px-8 py-12 md:py-16 w-full z-10">
          <div className="w-11/12 mx-auto">
            <Heading1 className="text-white text-left">
              {title}
            </Heading1>
            <Paragraph0 className="text-white text-left mt-8 mb-8 md:mt-12 md:mb-12 w-full">
              {content}
            </Paragraph0>
            <div>
              <Link href="/#get-involved-section" className="inline-flex items-center justify-center font-montserrat rounded-br-3xl rounded-tl-3xl bg-spec-yellow text-center text-lg px-8 py-4 tracking-wide text-black w-full md:w-auto md:min-w-64 font-semibold border-4 border-spec-yellow hover:bg-white hover:border-spec-yellow transition-colors focus:outline-none focus:ring-2 focus:ring-spec-yellow focus:ring-offset-2" scroll={false}>
                JOIN OUR COMMUNITY
              </Link>
            </div>
          </div>
        </div>
      </HomeSection>
    </div>
  );
}

export default MainHero;
