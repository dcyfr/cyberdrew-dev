# Architecture

Tech stack: Vite + React + TypeScript + Tailwind + shadcn/ui, deployed on Vercel.

- Entry: `index.html` → `src/main.tsx` → `src/App.tsx`
- Routing: `react-router-dom` with route-level code splitting in `src/components/LazyRoutes.tsx`
- Transitions: CSS-based via `src/components/PageTransition.tsx` and `tailwindcss-animate` (framer-motion removed from initial routes)
- UI: shadcn UI components in `src/components/ui/`; site components in `src/components/`
- Content: Markdown blog posts in `src/content/blog`; pages in `src/content/pages`
- Blog rendering: `src/lib/blog.ts` handles post discovery and metadata; `src/lib/blog-render.ts` renders Markdown with `markdown-it` and minimal `highlight.js/lib/core` + lazy CSS theme
- State/data: local state + `@tanstack/react-query` where async needs arise
- Security: headers/meta in `src/lib/security-headers.ts`, helpers in `src/lib/security.ts`, rate limiter outline in `src/lib/rate-limiter.ts`
- Performance helpers: `src/lib/performance.ts`
- Theming: `src/components/theme-provider.tsx` with `next-themes`
- Analytics: `src/components/DeferredAnalytics.tsx` mounts after initial paint

## Build
- Vite config in `vite.config.ts` with Terser minify, target `es2015`, alias `@` → `src/`
- Manual chunk strategy for vendor segmentation: router, markdown, highlight, query, icons, radix, plus catch-all vendor
- Visualizer available when `ANALYZE=true` via `npm run build:analyze` (outputs `dist/stats.html`)
- Tailwind config in `tailwind.config.ts`; PostCSS in `postcss.config.js`

## Conventions
- TypeScript everywhere; strict types preferred; avoid `any`
- Components: small, focused; hooks for logic; utilities in `src/lib`
- Prefer per-component imports from shadcn and Radix; keep initial route budget lean
- Update docs alongside behavioral changes; validate budgets with CI script
