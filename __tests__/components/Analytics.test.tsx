import { fireEvent, render, screen } from "@testing-library/react";
import Analytics from "../../components/Analytics";
import { CONSENT_COOKIE } from "../../utils/analytics/consent";
import { TRACKED_SECTIONS } from "../../utils/analytics/sections";

const routerEvents = { on: jest.fn(), off: jest.fn() };

jest.mock("next/router", () => ({
  useRouter: () => ({
    pathname: "/giee",
    asPath: "/giee/",
    route: "/giee",
    query: {},
    locale: "en",
    locales: ["en", "fr"],
    defaultLocale: "en",
    events: routerEvents,
  }),
}));

const section = TRACKED_SECTIONS[0];
const sendBeacon = jest.fn(() => true);

function grantConsent() {
  document.cookie = `${CONSENT_COOKIE}=granted`;
}

/** A fresh mount with storage intact is what a reload looks like to this component. */
function reload() {
  return render(<Analytics section={section} />);
}

describe("<Analytics />", () => {
  beforeAll(() => {
    Object.defineProperty(window.navigator, "sendBeacon", {
      value: sendBeacon,
      configurable: true,
    });
  });

  beforeEach(() => {
    jest.clearAllMocks();
    window.localStorage.clear();
    document.cookie = `${CONSENT_COOKIE}=; Max-Age=0`;
    jest.useFakeTimers().setSystemTime(new Date("2026-09-11T12:00:00Z"));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("sends nothing before consent is granted", () => {
    reload();
    expect(sendBeacon).not.toHaveBeenCalled();
  });

  it("reports the page once, then stays silent across reloads", () => {
    grantConsent();

    const first = reload();
    expect(sendBeacon).toHaveBeenCalledTimes(1);
    expect(sendBeacon).toHaveBeenCalledWith("/api/page-views/", expect.any(Blob));
    first.unmount();

    reload().unmount();
    reload();

    expect(sendBeacon).toHaveBeenCalledTimes(1);
  });

  it("reports the same page again on the next UTC day", () => {
    grantConsent();

    reload().unmount();
    expect(sendBeacon).toHaveBeenCalledTimes(1);

    jest.setSystemTime(new Date("2026-09-12T00:00:01Z"));
    reload();

    expect(sendBeacon).toHaveBeenCalledTimes(2);
  });

  it("stops reporting and clears the daily record when consent is withdrawn", () => {
    grantConsent();

    const view = reload();
    expect(sendBeacon).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByText("analytics.change"));
    fireEvent.click(screen.getByText("analytics.reject"));
    view.unmount();

    expect(window.localStorage.getItem("analytics-seen")).toBeNull();

    reload();
    expect(sendBeacon).toHaveBeenCalledTimes(1);
  });
});
