import { createMocks } from "node-mocks-http";
import handler from "../../../pages/api/page-views";
import { recordPageView } from "../../../service/analyticsStore";
import { CONSENT_COOKIE } from "../../../utils/analytics/consent";

jest.mock("../../../service/analyticsStore", () => ({
  recordPageView: jest.fn(),
}));

const recordMock = recordPageView as jest.MockedFunction<typeof recordPageView>;
const granted = { "content-type": "application/json", cookie: `${CONSENT_COOKIE}=granted` };

describe("/api/page-views", () => {
  beforeEach(() => {
    recordMock.mockReset();
  });

  it("records a valid consented event with its section and returns 204", async () => {
    const { req, res } = createMocks({
      method: "POST",
      headers: granted,
      body: { path: "/giee/research", locale: "en" },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(204);
    expect(recordMock).toHaveBeenCalledWith("giee", "/giee/research", "en");
  });

  it.each([
    { method: "GET", body: { path: "/giee", locale: "en" } },
    { method: "POST", body: { path: "/glqf", locale: "en" } },
    { method: "POST", body: { path: "/", locale: "en" } },
    { method: "POST", body: { path: "/giee", locale: "es" } },
    { method: "POST", body: { path: "/giee", locale: "en", extra: true } },
  ] as const)("does not record invalid event %#", async ({ method, body }) => {
    const { req, res } = createMocks({ method, headers: granted, body });

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

    const denied = createMocks({
      method: "POST",
      headers: { "content-type": "application/json", cookie: `${CONSENT_COOKIE}=denied` },
      body: { path: "/giee", locale: "en" },
    });
    await handler(denied.req, denied.res);

    const wrongType = createMocks({
      method: "POST",
      headers: { ...granted, "content-type": "text/plain" },
      body: { path: "/giee", locale: "en" },
    });
    await handler(wrongType.req, wrongType.res);

    expect(recordMock).not.toHaveBeenCalled();
  });

  it("hides storage failures behind 204 but logs the fault", async () => {
    const logged = jest.spyOn(console, "error").mockImplementation(() => undefined);
    recordMock.mockRejectedValueOnce(Object.assign(new Error("relation does not exist"), { code: "42P01" }));
    const { req, res } = createMocks({
      method: "POST",
      headers: granted,
      body: { path: "/giee/research", locale: "en" },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(204);
    expect(logged).toHaveBeenCalledWith("Analytics storage failed (postgres 42P01)");

    // The log must never carry the request: no path, locale, or error detail.
    const line = logged.mock.calls[0].join(" ");
    expect(line).not.toContain("/giee");
    expect(line).not.toContain("relation does not exist");

    logged.mockRestore();
  });

  it("names the fault when it has no postgres code, e.g. misconfiguration", async () => {
    const logged = jest.spyOn(console, "error").mockImplementation(() => undefined);
    recordMock.mockRejectedValueOnce(new Error("connection refused"));
    const { req, res } = createMocks({
      method: "POST",
      headers: granted,
      body: { path: "/giee", locale: "en" },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(204);
    expect(logged).toHaveBeenCalledWith("Analytics storage failed: connection refused");
    logged.mockRestore();
  });
});
