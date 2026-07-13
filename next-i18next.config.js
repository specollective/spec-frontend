/** @type {import('next-i18next').UserConfig} */
module.exports = {
  i18n: {
    defaultLocale: 'en',
    // Add a locale here and drop a matching folder under public/locales/<locale>/
    // to ship another language. No code changes required.
    // 'es' is scaffolded under public/locales/ but excluded until its
    // translations are complete — otherwise /es serves pages tagged
    // lang="es" whose content is still largely English, which breaks
    // screen-reader pronunciation (WCAG 3.1.1). Re-add it here to ship;
    // fallbackLng keeps any remaining untranslated keys readable.
    locales: ['en', 'fr'],
  },
  // Fall back to English for any key a locale has not translated yet. Lets a
  // partially translated locale (e.g. the scaffolded 'fr') render cleanly
  // instead of showing raw keys.
  fallbackLng: 'en',
  // Re-read translation files on every request in dev so edits show up
  // without a server restart. No effect in production.
  reloadOnPrerender: process.env.NODE_ENV === 'development',
}
