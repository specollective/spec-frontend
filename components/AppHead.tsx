import Head from 'next/head'
import Script from 'next/script'
import { useTranslation } from 'next-i18next/pages'

export function AppHead() {
  const { t } = useTranslation('common')
  return (
    <>
      <Head>
        <title>{t('site.title')}</title>
        <link rel="icon" type="image/png" href="/favicon-16x16.png" />
        <meta property="og:title" content={t('site.ogTitle')} />
        <meta property="og:url" content="https://specollective.org/" />
        <meta
          property="og:image"
          content="https://spec-bucket.nyc3.cdn.digitaloceanspaces.com/spec-logo-old.png"
        />
        <meta property="og:description" content={t('site.ogDescription')} />
        <meta
          name="twitter:card"
          content="https://spec-bucket.nyc3.cdn.digitaloceanspaces.com/spec-logo-old.png"
        />
        <meta name="twitter:title" content={t('site.ogTitle')} />
      </Head>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-E5SMJ9E985"
        strategy="afterInteractive"
      />
    </>
  )
}

export default AppHead;
