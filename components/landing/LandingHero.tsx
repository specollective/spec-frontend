import React from 'react'
import Image from 'next/image'
import { useTranslation } from 'next-i18next/pages'
import { Heading0, Subtitle1 } from '../Typography/Heading'
import SocialMedia from '../SocialMedia'

export default function LandingHero() {
  const { t } = useTranslation('landing')
  return (
    <section
      aria-labelledby="hero-heading"
      className="flex flex-col items-center justify-center px-6 md:px-12 lg:px-16 xl:px-20 py-20 md:py-28 max-w-screen-xl mx-auto"
    >
      <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
        <div className="flex-shrink-0">
          <Image
            src="/spec-logo.svg"
            alt={t('hero.logoAlt')}
            width={240}
            height={300}
            className="w-40 md:w-52 lg:w-64"
            priority
          />
        </div>

        <div className="flex flex-col gap-6 text-center md:text-left">
          <Heading0 className="" as="h1">
            <span id="hero-heading">{t('hero.title')}</span>
          </Heading0>
          <Subtitle1>{t('hero.subtitle')}</Subtitle1>
          <div className="pt-2">
            <SocialMedia />
          </div>
        </div>
      </div>
    </section>
  )
}
