import Image from 'next/image'
import { useTranslation } from 'next-i18next/pages'

function SocialMedia () {
  const { t } = useTranslation('common')
  return (
    <div className="flex gap-4">
      <a
        href="https://github.com/specollective"
        target="_blank"
        rel="noreferrer"
        aria-label={t('social.github')}
        className="hover:opacity-75 transition-opacity focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-spec-turquoise rounded"
      >
        <Image
          src="/github-logo.svg"
          alt=""
          width={35}
          height={33}
          priority
        />
      </a>
      <a
        href="https://www.linkedin.com/company/specollective"
        target="_blank"
        rel="noreferrer"
        aria-label={t('social.linkedin')}
        className="hover:opacity-75 transition-opacity focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-spec-turquoise rounded"
      >
        <Image
          src="/linkedin-logo.svg"
          alt=""
          width={35}
          height={33}
          priority
        />
      </a>
      <a
        href="https://www.facebook.com/specollective"
        target="_blank"
        rel="noreferrer"
        aria-label={t('social.facebook')}
        className="hover:opacity-75 transition-opacity focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-spec-turquoise rounded"
      >
        <Image
          src="/facebook-logo.svg"
          alt=""
          width={35}
          height={33}
          priority
        />
      </a>

    </div>
  )
}

//export the component
export default SocialMedia
