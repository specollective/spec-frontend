import React from 'react'
import { useTranslation } from 'next-i18next/pages'
import { Heading1, Heading3 } from '../Typography/Heading'
import { Paragraph1 } from '../Typography/Paragraph'
import { Eyebrow } from '../Typography/Eyebrow'

interface Pillar {
  title: string
  description: string
}

export default function Approach() {
  const { t } = useTranslation('landing')
  const pillars = t('approach.pillars', { returnObjects: true }) as Pillar[]
  return (
    <section
      aria-labelledby="approach-heading"
      className="py-16 md:py-24 px-6 md:px-12 lg:px-16 xl:px-20"
    >
      <div className="max-w-screen-xl mx-auto">
        <Eyebrow className="mb-4">{t('approach.eyebrow')}</Eyebrow>
        <Heading1 as="h2" className="max-w-screen-md">
          <span id="approach-heading">{t('approach.heading')}</span>
        </Heading1>
        <Paragraph1 className="mt-6 max-w-screen-md text-spec-gray">
          {t('approach.intro')}
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
