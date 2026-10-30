import { INDEXABLE, SITEMAP_ROUTES } from "../constants/seo";
import { DEFAULT_LOCALE, LOCALES, absoluteUrl } from "./seo";

type Route = {
  path: string;
  section?: keyof typeof INDEXABLE;
  changefreq: string;
  priority: number;
};

const escapeXml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/**
 * One <url> per route and enabled locale, each listing every translation as an
 * hreflang alternate (plus x-default), as Google recommends for localized sites.
 * Routes in a section whose INDEXABLE flag is off are left out.
 */
export function buildSitemap(routes: Route[] = SITEMAP_ROUTES as Route[]): string {
  const live = routes.filter((r) => !r.section || INDEXABLE[r.section]);
  const urls = live.flatMap((route) =>
    LOCALES.map((locale) => {
      const alternates = [
        ...LOCALES.map(
          (alt) =>
            `    <xhtml:link rel="alternate" hreflang="${alt}" href="${escapeXml(
              absoluteUrl(route.path, alt),
            )}"/>`,
        ),
        `    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(
          absoluteUrl(route.path, DEFAULT_LOCALE),
        )}"/>`,
      ].join("\n");
      return `  <url>
    <loc>${escapeXml(absoluteUrl(route.path, locale))}</loc>
${alternates}
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority.toFixed(1)}</priority>
  </url>`;
    }),
  );
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join("\n")}
</urlset>
`;
}
