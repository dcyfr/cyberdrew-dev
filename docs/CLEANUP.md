# Workspace Cleanup

Removed/De-duplicated:
- postcss.config.mjs (use postcss.config.js only)
- vite-security.config.ts (unused)

Docs updated:
- README.md, SECURITY.md, CONTRIBUTING.md
- docs/index.md, docs/README.md, docs/performance.md
- docs/agents.md, docs/ai-assistants.md

Notes:
- Budgets enforced by `scripts/ci-bundle-budget.mjs`
- Analyze with `npm run build:analyze` and `npm run analyze`
