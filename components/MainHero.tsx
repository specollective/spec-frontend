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
          alt="Hero Background"
          className="absolute w-full h-full object-cover"
          width={500}
          height={500}
        />

        {/* Translucent Overlay */}
        <div className="absolute w-full h-full bg-black opacity-10"></div>

        {/* Opaque Card */}
        <div className="bg-spec-gray bg-opacity-90 rounded-lg shadow-lg px-2 md:px-6 py-2 md:py-20 min-w-[350px] z-10">
          <div className="w-11/12 mx-auto">
            <Heading1 className="text-white text-left md:text-left text-2xl">
              {title}
            </Heading1>
            <Paragraph0 className="text-white text-left pt-4 md:pt-12 w-full">
              {content}
            </Paragraph0>
            <div>
              <Link
                href={{ pathname: '/', hash: "get-involved-section" }}
                className="hidden md:block font-montserrat rounded-br-3xl rounded-tl-3xl bg-spec-sunshine text-center text-lg py-4 tracking-wider text-black w-full md:w-1/3 px-2 font-semibold mt-12" scroll={true}
              >
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
