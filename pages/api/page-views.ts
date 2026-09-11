import type { NextApiRequest, NextApiResponse } from "next";
import { recordPageView } from "../../service/analyticsStore";
import { hasGrantedConsent } from "../../utils/analytics/consent";
import { normalizeAnalyticsPath } from "../../utils/analytics/path";
import { isAnalyticsLocale } from "../../utils/analytics/sections";

export const config = {
  api: {
    bodyParser: { sizeLimit: "256b" },
  },
};

const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 1_000;
let windowStartedAt = 0;
let windowRequests = 0;

function withinRateLimit(): boolean {
  const now = Date.now();
  if (now - windowStartedAt >= WINDOW_MS) {
    windowStartedAt = now;
    windowRequests = 0;
  }
  windowRequests += 1;
  return windowRequests <= MAX_REQUESTS_PER_WINDOW;
}

function hasAllowedOrigin(req: NextApiRequest): boolean {
  const origin = req.headers.origin;
  if (!origin) return true;
  if (origin === "null") return false;

  const forwardedHost = req.headers["x-forwarded-host"] ?? req.headers.host;
  const forwardedProto = req.headers["x-forwarded-proto"] ?? "https";
  const host = Array.isArray(forwardedHost) ? forwardedHost[0] : forwardedHost;
  const proto = Array.isArray(forwardedProto) ? forwardedProto[0] : forwardedProto;
  return Boolean(host && origin === `${proto}://${host}`);
}

function validBody(body: unknown): body is { path: string; locale: string } {
  if (!body || typeof body !== "object" || Array.isArray(body)) return false;
  const keys = Object.keys(body);
  if (keys.length !== 2 || !keys.includes("path") || !keys.includes("locale")) {
    return false;
  }
  const value = body as Record<string, unknown>;
  return typeof value.path === "string" && typeof value.locale === "string";
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST" || !withinRateLimit() || !hasAllowedOrigin(req)) {
    return res.status(204).end();
  }
  if (!req.headers["content-type"]?.toLowerCase().startsWith("application/json")) {
    return res.status(204).end();
  }
  if (!hasGrantedConsent(req.headers.cookie) || !validBody(req.body)) {
    return res.status(204).end();
  }

  const canonical = normalizeAnalyticsPath(req.body.path);
  if (!canonical || !isAnalyticsLocale(req.body.locale)) {
    return res.status(204).end();
  }

  try {
    await recordPageView(canonical.section.slug, canonical.path, req.body.locale);
  } catch (error) {
    // Failures stay invisible to visitors, but a silently broken database is
    // indistinguishable from no traffic. Log the PostgreSQL error code only:
    // it identifies the fault (42P01 is a missing table) while carrying none
    // of the request. The message and detail fields are deliberately not
    // logged, because a constraint violation puts the row's values in them.
    const code = (error as { code?: unknown } | null)?.code;
    console.error(
      `Analytics storage failed${typeof code === "string" ? ` (postgres ${code})` : ""}`
    );
  }
  return res.status(204).end();
}
