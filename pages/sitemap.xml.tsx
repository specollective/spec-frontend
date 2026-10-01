import type { GetServerSideProps } from "next";
import { buildSitemap } from "../utils/sitemap";
import { DEFAULT_LOCALE } from "../utils/seo";

export const getServerSideProps: GetServerSideProps = async ({ res, locale }) => {
  // One sitemap for the whole site: /fr/sitemap.xml is not a thing.
  if (locale && locale !== DEFAULT_LOCALE) return { notFound: true };
  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=3600, s-maxage=86400");
  res.write(buildSitemap());
  res.end();
  return { props: {} };
};

export default function Sitemap() {
  return null;
}
