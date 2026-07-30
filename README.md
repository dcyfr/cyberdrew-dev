# cyberdrew.dev

Personal landing page for Drew. Positioned as a **security architect who builds
autonomous AI systems** — the differentiator is the guardrails, not the agents.

Built to the **PHOSPHOR** visual identity (`nexus/context/user/visual-identity.md`),
which designates cyberdrew.dev as the *full expression*: one black field, one bone
silhouette, one red sun, on a 60/30/10 ratio.

## Stack

- **Next.js 16** (App Router) · **React 19** · **TypeScript**
- No Tailwind — hand-tuned CSS in [`app/globals.css`](app/globals.css) driven by
  design tokens. Dark is the default; light applies via `prefers-color-scheme`
  and an explicit `data-theme` toggle.
- System font stacks only (display: grotesk · body: Iowan/Palatino serif ·
  mono: SF Mono) — no webfonts, so no loading cost and no layout shift.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run lint
```

If a second dev server is already running against this repo, give yours its own
build dir so the two don't race on the route manifest and serve phantom 404s:

```bash
NEXT_DIST_DIR=.next-preview npx next dev --port 4321
```

## Structure

```
app/
  layout.tsx           metadata, JSON-LD, pre-paint theme boot
  page.tsx             page composition
  globals.css          the whole design system (tokens + components)
  opengraph-image.tsx  share card, PHOSPHOR palette
components/
  Hero.tsx         split hero — text left, the one dramatic field right  (server)
  Ledger.tsx       full-bleed proof band                                 (server)
  Loop.tsx         sticky sequence: pinned dial + five scrolling states  (client)
  Envelope.tsx     the guardrails, as a log                              (server)
  Work.tsx         selected work                                         (server)
  Offer.tsx        work-with-me                                          (server)
  Writing.tsx      posts (canonical home is dcyfr.ai/blog)               (server)
  SiteFooter.tsx   sign-off, nav, elsewhere                              (server)
  ThemeToggle.tsx  light/dark, with the one-frame transition guard       (client)
  Reveal.tsx       scroll reveal via IntersectionObserver                (client)
lib/
  site.ts          ALL copy, links, figures — edit here
```

**All copy lives in [`lib/site.ts`](lib/site.ts).** Edit content there, not in
the components.

## Page structure

1. **Hero** — `Agents that act. Rails that hold.`
2. **Ledger** — four figures, full-bleed
3. **The loop** — the 30-minute cycle as a sticky sequence; each state names
   what stops it
4. **The envelope** — the six controls, as data rows
5. **Selected work** — @dcyfr/ai, the rails, the fleet, SharkVault
6. **Work with me** — fractional builds / safe-autonomy audits / advisory
7. **Writing** — four posts
8. **Footer**

## Design invariants (learned the hard way — don't regress these)

- The accent is a **ramp, not a value**. One vermilion cannot clear 4.5:1 against
  both the ground and the raised surfaces. Filled controls use `--accent-600`
  (white on `--accent-500` is 4.25:1 and fails).
- **Ordinals are text** — colour them with an ink token. `--line-2` is a border
  value and lands at ~1.8:1.
- A **stepped transition strands on the previous theme's value** across a swap.
  The toggle adds `.theme-swap` for one frame to suppress transitions.
- **Semantic colour stays separate from the accent.** Green means verified;
  vermilion is identity, never "success".
- Mono needs `font-variant-ligatures: none`, or `--accent` renders as `—accent`.

## Verification

Audited on the rendered page with a canvas-backed colour parser (`getComputedStyle`
returns `oklch()`, which an `rgb()` regex silently misreads):

- **0 WCAG AA failures** across 162 text nodes, in **both** themes
- **No horizontal scroll at 360px**
- Sticky sequence advances correctly; progress bar exposed via `role="progressbar"`

Re-run the audit against a running build before shipping visual changes.

## Before launch — confirm these

- [ ] **Handles**: `github.com/dcyfr` and `dev.to/dcyfr` carried over from the
      previous site — confirm they're right.
- [ ] **Figures** in `lib/site.ts` (30+ agents, $100/mo ceiling, 6-cycle breaker,
      3 restarts/hr) are drawn from the real daemon config. Confirm each is still
      accurate and that you want it public.
- [ ] **Fleet visibility** — decide how much daemon detail should be public.
- [ ] **Domain** — point `cyberdrew.dev` at the Vercel deployment.

## Deploy

Zero-config on **Vercel**. Set the production domain to `cyberdrew.dev`.
