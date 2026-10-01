import { absoluteUrl, normalizePath, caseStudyListLd } from "../../utils/seo";
import { buildSitemap } from "../../utils/sitemap";

describe("seo helpers", () => {
  it("normalizes paths to the site's trailing-slash form", () => {
    expect(normalizePath("/giee")).toBe("/giee/");
    expect(normalizePath("/giee/research?x=1#top")).toBe("/giee/research/");
    expect(normalizePath("")).toBe("/");
  });

  it("builds absolute, locale-prefixed URLs (default locale unprefixed)", () => {
    expect(absoluteUrl("/", "en")).toBe("https://specollective.org/");
    expect(absoluteUrl("/", "fr")).toBe("https://specollective.org/fr/");
    expect(absoluteUrl("/giee/research", "fr")).toBe(
      "https://specollective.org/fr/giee/research/",
    );
  });

  it("lists case studies as ResearchProjects, without online-only places", () => {
    const ld = caseStudyListLd(
      [
        { slug: "a", name: "A", description: "a", locations: [{ name: "Online", region: "online" }] },
        { slug: "b", name: "B", description: "b", locations: [{ name: "Belgium", region: "eu" }] },
      ],
      "en",
      "List",
    ) as { itemListElement: { item: Record<string, unknown> }[] };
    expect(ld.itemListElement[0].item.location).toBeUndefined();
    expect(ld.itemListElement[1].item.location).toEqual([{ "@type": "Place", name: "Belgium" }]);
    expect(ld.itemListElement[1].item.url).toBe("https://specollective.org/giee/research/#b");
  });
});

describe("sitemap", () => {
  const xml = buildSitemap();

  it("lists every public route once per locale, with hreflang alternates", () => {
    expect(xml).toContain("<loc>https://specollective.org/</loc>");
    expect(xml).toContain("<loc>https://specollective.org/fr/privacy/</loc>");
    expect(xml).toContain(
      'hreflang="x-default" href="https://specollective.org/privacy/"',
    );
  });

  it("leaves out sections that are not indexable yet, and gated pages", () => {
    expect(xml).not.toContain("/giee/");
    expect(xml).not.toContain("/glqf");
  });
});
