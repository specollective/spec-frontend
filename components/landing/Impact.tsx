import React from 'react'
import { Heading1 } from '../Typography/Heading'
import { Eyebrow } from '../Typography/Eyebrow'

const stats = [
  { value: '$290k', label: 'Raised and distributed to our community' },
  { value: '28', label: 'Career placements' },
  { value: '15', label: 'Projects developed and completed' },
  { value: '7', label: 'Partnerships and collaborations' },
]

export default function Impact() {
  return (
    <section
      aria-labelledby="impact-heading"
      className="bg-spec-turquoise text-white py-16 md:py-24 px-6 md:px-12 lg:px-16 xl:px-20"
    >
      <div className="max-w-screen-xl mx-auto">
        <Eyebrow className="mb-4 text-spec-lemon">BY THE NUMBERS</Eyebrow>
        <Heading1 as="h2" className="max-w-screen-md">
          <span id="impact-heading">
            Real impact, transparently reported
          </span>
        </Heading1>

        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat) => (
            <div key={stat.value}>
              <p className="font-dmserif text-5xl md:text-6xl lg:text-7xl leading-none">
                {stat.value}
              </p>
              <p className="font-montserrat text-base md:text-lg mt-3 leading-relaxed text-spec-lemon">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
