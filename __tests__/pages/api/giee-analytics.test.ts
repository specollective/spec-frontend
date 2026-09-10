import { createMocks } from "node-mocks-http";
import handler from "../../../pages/api/giee-analytics";
import { recordGieePageView } from "../../../service/gieeAnalyticsStore";

jest.mock("../../../service/gieeAnalyticsStore", () => ({
  recordGieePageView: jest.fn(),
}));

const recordMock = recordGieePageView as jest.MockedFunction<
  typeof recordGieePageView
>;

describe("/api/giee-analytics", () => {
  beforeEach(() => {
    recordMock.mockReset();
  });

  it("records a valid consented event and returns 204", async () => {
    const { req, res } = createMocks({
      method: "POST",
      headers: {
        "content-type": "application/json",
        cookie: "giee-analytics=granted",
      },
      body: { path: "/giee/research", locale: "en" },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(204);
    expect(recordMock).toHaveBeenCalledWith("/giee/research", "en");
  });

  it.each([
    { method: "GET", body: { path: "/giee", locale: "en" } },
    { method: "POST", body: { path: "/glqf", locale: "en" } },
    { method: "POST", body: { path: "/giee", locale: "es" } },
    { method: "POST", body: { path: "/giee", locale: "en", extra: true } },
  ] as const)("does not record invalid event %#", async ({ method, body }) => {
    const { req, res } = createMocks({
      method,
      headers: {
        "content-type": "application/json",
        cookie: "giee-analytics=granted",
      },
      body,
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(204);
    expect(recordMock).not.toHaveBeenCalled();
  });

  it("does not record without consent or with a non-JSON content type", async () => {
    const noConsent = createMocks({
      method: "POST",
      headers: { "content-type": "application/json" },
      body: { path: "/giee", locale: "en" },
    });
    await handler(noConsent.req, noConsent.res);

    const wrongType = createMocks({
      method: "POST",
      headers: {
        "content-type": "text/plain",
        cookie: "giee-analytics=granted",
      },
      body: { path: "/giee", locale: "en" },
    });
    await handler(wrongType.req, wrongType.res);

    expect(recordMock).not.toHaveBeenCalled();
  });

  it("hides storage failures behind 204", async () => {
    recordMock.mockRejectedValueOnce(new Error("database unavailable"));
    const { req, res } = createMocks({
      method: "POST",
      headers: {
        "content-type": "application/json",
        cookie: "giee-analytics=granted",
      },
      body: { path: "/giee", locale: "en" },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(204);
  });
});
