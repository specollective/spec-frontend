import React from 'react'
import Image from 'next/image'
import AppHead from '../components/AppHead'
import SocialMedia from '../components/SocialMedia'

export default function Home() {
  return (
    <>
      <AppHead />
      <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6 md:px-12 lg:px-16">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20 max-w-screen-lg mx-auto">
          <div className="flex-shrink-0">
            <Image
              src="/spec-logo.svg"
              alt="SPEC tree logo"
              width={240}
              height={300}
              className="w-40 md:w-60 lg:w-72"
              priority
            />
          </div>

          <div className="flex flex-col gap-6 text-center md:text-left">
            <h1 className="font-dmserif leading-tight text-4xl md:text-5xl lg:text-6xl">
              Sustainable Progress &amp; Equality Collective
            </h1>
            <p className="font-montserrat leading-relaxed text-base md:text-lg text-spec-gray max-w-prose">
              SPEC is a diverse community of people working together to provide resources and opportunities essential to learning skills, building careers, and becoming leaders of sustainable social impact.
            </p>
            <p className="font-montserrat leading-relaxed text-base md:text-lg text-spec-gray max-w-prose">
              Our website is currently under construction. In the meantime, reach us at{' '}
              <a
                href="mailto:info@specollective.org"
                className="text-spec-turquoise underline underline-offset-2 hover:text-spec-black transition-colors focus:outline-none focus:ring-2 focus:ring-spec-turquoise focus:ring-offset-2 rounded"
              >
                info@specollective.org
              </a>
            </p>

            <div className="pt-2">
              <SocialMedia />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
