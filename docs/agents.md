# Agents Guide

For GitHub Copilot, Claude, and similar agentic tools.

- Read `docs/codebase-map.md` first
- Follow project coding standards in `.github/copilot-instructions.md`
- Use TypeScript and strong typing; avoid `any`
- Add JSDoc to non-trivial functions and all public utilities
- Write/update tests when changing public behavior
- Run `npm run guard` locally before opening a PR
- Prefer small, focused PRs with clear descriptions
 - Keep bundles under budgets; see `scripts/ci-bundle-budget.mjs`
 - Also see `docs/ai-assistants.md`

Context hierarchy for assistants:
1) This docs folder (`/docs`) starting with `index.md` and `codebase-map.md`
2) Project configs (`vite.config.ts`, `tailwind.config.ts`, `eslint.config.js`)
3) Scripts under `/scripts` for budgets and analysis
4) Source files referenced by the docs

