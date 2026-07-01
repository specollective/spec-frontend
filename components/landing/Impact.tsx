import React from 'react'
import { useTranslation } from 'next-i18next/pages'
import { Heading1 } from '../Typography/Heading'
import { Eyebrow } from '../Typography/Eyebrow'

interface Stat {
  value: string
  label: string
}

export default function Impact() {
  const { t } = useTranslation('landing')
  const stats = t('impact.stats', { returnObjects: true }) as Stat[]
  return (
    <section
      aria-labelledby="impact-heading"
      className="bg-spec-turquoise text-white py-16 md:py-24 px-6 md:px-12 lg:px-16 xl:px-20"
    >
      <div className="max-w-screen-xl mx-auto">
        <Eyebrow className="mb-4 text-spec-lemon">{t('impact.eyebrow')}</Eyebrow>
        <Heading1 as="h2" className="max-w-screen-md">
          <span id="impact-heading">{t('impact.heading')}</span>
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
