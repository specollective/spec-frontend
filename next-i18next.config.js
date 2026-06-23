/** @type {import('next-i18next').UserConfig} */
module.exports = {
  i18n: {
    defaultLocale: 'en',
    // Add a locale here and drop a matching folder under public/locales/<locale>/
    // to ship another language. No code changes required.
    locales: ['en', 'es'],
  },
  // Re-read translation files on every request in dev so edits show up
  // without a server restart. No effect in production.
  reloadOnPrerender: process.env.NODE_ENV === 'development',
}
