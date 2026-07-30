import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Alternate build dirs (NEXT_DIST_DIR) and local preview screenshots —
    // without these, linting the repo root reports thousands of generated-file
    // problems that drown the handful of real ones.
    ".next-*/**",
    ".preview/**",
  ]),
]);

export default eslintConfig;
