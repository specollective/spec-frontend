const { i18n } = require('./next-i18next.config')

// Long-lived caching for files in public/ that are referenced by stable names.
// (Next's own /_next/static assets are already hashed and immutable.)
const PUBLIC_ASSET_CACHE = 'public, max-age=604800, stale-while-revalidate=86400'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // Served by the long-running `next start` server on App Platform, so the
    // built-in optimizer (sharp) resizes and re-encodes raster images per
    // device. SVGs are passed through untouched.
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 2678400,
  },
  trailingSlash: true,
  i18n,
  async headers() {
    return [
      { source: '/partners/:path*', headers: [{ key: 'Cache-Control', value: PUBLIC_ASSET_CACHE }] },
      { source: '/faces/:path*', headers: [{ key: 'Cache-Control', value: PUBLIC_ASSET_CACHE }] },
      { source: '/:file(favicon.ico|icon-192.png|icon-512.png|apple-touch-icon.png|site.webmanifest|giee-og.jpg|spec-logo.png)', headers: [{ key: 'Cache-Control', value: PUBLIC_ASSET_CACHE }] },
    ]
  },
}

module.exports = nextConfig
