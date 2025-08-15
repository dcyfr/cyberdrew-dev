# Contributing

## Setup
- Node 18+
- npm install

## Scripts
- dev: start vite dev server
- build: production build
- lint: eslint (with a11y, security plugins)
- typecheck: TypeScript check
- guard: typecheck + lint + build
- analyze: assets, deps, dead exports
 - budgets: `npm run build && node scripts/ci-bundle-budget.mjs`

## Workflow
- Create a feature branch
- Run `npm run guard` and fix any issues
- Verify budgets pass (`npm run build && node scripts/ci-bundle-budget.mjs`)
- Ensure docs are updated when behavior changes
- Open a small, focused PR with a clear description

## Code style
- Follow `.github/copilot-instructions.md` standards
- Use TypeScript, strong typing, JSDoc where helpful
- Small components and functions; hooks for logic; utilities in `src/lib`
