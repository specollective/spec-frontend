import React from 'react'
import { Trans, useTranslation } from 'next-i18next/pages'
import { Heading1 } from '../Typography/Heading'
import { Paragraph1 } from '../Typography/Paragraph'
import { Eyebrow } from '../Typography/Eyebrow'

export default function Story() {
  const { t } = useTranslation('landing')
  return (
    <section
      aria-labelledby="story-heading"
      className="bg-spec-banana py-16 md:py-24 px-6 md:px-12 lg:px-16 xl:px-20"
    >
      <div className="max-w-screen-md mx-auto">
        <Eyebrow className="mb-4">{t('story.eyebrow')}</Eyebrow>
        <Heading1 as="h2">
          <span id="story-heading">{t('story.heading')}</span>
        </Heading1>

        <div className="mt-8 flex flex-col gap-6">
          <Paragraph1>
            <Trans i18nKey="story.p1" t={t} />
          </Paragraph1>
          <Paragraph1>
            <Trans i18nKey="story.p2" t={t} />
          </Paragraph1>
          <Paragraph1>
            <Trans i18nKey="story.p3" t={t} />
          </Paragraph1>
          <Paragraph1>
            <Trans i18nKey="story.p4" t={t} />
          </Paragraph1>
        </div>
      </div>
    </section>
  )
}
