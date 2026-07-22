# cyberdrew.dev

Personal landing page for Drew — an **agentic operator console**. Dark-first,
editorial serif + monospace, with a live `fleet.stream` telemetry heartbeat.
Positioned as an autonomy engineer at the agentic frontier, not a full-stack web dev.

Ported from design concept **"Iteration D"** (the final artifact pass).

## Stack

- **Next.js 16** (App Router) · **React 19** · **TypeScript**
- No Tailwind — the design is hand-tuned CSS in [`app/globals.css`](app/globals.css)
  driven by CSS custom properties (design tokens). Dark is the default; a
  complementary light theme applies via `prefers-color-scheme` (and the token
  set already supports a future `data-theme` toggle).
- System font stacks only (serif: Iowan/Palatino/Georgia · mono: SF Mono/JetBrains) —
  no webfonts, so no font-loading cost or layout shift.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run lint
```

## Structure

```
app/
  layout.tsx        metadata, theme-color, <html>/<body>, no-JS reveal fallback
  page.tsx          page composition
  globals.css       the entire design system (tokens + components)
components/
  AgentMesh.tsx     ambient canvas node-mesh          (client)
  Hud.tsx           sticky HUD nav + live clock        (client)
  Hero.tsx          boot line, decrypt reveal, instrument panel (client)
  FleetStream.tsx   live telemetry heartbeat           (client)
  Ornaments.tsx     fixed corner build/online chrome   (client)
  RevealController.tsx  scroll-reveal via IntersectionObserver (client)
  Sections.tsx      Statement / Work / Ventures / Writing / Now / Connect / Footer (server)
lib/
  content.ts        ALL copy, links, projects, telemetry — edit here
  hooks.ts          clock / uptime / reduced-motion hooks
```

**All copy and links live in [`lib/content.ts`](lib/content.ts).** Edit content there,
not in the components.

## Before launch — confirm these (currently inferred)

- [ ] **Handles**: `github.com/dcyfr` and `dev.to/dcyfr` are guessed — set the real ones in `lib/content.ts`.
- [ ] **fleet.stream telemetry** (`streamEvents`) + the `30+ agents` / `$100/mo` figures are **illustrative sample data** grounded in the real daemon architecture. Confirm the numbers, or wire the stream to a real feed — or keep as designed flavor.
- [ ] **Writing** post titles are placeholders — swap for real posts (or hide the section until there are some).
- [ ] **Fleet visibility** — decide how much of the autonomous-agent-fleet detail should be public.
- [ ] **Photo** — the hero leads with the status instrument, not a headshot. Add one if preferred (inline/optimized via `next/image`).
- [ ] **OG image** — add `app/opengraph-image.(png|tsx)` for social share previews (metadata is wired, image is not yet).
- [ ] **Domain** — point `cyberdrew.dev` at the Vercel deployment; `metadataBase` is already set to `https://cyberdrew.dev`.

## Deploy

Zero-config on **Vercel** (`vercel` / connect the repo). Set the production domain
to `cyberdrew.dev`.
