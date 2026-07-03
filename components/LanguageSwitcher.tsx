import React from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next/pages'
import nextI18NextConfig from '../next-i18next.config'

interface LanguageSwitcherProps {
  className?: string
}

// Switches the active locale while preserving the current route. Locales are
// read from next-i18next.config so adding a language requires no change here.
export default function LanguageSwitcher({ className = '' }: LanguageSwitcherProps) {
  const router = useRouter()
  const { t } = useTranslation('common')
  const { pathname, asPath, query, locale } = router
  const locales: string[] = nextI18NextConfig.i18n.locales

  function changeLanguage(event: React.ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value
    router.push({ pathname, query }, asPath, { locale: nextLocale })
  }

  return (
    <select
      aria-label={t('languageSwitcher.label')}
      value={locale}
      onChange={changeLanguage}
      className={`font-montserrat font-semibold text-sm border-2 border-black rounded px-2 py-1 bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-spec-turquoise focus:ring-offset-2 ${className}`}
    >
      {locales.map((lng) => (
        <option key={lng} value={lng}>
          {t(`languageSwitcher.${lng}`)}
        </option>
      ))}
    </select>
  )
}
