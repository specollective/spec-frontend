/** @type {import('next-i18next').UserConfig} */
module.exports = {
  i18n: {
    defaultLocale: 'en',
    // Add a locale here and drop a matching folder under public/locales/<locale>/
    // to ship another language. No code changes required.
    // 'fr' is scaffolded: its catalogs are English placeholders pending
    // translation, and fallbackLng keeps any untranslated keys readable.
    locales: ['en', 'es', 'fr'],
  },
  // Fall back to English for any key a locale has not translated yet. Lets a
  // partially translated locale (e.g. the scaffolded 'fr') render cleanly
  // instead of showing raw keys.
  fallbackLng: 'en',
  // Re-read translation files on every request in dev so edits show up
  // without a server restart. No effect in production.
  reloadOnPrerender: process.env.NODE_ENV === 'development',
}
