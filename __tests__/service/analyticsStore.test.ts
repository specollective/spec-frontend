const mockOnConflictDoUpdate = jest.fn().mockResolvedValue(undefined);
const mockValues = jest.fn(() => ({ onConflictDoUpdate: mockOnConflictDoUpdate }));
const mockInsert = jest.fn(() => ({ values: mockValues }));
const mockWhere = jest.fn().mockResolvedValue(undefined);
const mockDelete = jest.fn(() => ({ where: mockWhere }));

jest.mock("../../db/client", () => ({
  getDb: () => ({ insert: mockInsert, delete: mockDelete }),
}));

async function loadStore() {
  let store: typeof import("../../service/analyticsStore");
  await jest.isolateModulesAsync(async () => {
    store = await import("../../service/analyticsStore");
  });
  return store!;
}

describe("recordPageView", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockOnConflictDoUpdate.mockResolvedValue(undefined);
    mockWhere.mockResolvedValue(undefined);
  });

  it("upserts the visitor counter for the given section", async () => {
    const { recordPageView } = await loadStore();

    await recordPageView("giee", "/giee/research", "en");

    expect(mockValues).toHaveBeenCalledWith(
      expect.objectContaining({
        section: "giee",
        path: "/giee/research",
        locale: "en",
        visitors: 1,
      })
    );
    expect(mockOnConflictDoUpdate).toHaveBeenCalledTimes(1);
  });

  it("prunes expired counters once per UTC day rather than per recorded visit", async () => {
    const { recordPageView } = await loadStore();

    await recordPageView("giee", "/giee", "en");
    await recordPageView("giee", "/giee", "en");
    await recordPageView("giee", "/giee/research", "fr");

    expect(mockOnConflictDoUpdate).toHaveBeenCalledTimes(3);
    expect(mockDelete).toHaveBeenCalledTimes(1);
  });

  it("retries pruning after a failed sweep without failing the recorded visit", async () => {
    const { recordPageView } = await loadStore();
    mockWhere.mockRejectedValueOnce(new Error("database unavailable"));

    await expect(recordPageView("giee", "/giee", "en")).resolves.toBeUndefined();
    await recordPageView("giee", "/giee", "en");

    expect(mockDelete).toHaveBeenCalledTimes(2);
  });

  it("propagates upsert failures so the endpoint can swallow them", async () => {
    const { recordPageView } = await loadStore();
    mockOnConflictDoUpdate.mockRejectedValueOnce(new Error("database unavailable"));

    await expect(recordPageView("giee", "/giee", "en")).rejects.toThrow(
      "database unavailable"
    );
  });
});
