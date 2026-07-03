import { useTranslation } from 'next-i18next/pages'
import SocialMedia from './SocialMedia'

export default function Footer() {
  const { t } = useTranslation('common')
  return (
    <footer className="bg-spec-turquoise py-16 px-6">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-16 xl:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="flex flex-col items-center lg:items-start gap-8">
            <div className="lg:hidden">
              <SocialMedia />
            </div>

            <p className="font-montserrat text-center lg:text-left text-sm md:text-base">
              {t('footer.copyright')}
            </p>
          </div>

          <div className="hidden lg:flex lg:flex-col lg:items-end gap-6">
            <nav className="flex flex-col items-end gap-3" aria-label={t('footer.navigation')}>
              <a
                href="https://medium.com/journal-of-engaged-research"
                target="_blank"
                rel="noreferrer"
                className="font-montserrat text-base hover:underline underline-offset-4 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-spec-turquoise"
              >
                {t('footer.journal')}
                <span className="sr-only">{t('footer.opensNewTab')}</span>
              </a>
              <a
                href="https://medium.com/journal-of-engaged-research/expressions/home"
                target="_blank"
                rel="noreferrer"
                className="font-montserrat text-base hover:underline underline-offset-4 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-spec-turquoise"
              >
                {t('footer.gallery')}
                <span className="sr-only">{t('footer.opensNewTab')}</span>
              </a>
              <a
                href="https://hcb.hackclub.com/donations/start/spec"
                target="_blank"
                rel="noreferrer"
                className="font-montserrat text-base hover:underline underline-offset-4 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-spec-turquoise"
              >
                {t('footer.donate')}
                <span className="sr-only">{t('footer.opensNewTab')}</span>
              </a>
            </nav>

            <div className="mt-4">
              <SocialMedia />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
