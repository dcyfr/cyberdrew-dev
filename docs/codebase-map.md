# Codebase Map

High-signal pointers for humans and AI agents.

- Entry: `index.html`, `src/main.tsx`, `src/App.tsx`
- Routing: `src/components/LazyRoutes.tsx`
- Layout: `src/components/PageLayout.tsx`, `src/components/AppHeader.tsx`
- Blog: `src/pages/BlogPost.tsx`, components under `src/components/` (Blog*)
- UI kit: `src/components/ui/*` (shadcn)
- Theming: `src/components/theme-provider.tsx`, `src/components/theme-toggle.tsx`
- SEO: `src/components/SEOHead.tsx`
- Security: `src/lib/security*.ts`, `src/components/SecureLink.tsx`
- Performance utils: `src/lib/performance.ts`
- Constants & navigation: `src/lib/sidebar-constants.ts`
- Hooks: `src/hooks/*`
- Assets: `public/*`, `src/assets/*`

Scripts:
- Analyze assets: `npm run analyze:assets`
- Unused deps: `npm run analyze:deps`
- Dead exports: `npm run analyze:exports`
