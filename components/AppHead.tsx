import Head from 'next/head'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next/pages'
import {
  DEFAULT_LOCALE,
  LOCALES,
  absoluteUrl,
  normalizePath,
  ogLocale,
  organizationLd,
  websiteLd,
  type JsonLd,
} from '../utils/seo'

export type { JsonLd }

const DEFAULT_OG_IMAGE =
  'https://spec-bucket.nyc3.cdn.digitaloceanspaces.com/spec-logo-old.png'

interface AppHeadProps {
  /** Page title; " | SPEC" is appended. Omit on the homepage. */
  title?: string
  /** Unique meta description, ideally 120–160 characters. */
  description?: string
  /** Absolute URL of a 1200×630 share image. */
  image?: string
  imageAlt?: string
  /** Keep the page out of search results (and out of the sitemap). */
  noindex?: boolean
  /** Page-specific schema.org nodes, added to the site-wide graph. */
  jsonLd?: JsonLd[]
}

/**
 * Every page's <head>: title, description, canonical + hreflang alternates,
 * Open Graph / Twitter cards, robots and JSON-LD. URLs are derived from the
 * router, so each locale's page is canonical to itself and points at its
 * translations (and an x-default) — no page needs to pass its own path.
 */
export function AppHead({
  title,
  description,
  image,
  imageAlt,
  noindex = false,
  jsonLd = [],
}: AppHeadProps) {
  const { t } = useTranslation('common')
  const { asPath, locale } = useRouter()
  const activeLocale = locale && LOCALES.includes(locale) ? locale : DEFAULT_LOCALE
  const path = normalizePath(asPath || '/')

  const siteName = t('site.title')
  const pageTitle = title ? `${title} | ${t('site.shortName')}` : t('site.homeTitle')
  const ogTitle = title ?? t('site.ogTitle')
  const metaDescription = description ?? t('site.ogDescription')
  const ogImage = image ?? DEFAULT_OG_IMAGE
  const canonical = absoluteUrl(path, activeLocale)
  // The default SPEC logo is square, so it uses the small summary card;
  // custom images are expected to be 1200x630 large-card images.
  const twitterCard = image ? 'summary_large_image' : 'summary'

  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      organizationLd(t('site.ogDescription')),
      websiteLd(siteName),
      {
        '@type': 'WebPage',
        '@id': `${canonical}#webpage`,
        url: canonical,
        name: pageTitle,
        description: metaDescription,
        inLanguage: activeLocale,
        isPartOf: { '@id': `${absoluteUrl('/', DEFAULT_LOCALE)}#website` },
      },
      ...jsonLd.filter(Boolean),
    ],
  }

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={metaDescription} key="description" />
      <meta
        name="robots"
        content={
          noindex
            ? 'noindex, nofollow'
            : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
        }
        key="robots"
      />
      <link rel="canonical" href={canonical} key="canonical" />
      {!noindex &&
        LOCALES.map((code) => (
          <link
            key={`alternate-${code}`}
            rel="alternate"
            hrefLang={code}
            href={absoluteUrl(path, code)}
          />
        ))}
      {!noindex && (
        <link
          rel="alternate"
          hrefLang="x-default"
          href={absoluteUrl(path, DEFAULT_LOCALE)}
          key="alternate-x-default"
        />
      )}

      <meta property="og:type" content="website" key="og:type" />
      <meta property="og:site_name" content={siteName} key="og:site_name" />
      <meta property="og:title" content={ogTitle} key="og:title" />
      <meta property="og:description" content={metaDescription} key="og:description" />
      <meta property="og:url" content={canonical} key="og:url" />
      <meta property="og:image" content={ogImage} key="og:image" />
      {image && <meta property="og:image:width" content="1200" key="og:image:width" />}
      {image && <meta property="og:image:height" content="630" key="og:image:height" />}
      {imageAlt && <meta property="og:image:alt" content={imageAlt} key="og:image:alt" />}
      <meta property="og:locale" content={ogLocale(activeLocale)} key="og:locale" />
      {LOCALES.filter((code) => code !== activeLocale).map((code) => (
        <meta
          key={`og:locale:alternate-${code}`}
          property="og:locale:alternate"
          content={ogLocale(code)}
        />
      ))}

      <meta name="twitter:card" content={twitterCard} key="twitter:card" />
      <meta name="twitter:title" content={ogTitle} key="twitter:title" />
      <meta name="twitter:description" content={metaDescription} key="twitter:description" />
      <meta name="twitter:image" content={ogImage} key="twitter:image" />
      {imageAlt && <meta name="twitter:image:alt" content={imageAlt} key="twitter:image:alt" />}

      <script
        type="application/ld+json"
        key="ld-json"
        // JSON.stringify output with "<" escaped cannot close the script tag.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(graph).replace(/</g, '\\u003c'),
        }}
      />
      {/* Google Analytics was removed for GDPR compliance: it loaded for every
          visitor without consent. If analytics is reintroduced, it must sit
          behind a consent banner (or use a cookieless provider). */}
    </Head>
  )
}

export default AppHead
