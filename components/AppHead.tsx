import Head from 'next/head'
import Script from 'next/script'
import { useTranslation } from 'next-i18next/pages'
import { SITE_URL } from '../constants/seo'

const DEFAULT_OG_IMAGE =
  'https://spec-bucket.nyc3.cdn.digitaloceanspaces.com/spec-logo-old.png'

interface AppHeadProps {
  title?: string
  description?: string
  image?: string
  path?: string
}

export function AppHead({ title, description, image, path }: AppHeadProps) {
  const { t } = useTranslation('common')
  const pageTitle = title ? `${title} | ${t('site.title')}` : t('site.title')
  const ogTitle = title ?? t('site.ogTitle')
  const ogDescription = description ?? t('site.ogDescription')
  const ogImage = image ?? DEFAULT_OG_IMAGE
  const ogUrl = path ? `${SITE_URL}${path}` : `${SITE_URL}/`
  // The default SPEC logo is square, so it uses the small summary card;
  // custom images are expected to be 1200x630 large-card images.
  const twitterCard = image ? 'summary_large_image' : 'summary'
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <link rel="icon" type="image/png" href="/favicon-16x16.png" />
        <meta property="og:title" content={ogTitle} key="og:title" />
        <meta property="og:url" content={ogUrl} key="og:url" />
        <meta property="og:image" content={ogImage} key="og:image" />
        <meta
          property="og:description"
          content={ogDescription}
          key="og:description"
        />
        <meta name="twitter:card" content={twitterCard} key="twitter:card" />
        <meta name="twitter:title" content={ogTitle} key="twitter:title" />
        <meta
          name="twitter:description"
          content={ogDescription}
          key="twitter:description"
        />
        <meta name="twitter:image" content={ogImage} key="twitter:image" />
      </Head>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-E5SMJ9E985"
        strategy="afterInteractive"
      />
    </>
  )
}

export default AppHead;
