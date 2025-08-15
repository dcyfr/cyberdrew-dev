# Architecture

Tech stack: Vite + React + TypeScript + Tailwind + shadcn/ui, deployed on Vercel.

- Entry: `index.html` -> `src/main.tsx` -> `src/App.tsx`
- Routing: `react-router-dom` with code-split lazy routes via `src/components/LazyRoutes.tsx`
- UI: shadcn UI components in `src/components/ui/`; site components in `src/components/`
- Content: Markdown blog posts in `src/content/blog`; pages in `src/content/pages`
- State/data: local state + `@tanstack/react-query` where async needs arise
- Security: headers and helpers in `src/lib/security*.ts`, rate limiter in `src/lib/rate-limiter.ts`
- Performance helpers: `src/lib/performance.ts`
- Theming: `src/components/theme-provider.tsx` with `next-themes`

## Build
- Vite config in `vite.config.ts` with Terser minify, target `es2015`, and alias `@` -> `src/`
- Tailwind config in `tailwind.config.ts`, PostCSS in `postcss.config.*`

## Conventions
- TypeScript everywhere, strict types encouraged
- Components: small, focused; hooks for logic; utilities in `src/lib`
- Barrel exports encouraged for folders with many files
