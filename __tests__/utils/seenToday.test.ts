import {
  clearSeenToday,
  markSeenToday,
} from "../../utils/analytics/seenToday";

const KEY = "analytics-seen";

function setClock(iso: string) {
  jest.useFakeTimers().setSystemTime(new Date(iso));
}

describe("markSeenToday", () => {
  beforeEach(() => {
    window.localStorage.clear();
    setClock("2026-09-11T12:00:00Z");
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("reports a page once per visitor per day", () => {
    expect(markSeenToday("/giee", "en")).toBe(true);
    expect(markSeenToday("/giee", "en")).toBe(false);
    expect(markSeenToday("/giee", "en")).toBe(false);
  });

  it("treats each path and locale as its own counter row", () => {
    expect(markSeenToday("/giee", "en")).toBe(true);
    expect(markSeenToday("/giee/research", "en")).toBe(true);
    expect(markSeenToday("/giee", "fr")).toBe(true);
    expect(markSeenToday("/giee/research", "en")).toBe(false);
  });

  it("rolls over at midnight UTC and discards the previous day", () => {
    expect(markSeenToday("/giee", "en")).toBe(true);

    setClock("2026-09-12T00:00:01Z");
    expect(markSeenToday("/giee", "en")).toBe(true);

    const stored = JSON.parse(window.localStorage.getItem(KEY) ?? "{}");
    expect(stored.day).toBe("2026-09-12");
    expect(stored.keys).toEqual(["/giee|en"]);
  });

  it("uses UTC, not local time, to match the counter row", () => {
    // 23:30 UTC-negative-offset territory: still 2026-09-11 in UTC.
    setClock("2026-09-11T23:30:00Z");
    markSeenToday("/giee", "en");
    expect(JSON.parse(window.localStorage.getItem(KEY) ?? "{}").day).toBe(
      "2026-09-11"
    );
  });

  it("starts the day over when the stored entry is corrupt", () => {
    window.localStorage.setItem(KEY, "not json");
    expect(markSeenToday("/giee", "en")).toBe(true);
    expect(markSeenToday("/giee", "en")).toBe(false);
  });

  it("fails open rather than growing without bound", () => {
    for (let i = 0; i < 50; i += 1) {
      expect(markSeenToday(`/giee/page-${i}`, "en")).toBe(true);
    }
    // Over the cap: counts the view instead of suppressing it, and does not
    // record it either.
    expect(markSeenToday("/giee/page-51", "en")).toBe(true);
    expect(JSON.parse(window.localStorage.getItem(KEY) ?? "{}").keys).toHaveLength(
      50
    );
  });

  it("fails open when storage throws", () => {
    const setItem = jest
      .spyOn(Storage.prototype, "setItem")
      .mockImplementation(() => {
        throw new Error("quota exceeded");
      });

    expect(markSeenToday("/giee", "en")).toBe(true);
    expect(markSeenToday("/giee", "en")).toBe(true);

    setItem.mockRestore();
  });

  it("clears the record on consent withdrawal", () => {
    markSeenToday("/giee", "en");
    expect(markSeenToday("/giee", "en")).toBe(false);

    clearSeenToday();

    expect(window.localStorage.getItem(KEY)).toBeNull();
    expect(markSeenToday("/giee", "en")).toBe(true);
  });
});
