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

const nextConfig: NextConfig = {
  // Pin the workspace root so Next doesn't mis-infer it from a sibling
  // lockfile while this repo lives inside the ~/Code workspace tree.
  turbopack: {
    root: path.resolve(__dirname),
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
