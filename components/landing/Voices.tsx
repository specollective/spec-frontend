import React from 'react'
import Image from 'next/image'
import { Heading1 } from '../Typography/Heading'
import { Paragraph2 } from '../Typography/Paragraph'
import { Eyebrow } from '../Typography/Eyebrow'
import { testimonialsData } from '../../constants/testimonials-data'

export default function Voices() {
  return (
    <section
      aria-labelledby="voices-heading"
      className="bg-spec-lemon py-16 md:py-24 px-6 md:px-12 lg:px-16 xl:px-20"
    >
      <div className="max-w-screen-xl mx-auto">
        <Eyebrow className="mb-4">FROM OUR COMMUNITY</Eyebrow>
        <Heading1 as="h2" className="max-w-screen-md">
          <span id="voices-heading">
            People who grew with SPEC
          </span>
        </Heading1>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonialsData.map((testimonial) => (
            <blockquote
              key={testimonial.name}
              className="bg-white p-6 md:p-8 rounded-br-3xl rounded-tl-3xl"
            >
              <Paragraph2 className="text-spec-gray italic">
                &ldquo;{testimonial.quote}&rdquo;
              </Paragraph2>
              <footer className="mt-6 flex items-center gap-4">
                <Image
                  src={testimonial.src}
                  alt={testimonial.image.alt}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <div>
                  <p className="font-montserrat font-semibold text-sm">
                    {testimonial.name}
                  </p>
                  <p className="font-montserrat text-sm text-spec-gray">
                    {testimonial.title}
                  </p>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
