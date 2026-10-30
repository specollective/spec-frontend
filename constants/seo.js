// Canonical origin used to build absolute canonical, hreflang, og:url and
// og:image values, and every URL in /sitemap.xml.
export const SITE_URL = 'https://specollective.org';

// Search-engine indexing toggles for incubating sections.
//
// While a section is still in progress we keep it out of search results with a
// `noindex` robots meta tag (rendered by AppHead for that section's layout) and
// leave it out of /sitemap.xml. When a section is ready to launch publicly,
// flip its flag to `true` and both happen automatically.
export const INDEXABLE = {
  giee: false,
  glqf: false,
};

// Every public, indexable route, locale-free and with the trailing slash the
// site uses. /sitemap.xml lists each one once per enabled locale, with hreflang
// alternates. `section` ties a route to an INDEXABLE flag above. GLQF is not
// listed: it sits behind basic auth.
export const SITEMAP_ROUTES = [
  { path: '/', changefreq: 'monthly', priority: 1.0 },
  { path: '/ourTeam/', changefreq: 'monthly', priority: 0.7 },
  { path: '/journal-of-engaged-research/submissions/', changefreq: 'yearly', priority: 0.5 },
  { path: '/privacy/', changefreq: 'yearly', priority: 0.2 },
  { path: '/giee/', section: 'giee', changefreq: 'monthly', priority: 0.9 },
  { path: '/giee/research/', section: 'giee', changefreq: 'monthly', priority: 0.8 },
  { path: '/giee/partner/', section: 'giee', changefreq: 'yearly', priority: 0.6 },
];
