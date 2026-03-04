import React from 'react'
import { Heading1 } from '../Typography/Heading'
import { Paragraph1 } from '../Typography/Paragraph'
import { Eyebrow } from '../Typography/Eyebrow'

export default function Story() {
  return (
    <section
      aria-labelledby="story-heading"
      className="bg-spec-banana py-16 md:py-24 px-6 md:px-12 lg:px-16 xl:px-20"
    >
      <div className="max-w-screen-md mx-auto">
        <Eyebrow className="mb-4">OUR STORY</Eyebrow>
        <Heading1 as="h2">
          <span id="story-heading">Born from crisis, built on shared purpose</span>
        </Heading1>

        <div className="mt-8 flex flex-col gap-6">
          <Paragraph1>
            SPEC grew out of{' '}
            <strong>The Buffalo Project</strong>, a 10-year participatory
            research initiative that investigated how cultural data could
            improve learning programs. Led by Dr. Rhianna Rogers, the research
            revealed that students were not being adequately taught
            intercultural competencies — and that engaging communities directly
            could transform program design and delivery.
          </Paragraph1>
          <Paragraph1>
            When the COVID-19 pandemic hit in 2020, funding for that research
            was cut and students lost their positions overnight. Around the same
            time, Joe Torreggiani posted a public offer to provide mentoring,
            technical training, and micro-loans to people from underrepresented
            backgrounds. Rhianna reached out, and the two discovered an
            immediate shared passion for environmental and social justice. Joe
            offered to cover a student&apos;s pay so the research could
            continue, and within a week they had formed SPEC as an open
            collective — with full financial transparency from day one.
          </Paragraph1>
          <Paragraph1>
            We understand that for many people from underserved communities,
            they cannot give back or help others until they can access essential
            goods and services, learn professional skills, and achieve physical
            and financial security. That understanding drives everything we do:
            engaged research, collaborative mentorship, applied learning,
            capacity building, and pathways to sustainable careers.
          </Paragraph1>
          <Paragraph1>
            The name says it plainly — <strong>sustainable progress</strong>{' '}
            means taking collective action to create a more equal and just
            world, without hurting people or the planet. That work continues.
          </Paragraph1>
        </div>
      </div>
    </section>
  )
}
