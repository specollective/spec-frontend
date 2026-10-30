// URL and structured-data (schema.org JSON-LD) helpers shared by AppHead, the
// GIEE pages and the sitemap. Everything here is pure, so it can run on the
// server (sitemap) and in components alike.

import type { TFunction } from "i18next";
import nextI18NextConfig from "../next-i18next.config";
import { SITE_URL } from "../constants/seo";

export type JsonLd = Record<string, unknown>;

export const LOCALES: string[] = nextI18NextConfig.i18n.locales;
export const DEFAULT_LOCALE: string = nextI18NextConfig.i18n.defaultLocale;

// BCP 47 for hreflang / inLanguage, and Open Graph's underscore form.
const OG_LOCALE: Record<string, string> = { en: "en_US", es: "es_ES", fr: "fr_FR" };
export const ogLocale = (locale: string) => OG_LOCALE[locale] ?? locale;

/** "/giee?x=1#top" → "/giee/" (the site uses trailingSlash: true). */
export function normalizePath(asPath: string): string {
  const path = asPath.split(/[?#]/)[0] || "/";
  return path.endsWith("/") ? path : `${path}/`;
}

/** Absolute URL for a locale-free path in a given locale. */
export function absoluteUrl(path: string, locale: string = DEFAULT_LOCALE): string {
  const clean = normalizePath(path);
  const prefix = locale && locale !== DEFAULT_LOCALE ? `/${locale}` : "";
  return `${SITE_URL}${prefix}${clean}`;
}

// ── Site-wide entities ───────────────────────────────────────────────────────

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const GIEE_ID = `${SITE_URL}/giee/#project`;

export function organizationLd(description: string): JsonLd {
  return {
    "@type": "NGO",
    "@id": ORGANIZATION_ID,
    name: "Sustainable Progress & Equality Collective",
    alternateName: "SPEC",
    url: `${SITE_URL}/`,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/icon-512.png`,
      width: 512,
      height: 512,
    },
    description,
    email: "info@specollective.org",
    sameAs: [
      "https://www.linkedin.com/company/specollective",
      "https://github.com/specollective",
      "https://www.facebook.com/specollective",
      "https://medium.com/journal-of-engaged-research",
    ],
  };
}

export function websiteLd(name: string): JsonLd {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: `${SITE_URL}/`,
    name,
    publisher: { "@id": ORGANIZATION_ID },
    inLanguage: LOCALES,
  };
}

export function breadcrumbLd(
  items: { name: string; path: string }[],
  locale?: string,
): JsonLd {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path, locale),
    })),
  };
}

// ── GIEE ────────────────────────────────────────────────────────────────────

export function gieeProjectLd(t: TFunction, locale?: string): JsonLd {
  return {
    "@type": "ResearchProject",
    "@id": GIEE_ID,
    name: t("name"),
    alternateName: ["GIEE", "Global AI Governance & Inclusive Education Ecosystem"],
    url: absoluteUrl("/giee/", locale),
    description: t("meta.home.description"),
    image: `${SITE_URL}/giee-og.jpg`,
    parentOrganization: { "@id": ORGANIZATION_ID },
    sameAs: ["https://www.linkedin.com/groups/20130046/"],
    areaServed: "Worldwide",
    knowsAbout: [
      "AI governance",
      "AI in education",
      "Inclusive education",
      "Education policy",
      "Regulatory sandbox",
    ],
  };
}

interface CaseStudyLike {
  slug: string;
  name: string;
  description: string;
  locations?: { name: string; region: string }[];
}

export function caseStudyListLd(
  studies: CaseStudyLike[],
  locale: string | undefined,
  name: string,
): JsonLd {
  const list = Array.isArray(studies) ? studies : [];
  return {
    "@type": "ItemList",
    name,
    numberOfItems: list.length,
    itemListElement: list.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "ResearchProject",
        name: s.name,
        description: s.description,
        url: `${absoluteUrl("/giee/research/", locale)}#${s.slug}`,
        parentOrganization: { "@id": GIEE_ID },
        ...(s.locations?.some((l) => l.region !== "online")
          ? {
              location: s.locations
                .filter((l) => l.region !== "online")
                .map((l) => ({ "@type": "Place", name: l.name })),
            }
          : {}),
      },
    })),
  };
}

export function partnerPageLd(t: TFunction, locale?: string): JsonLd {
  return {
    "@type": "ContactPage",
    name: t("meta.partner.title"),
    description: t("meta.partner.description"),
    url: absoluteUrl("/giee/partner/", locale),
    about: { "@id": GIEE_ID },
  };
}
