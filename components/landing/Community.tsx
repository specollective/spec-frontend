import React from 'react'
import Image from 'next/image'
import { useTranslation } from 'next-i18next/pages'
import { Heading1 } from '../Typography/Heading'
import { Paragraph1, Paragraph2 } from '../Typography/Paragraph'
import { Eyebrow } from '../Typography/Eyebrow'
import { communityMembers, testimonials } from '../../constants/community-data'

export default function Community() {
  const { t } = useTranslation('landing')
  return (
    <section
      aria-labelledby="community-heading"
      className="bg-spec-lemon py-16 md:py-24 px-6 md:px-12 lg:px-16 xl:px-20"
    >
      <div className="max-w-screen-xl mx-auto">
        <Eyebrow className="mb-4">{t('community.eyebrow')}</Eyebrow>
        <Heading1 as="h2" className="max-w-screen-md">
          <span id="community-heading">{t('community.heading')}</span>
        </Heading1>
        <Paragraph1 className="mt-4 max-w-screen-md text-spec-gray">
          {t('community.intro')}
        </Paragraph1>

        {/* Face tile grid */}
        <div className="mt-12 grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-10 gap-3 md:gap-4">
          {communityMembers.map((member) => (
            <div key={member.name} className="aspect-square rounded-full overflow-hidden bg-spec-banana">
              <Image
                src={member.image}
                alt={member.name}
                width={120}
                height={120}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="mt-16">
          <Eyebrow className="mb-4">{t('community.testimonialsEyebrow')}</Eyebrow>
          <Heading1 as="h3" className="max-w-screen-md">
            {t('community.testimonialsHeading')}
          </Heading1>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial) => (
            <blockquote
              key={testimonial.name}
              className="bg-white p-6 md:p-8 rounded-br-3xl rounded-tl-3xl"
            >
              <Paragraph2 className="text-spec-gray italic">
                &ldquo;{testimonial.quote}&rdquo;
              </Paragraph2>
              <footer className="mt-6 flex items-center gap-4">
                <Image
                  src={testimonial.src}
                  alt={testimonial.image.alt}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <div>
                  <p className="font-montserrat font-semibold text-sm">
                    {testimonial.name}
                  </p>
                  <p className="font-montserrat text-sm text-spec-gray">
                    {testimonial.title}
                  </p>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
