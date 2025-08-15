# AI Assistants (Copilot, Claude, etc.)

- Read `docs/codebase-map.md` and `docs/index.md` first.
- Follow `.github/copilot-instructions.md` for coding standards.
- Prefer small, scoped changes; keep public APIs stable.
- Update docs and budgets when changing bundles.
- Validate with: `npm run guard` then `npm run build && node scripts/ci-bundle-budget.mjs`.
- Avoid adding new heavy deps without prior discussion; prefer lazy-load.
