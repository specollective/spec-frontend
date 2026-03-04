import React from 'react'
import { Heading1, Heading3 } from '../Typography/Heading'
import { Paragraph1 } from '../Typography/Paragraph'
import { Eyebrow } from '../Typography/Eyebrow'

const pillars = [
  {
    title: 'Engaged Research',
    description:
      'Prioritizing community participation in research — including those affected as equal partners in shaping questions, making decisions, and creating programs.',
  },
  {
    title: 'Collaborative Mentorship',
    description:
      'A inclusive and cyclical mentoring style that promotes fair learning, fostering balanced mentor-mentee bonds through open conversation and co-creation.',
  },
  {
    title: 'Applied Learning',
    description:
      'Hands-on education where people use skills and theories in real situations, applying knowledge in actual projects for social impact.',
  },
  {
    title: 'Capacity Building',
    description:
      'Empowering organizations through skill-building programs, leadership training, and community growth support.',
  },
  {
    title: 'Career Development',
    description:
      'Connecting organizations with exceptional talent and skilled professionals, with ongoing leadership training and community growth support.',
  },
]

export default function Approach() {
  return (
    <section
      aria-labelledby="approach-heading"
      className="py-16 md:py-24 px-6 md:px-12 lg:px-16 xl:px-20"
    >
      <div className="max-w-screen-xl mx-auto">
        <Eyebrow className="mb-4">OUR APPROACH</Eyebrow>
        <Heading1 as="h2" className="max-w-screen-md">
          <span id="approach-heading">
            The pillars of our work
          </span>
        </Heading1>
        <Paragraph1 className="mt-6 max-w-screen-md text-spec-gray">
          Our approach integrates research, mentorship, learning, and
          organizational development to create lasting social impact.
        </Paragraph1>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {pillars.map((pillar) => (
            <div key={pillar.title}>
              <Heading3 as="h3" className="mb-4">
                {pillar.title}
              </Heading3>
              <Paragraph1 className="text-spec-gray">
                {pillar.description}
              </Paragraph1>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
