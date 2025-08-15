import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import * as tseslint from "@typescript-eslint/eslint-plugin";
import * as tsParser from "@typescript-eslint/parser";
import security from "eslint-plugin-security";
import noUnsanitized from "eslint-plugin-no-unsanitized";
import jsxA11y from "eslint-plugin-jsx-a11y";

export default [
  // Load base JS recommended config first so our overrides below take precedence
  js.configs.recommended,
  {
    ignores: ["dist"],
  },
  // Node scripts configuration
  {
    files: ["scripts/**/*.{js,mjs,cjs}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.node,
      sourceType: "module",
    },
    rules: {
      // Allow console usage in scripts
      "no-console": "off",
    },
  },
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parser: tsParser,
      parserOptions: {
        sourceType: "module",
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      security,
  "no-unsanitized": noUnsanitized,
  "jsx-a11y": jsxA11y,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
  ...jsxA11y.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      // TypeScript handles these better; avoid duplicate noise
      "no-undef": "off",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",
      // Security-focused linting
      "security/detect-eval-with-expression": "error",
      "security/detect-new-buffer": "error",
      "security/detect-child-process": "error",
      "security/detect-unsafe-regex": "warn",
      // Can be noisy with safe object usage in React; keep off unless needed
      "security/detect-object-injection": "off",
      // Catch unsanitized DOM sinks
      "no-unsanitized/method": "error",
      "no-unsanitized/property": "error",
      // Incremental a11y adoption: warn before enforcing
      "jsx-a11y/click-events-have-key-events": "warn",
      "jsx-a11y/no-static-element-interactions": "warn",
      "jsx-a11y/heading-has-content": "warn",
      "jsx-a11y/anchor-has-content": "warn",
    },
  },
];
