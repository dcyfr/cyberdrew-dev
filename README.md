# cyberdrew.dev

A modern, accessible, and secure blog and UI component platform built with React, TypeScript, Vite, Tailwind CSS, and shadcn-ui.

## Features

- **Blog Platform**: Write, organize, and display blog posts with Markdown support and advanced content blocks.
- **UI Component Library**: 40+ reusable, accessible, and themeable UI components (see `src/components/ui/`).
- **Performance Optimized**: Fast load times, code splitting, lazy loading, and bundle optimizations.
- **Security First**: Strong security headers, rate limiting, and input validation (see `src/lib/security.ts`).
- **Accessibility**: WCAG-compliant components, semantic HTML, keyboard navigation, and ARIA support.
- **Custom Hooks**: Utilities for mobile detection, toasts, and more (`src/hooks/`).
- **Theming**: Light/dark mode toggle and theme provider.
- **SEO Ready**: SEO meta tags and Open Graph support.
- **Bundle Budgets**: CI guardrails enforce chunk size budgets.
- **Developer Experience**: TypeScript strictness, ESLint, Prettier, and fast refresh.
- **Deployment Ready**: Vercel configuration and easy custom domain setup.

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm

### Installation

```sh
git clone https://github.com/dcyfr/cyberdrew-dev.git
cd cyberdrew-dev
npm install
```

### Development

```sh
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the app.

Useful scripts:

- Guard (typecheck + lint + build): `npm run guard`
- Analyze (assets, deps, dead exports): `npm run analyze`

See full docs in `docs/index.md`.

### Build for Production

```sh
npm run build
```

### Linting & Formatting

```sh
npm run lint
```

## Project Structure

- `src/components/` — React components (UI, layout, blog, etc.)
- `src/content/` — Blog posts and content pages
- `src/hooks/` — Custom React hooks
- `src/lib/` — Utilities, security, performance, and constants
- `public/` — Static assets
- `docs/` — Documentation and guides

## Accessibility

- All UI components follow WCAG guidelines
- Semantic HTML and ARIA attributes
- Keyboard navigation support
- Color contrast and screen reader tested

## Security

- Input validation and sanitization
- Secure headers and rate limiting
- No secrets or sensitive data in client code

## Tooling & Budgets

- ESLint, TypeScript strict, and bundle analyzer. Budgets enforced by `scripts/ci-bundle-budget.mjs`.
- Analyze helpers: `npm run analyze` (assets, deps, dead exports).

## Deployment

- Deploy to [Vercel](https://vercel.com/) or any static hosting provider
- Custom domain support via Vercel or your host

