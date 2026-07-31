import { execFileSync } from "node:child_process";
import path from "node:path";
import type { NextConfig } from "next";

/**
 * Short commit for the footer build stamp, resolved once at build time.
 * Vercel exposes the SHA as an env var; locally we ask git. Either may be
 * absent (a tarball build, a shallow checkout without git), so this is
 * allowed to come back empty and the footer just omits the hash.
 */
function commitSha(): string {
  const fromEnv = process.env.VERCEL_GIT_COMMIT_SHA || process.env.GITHUB_SHA;
  if (fromEnv) return fromEnv.slice(0, 7);
  try {
    return execFileSync("git", ["rev-parse", "--short=7", "HEAD"], {
      stdio: ["ignore", "pipe", "ignore"],
    })
      .toString()
      .trim();
  } catch {
    return "";
  }
}

/**
 * Content-Security-Policy.
 *
 * Deliberately NOT nonce-based. A nonce has to be minted per request, which
 * means middleware, which means the page stops being statically prerendered —
 * we would trade a 125ms cached TTFB for a dynamic render on every hit. On a
 * static marketing page with no user input and no third-party scripts, that
 * is a bad bargain.
 *
 * So script-src/style-src keep 'unsafe-inline' (Next emits inline bootstrap
 * scripts and inlines CSS), and the directives that actually carry weight here
 * are the ones unaffected by it: frame-ancestors, base-uri, form-action,
 * object-src. Those block clickjacking, base-tag hijacking, and form
 * exfiltration regardless.
 *
 * Everything is same-origin by design — fonts are self-hosted via
 * next/font/local, the OG image is generated at /opengraph-image, and Vercel
 * Analytics + Speed Insights are proxied under /_vercel/* — so 'self' covers
 * the whole page and no third-party host needs allow-listing.
 */
const isDev = process.env.NODE_ENV === "development";

/**
 * In production @vercel/analytics and @vercel/speed-insights load their
 * scripts from /_vercel/* on this origin, so 'self' covers them. In dev they
 * swap to a debug bundle on va.vercel-scripts.com — an external host that
 * 'self' would block, which shows up as a silent CSP violation and a dead
 * analytics component. Allow that one host, dev only; production stays
 * strictly first-party. Next also needs eval for HMR in dev.
 */
const devScriptSrc = isDev
  ? " 'unsafe-eval' https://va.vercel-scripts.com"
  : "";
const devConnectSrc = isDev ? " https://va.vercel-scripts.com" : "";

const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${devScriptSrc}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  // Analytics beacons post to /_vercel/insights/* on this origin.
  `connect-src 'self'${devConnectSrc}`,
  "form-action 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Superseded by frame-ancestors above, kept for browsers that predate it.
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // No page on this site uses any of these; deny rather than leave them open.
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  // Vercel already sends HSTS, but pin it here so the policy lives in-repo
  // rather than depending on a platform default.
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  // Pin the workspace root so Next doesn't mis-infer it from a sibling
  // lockfile while this repo lives inside the ~/Code workspace tree.
  turbopack: {
    root: path.resolve(__dirname),
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  // Two dev servers sharing one .next race on the route manifest and serve
  // intermittent 404s for routes that exist. Set NEXT_DIST_DIR to give a
  // concurrent preview server its own build dir. Defaults to normal .next.
  distDir: process.env.NEXT_DIST_DIR || ".next",
  env: {
    NEXT_PUBLIC_COMMIT: commitSha(),
    NEXT_PUBLIC_BUILT_AT: new Date().toISOString().slice(0, 10),
  },
};

export default nextConfig;
