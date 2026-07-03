import React from 'react'
import { useTranslation } from 'next-i18next/pages'
import { Heading1 } from '../Typography/Heading'
import { Paragraph1 } from '../Typography/Paragraph'
import { Eyebrow } from '../Typography/Eyebrow'
import SocialMedia from '../SocialMedia'

export default function Connect() {
  const { t } = useTranslation('landing')
  return (
    <section
      id="connect"
      aria-labelledby="connect-heading"
      className="bg-spec-banana py-16 md:py-24 px-6 md:px-12 lg:px-16 xl:px-20"
    >
      <div className="max-w-screen-md mx-auto text-center">
        <Eyebrow className="mb-4">{t('connect.eyebrow')}</Eyebrow>
        <Heading1 as="h2">
          <span id="connect-heading">{t('connect.heading')}</span>
        </Heading1>

        <div className="mt-8 flex flex-col items-center gap-6">
          <Paragraph1 className="text-spec-gray">{t('connect.intro')}</Paragraph1>

          <a
            href="mailto:info@specollective.org"
            className="font-montserrat font-semibold text-lg md:text-xl text-spec-turquoise-dark underline underline-offset-4 hover:text-spec-black transition-colors focus:outline-none focus:ring-2 focus:ring-spec-turquoise focus:ring-offset-2 rounded"
          >
            info@specollective.org
          </a>

          <div className="pt-4">
            <SocialMedia />
          </div>
        </div>
      </div>
    </section>
  )
}
