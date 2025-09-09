# Performance

Targets:
- LCP ≤ 2.5s, CLS ≤ 0.1, TBT ≤ 200ms (mobile)
- Initial route JS ≤ 180KB gz; vendor chunk ≤ 450KB uncompressed (to match Vite chunk warning)

Practices:
- Keep route-level code splitting; lazy-load heavy widgets
- Use skeletons and `<Suspense>` boundaries around lazy chunks
- Prefer per-component imports from shadcn/ui and Radix
- Memoize expensive components; avoid inline handlers in hot paths
- Optimize images (WebP/AVIF); provide width/height and responsive `srcset`
- Preload critical fonts; cache static assets immutably
 - Prefer CSS-based transitions over runtime animation libs for initial routes

Tooling:
- Bundle analyze with `npm run build:analyze` (rollup-plugin-visualizer gated by ANALYZE)
- Asset/deps/exports analysis: `npm run analyze`
- Budgets enforced via `scripts/ci-bundle-budget.mjs` in CI
 - Manual chunking tuned in `vite.config.ts` (router, markdown, highlight, query, icons, radix, vendor)
 - Deferred analytics (`<DeferredAnalytics />`) keeps initial route lighter
