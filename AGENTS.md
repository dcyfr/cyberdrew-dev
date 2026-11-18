<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# AGENTS.md

`cyberdrew.dev` is Drew's personal landing page: a single-page Next.js site (plus a privacy page) that presents him as a cyber architect who builds autonomous systems. It is deployed on Vercel from `main` and served at `www.cyberdrew.dev`. `CLAUDE.md` only imports this file.

## Stack

- Next.js 16.4.1 (App Router, Turbopack), React 19.2.4, TypeScript 5, ESLint 9 with `eslint-config-next`. No Tailwind; all styling is hand-written CSS in `app/globals.css`.
- Runtime extras: `@vercel/analytics` and `@vercel/speed-insights`. One self-hosted font (Archivo, `app/fonts/`) through `next/font/local`.
- Node 24 is what CI uses. `package.json` sets no `engines`. Private package, MIT code licence; written content, the photo and the names are all rights reserved (README, "License").

## Layout

```
app/                    layout.tsx, page.tsx, globals.css, privacy/page.tsx, llms.txt/route.ts (generated),
                        opengraph-image.tsx, icon.tsx, not-found.tsx, robots.ts, sitemap.ts, fonts/, og/
components/             one file per page section and widget; hero/ holds HeroStatement.tsx and parts.tsx
lib/site.ts             ALL copy and links; components only render it
lib/feed.ts             reads the dcyfr.ai blog feed at build, falls back to a snapshot in lib/site.ts
lib/mark.ts             the one definition of the star mark
scripts/                a11y-contrast.mjs, design-intent.mjs (Playwright audits)
public/img/             images
.github/workflows/visual-gates.yml
```

The full file-by-file map is in `README.md`, "Structure". Read the Next.js guide in `node_modules/next/dist/docs/` before changing routing or metadata (the block at the top of this file).

## Commands

| Command | What it does |
|---|---|
| `npm ci` | Install exactly from the lockfile. Use `--ignore-scripts` as CI does. |
| `npm run dev` | Dev server on port 3000. On the author's Mac `WATCHPACK_POLLING=true npm run dev` is needed (README, "Develop"). |
| `npm run lint` | `eslint`. Passes on `main` as of 2026-11-17. |
| `npx tsc --noEmit` | Type check. Needs `next-env.d.ts` and the route types, so run it after a build; before one it reports `Cannot find module '@/public/img/drew.webp'`. Passes after a build. |
| `npm run build` | `next build`. See the warning below. |
| `npm run start` | Serve the production build. |
| `npm run audit:contrast`, `npm run audit:intent` | Browser audits of a running site (`AUDIT_URL`, default `http://localhost:3000/`). Need Playwright, which is not a dependency: CI installs `playwright@1.61.1` with `--no-save`, then `playwright install --with-deps chromium`. |
| `NEXT_DIST_DIR=.next-preview npx next dev --port 4321` | A second dev server with its own build directory. |

**`npm run build` currently exits 1 on `main`.** On 2026-11-17 it compiled, type-checked and prerendered all 9 pages, then stopped with `SecurityFatalError: Your version of Next.js is affected by a known security vulnerability` for `next` 16.4.1. An open Dependabot pull request bumps `next` to 16.4.6. Do not document the build as passing until it does.

There is no unit-test suite.

## CI and checks

- `.github/workflows/visual-gates.yml` (name `visual gates`, job `gates`) runs on pull requests touching `app/**`, `components/**`, `lib/**`, the two audit scripts or the workflow, and on manual dispatch. It runs `npm ci --no-audit --no-fund --ignore-scripts`, installs Playwright, runs `npm run build`, starts `next start -p 3000`, then runs `audit:contrast` and `audit:intent`. Because the build step fails today, expect this check to fail on any PR that triggers it until `next` is bumped.
- `main` has no branch protection. Vercel builds and deploys from `main`.

## Invariants (full reasoning is in `README.md`, "Invariants")

- `llms.txt` is generated from `lib/site.ts` by `app/llms.txt/route.ts`. Never add `public/llms.txt`; it would shadow the route.
- Copy and links belong in `lib/site.ts`, not in components. `lib/mark.ts` is the only definition of the star.
- Two materials only, obsidian and bone, no hue. Emphasis is inversion, weight and space.
- Never hand-write `-webkit-backdrop-filter`; declare `backdrop-filter` only (the CSS build adds prefixes).
- `package-lock.json` must be regenerated on Linux (the workflow header gives the Docker command). A macOS-generated lockfile prunes platform-specific optional entries and breaks the Vercel install. Tripwire: `grep -c @emnapi package-lock.json` should print 19.
- The site shows no prices. `lib/site.ts` says paid work is not open; do not add prices, rates or "taking engagements" copy.
- The `README.md` voice is first person, conclusion first. Keep it that way when you edit it.

## Never

- Commit `.env*`, tokens, or the contents of `.vercel/`.
- Hand-edit `llms.txt` output, or `next-env.d.ts` (gitignored, generated).
- Add Tailwind, a second font, or a colour with a hue to the theme.
- Run `next upgrade` or bump `next` inside an unrelated change; the Dependabot pull request owns that.
- Push to `main`.
