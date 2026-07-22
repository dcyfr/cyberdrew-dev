import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root so Next doesn't mis-infer it from a sibling
  // lockfile while this repo lives inside the ~/Code workspace tree.
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
