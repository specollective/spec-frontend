import React from 'react'
import { useTranslation } from 'next-i18next/pages'
import { Heading1, Heading3 } from '../Typography/Heading'
import { Paragraph1, Paragraph2 } from '../Typography/Paragraph'
import { Eyebrow } from '../Typography/Eyebrow'

// URLs are not translatable content, so they stay in code and are paired with
// the localized name/description by index.
const partnerUrls = [
  'https://carep.specollective.org/',
  'https://buildjustly.org/',
  'https://opensourcemedicalsupplies.org/',
  'https://www.pubinv.org/',
]

interface Partner {
  name: string
  description: string
}

export default function Partnerships() {
  const { t } = useTranslation('landing')
  const partners = t('partnerships.partners', { returnObjects: true }) as Partner[]
  return (
    <section
      aria-labelledby="partnerships-heading"
      className="py-16 md:py-24 px-6 md:px-12 lg:px-16 xl:px-20"
    >
      <div className="max-w-screen-xl mx-auto">
        <Eyebrow className="mb-4">{t('partnerships.eyebrow')}</Eyebrow>
        <Heading1 as="h2" className="max-w-screen-md">
          <span id="partnerships-heading">{t('partnerships.heading')}</span>
        </Heading1>
        <Paragraph1 className="mt-6 max-w-screen-md text-spec-gray">
          {t('partnerships.intro')}
        </Paragraph1>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {partners.map((partner, index) => (
            <div
              key={partner.name}
              className="border-l-4 border-spec-turquoise pl-6"
            >
              <Heading3 as="h3" className="mb-3">
                <a
                  href={partnerUrls[index]}
                  className="text-spec-turquoise underline hover:no-underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {partner.name}
                </a>
              </Heading3>
              <Paragraph2 className="text-spec-gray">
                {partner.description}
              </Paragraph2>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
