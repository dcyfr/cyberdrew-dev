import path from "node:path";
import type { NextConfig } from "next";

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
};

export default nextConfig;
