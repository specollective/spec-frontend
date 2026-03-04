import React from 'react'
import { Heading1, Heading3 } from '../Typography/Heading'
import { Paragraph1, Paragraph2 } from '../Typography/Paragraph'
import { Eyebrow } from '../Typography/Eyebrow'

const programs = [
  {
    title: 'CITISEN Program',
    description:
      'Provided paid internships where research associates partnered with communities on social impact research, gaining professional skills while contributing to meaningful projects.',
  },
  {
    title: 'Tech Empowerment',
    description:
      'Addressed the digital divide by providing laptops and one-on-one mentorship, helping participants build technical skills through real-world project experience.',
  },
  {
    title: 'Journal of Engaged Research',
    description:
      'Created a publication platform for diverse voices often excluded from traditional academic journals, mentoring emerging scholars through the editorial process.',
  },
  {
    title: 'Social Impact Incubator',
    description:
      'Offered mentorship, resources, and organizational guidance to new social justice initiatives, including Advocates Creating Equality (ACE) focused on youth education around culture and diversity.',
  },
  {
    title: 'Open Source Projects',
    description:
      'Built an accessible learning platform, designed open-source recycling hardware, and developed an inclusive design system — all publicly available for community use.',
  },
]

export default function Programs() {
  return (
    <section
      aria-labelledby="programs-heading"
      className="py-16 md:py-24 px-6 md:px-12 lg:px-16 xl:px-20"
    >
      <div className="max-w-screen-xl mx-auto">
        <Heading1 as="h2" className="max-w-screen-md">
          <span id="programs-heading">
            Programs and initiatives that made a difference
          </span>
        </Heading1>

        <Paragraph1 className="mt-6 max-w-screen-md text-spec-gray">
          Through these initiatives we have empowered individuals and
          organizations to make a meaningful difference in their communities
          and beyond.
        </Paragraph1>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program) => (
            <div
              key={program.title}
              className="border-t-4 border-spec-turquoise pt-6"
            >
              <Heading3 as="h3" className="mb-3">
                {program.title}
              </Heading3>
              <Paragraph2>{program.description}</Paragraph2>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
