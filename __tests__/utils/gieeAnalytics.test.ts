import {
  isGieeAnalyticsLocale,
  isGieeRoute,
  normalizeGieePath,
} from "../../utils/gieeAnalytics";

describe("GIEE analytics path validation", () => {
  it("accepts canonical GIEE paths and removes locale/trailing slash", () => {
    expect(normalizeGieePath("/giee/")).toBe("/giee");
    expect(normalizeGieePath("/fr/giee/research/")).toBe("/giee/research");
    expect(normalizeGieePath("/giee/future/child")).toBe("/giee/future/child");
  });

  it("rejects query strings, unsafe paths, and non-GIEE routes", () => {
    expect(normalizeGieePath("/giee?source=ad")).toBeNull();
    expect(normalizeGieePath("/giee//research")).toBeNull();
    expect(normalizeGieePath("/giee/../private")).toBeNull();
    expect(normalizeGieePath("/glqf")).toBeNull();
    expect(normalizeGieePath("/giee/%2Fresearch")).toBeNull();
  });

  it("only accepts enabled locales", () => {
    expect(isGieeAnalyticsLocale("en")).toBe(true);
    expect(isGieeAnalyticsLocale("fr")).toBe(true);
    expect(isGieeAnalyticsLocale("es")).toBe(false);
  });

  it("recognizes only GIEE route prefixes", () => {
    expect(isGieeRoute("/giee")).toBe(true);
    expect(isGieeRoute("/giee/research")).toBe(true);
    expect(isGieeRoute("/giee-old")).toBe(false);
  });
});
