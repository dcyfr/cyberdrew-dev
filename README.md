# cyberdrew.dev

Personal landing page for Drew. Positioned as a **security architect who builds
autonomous AI systems** — the differentiator is the guardrails, not the agents.

## The theme: obsidian / bone

Two materials. No third colour and no hue anywhere.

```
--obsidian  #0b0b0d
--bone      #dcdad5
```

The consequence is the whole design idea: **`--accent` is not a colour, it is
whichever material is not the ground.** Obsidian ground → bone accent; bone
ground → obsidian accent. So emphasis cannot be signalled by hue — it is
signalled by **inversion**, weight, rule, and space. A "filled" element swaps
ground and ink (`--accent` / `--on-accent`).

Two consequences worth keeping:

- **The contact block is the only full inversion on the page.** It is the
  strongest move the system has, so it is spent exactly once, on the conversion.
- **State can't lean on hue**, so it never does: status markers are a filled
  identity star plus a word. That is automatically colour-blind- and greyscale-safe.

Materials are not dead grey — bone carries a warm cast (R>G>B), obsidian a cool
one (B>R). That residual temperature is what keeps two neutrals reading as two
materials instead of two greys.

Type is one engineered grotesk for display and running text (weight separates
the two), with mono strictly for labels and data. The former old-style serif
body is parked in a comment in globals.css if the humanist voice comes back.

## Stack

- **Next.js 16** (App Router) · **React 19** · **TypeScript**
- No Tailwind here — hand-tuned CSS in [`app/globals.css`](app/globals.css)
  driven by tokens. Dark is default; light via `prefers-color-scheme` and an
  explicit `data-theme` toggle.
- System font stacks only — no webfonts, no loading cost, no layout shift.

## Develop

```bash
npm install
WATCHPACK_POLLING=true npm run dev   # http://localhost:3000
npm run build
npm run lint
```

**`WATCHPACK_POLLING=true` is required on this machine.** Without it Turbopack's
watcher dies with `EMFILE: too many open files`, finds no routes, and serves a
404 for `/` — which reads exactly like a missing-page bug rather than a watcher
failure. Raising `ulimit -n` does not help.

To run a second server against this repo, give it its own build dir so the two
don't race on the route manifest:

```bash
NEXT_DIST_DIR=.next-preview npx next dev --port 4321
```

## Structure

```
app/
  layout.tsx           metadata, JSON-LD, pre-paint theme boot
  page.tsx             page composition
  globals.css          the whole design system
  opengraph-image.tsx  share card
components/
  Header.tsx       sticky nav; cycling wordmark, four-pointed-star mark
  Hero.tsx         statement, deck, actions, roles
  Work.tsx         four hairline rows
  Writing.tsx      four hairline rows, tighter
  Contact.tsx      the single inverted block
  SiteFooter.tsx   sign-off + elsewhere
  ThemeToggle.tsx  light/dark, with the one-frame transition guard
  Reveal.tsx       scroll reveal
lib/
  site.ts          ALL copy and links — edit here
```

Sections: **header · hero · work · writing · contact · footer**. The earlier
loop / envelope / ledger sections are recoverable from git at `59f959e`.

## Invariants (learned the hard way — don't regress these)

- **`.wide` needs `width: 100%`.** As a grid or flex item, `margin-inline: auto`
  suppresses stretch and the rail collapses to max-content — which silently
  mis-aligned the hero against every other section by 227px.
- A **stepped transition strands on the previous theme's value** across a swap.
  The toggle adds `.theme-swap` for one frame to suppress transitions. Any
  contrast audit must do the same or it measures mid-transition colours and
  reports phantom failures.
- **Ordinals are text** — colour them with an ink token, never a `--line-*`
  border value (that lands at ~1.8:1).
- Mono needs `font-variant-ligatures: none`, or `--accent` renders as `—accent`.
- Hiding the wordmark text at narrow widths removes the link's accessible name;
  the `aria-label` on the anchor is load-bearing.

## Verification

Audited on the rendered page with a canvas-backed colour parser (`getComputedStyle`
returns `oklch()` / `color()` for wide-gamut values, which an `rgb()` regex
silently misreads):

- **0 WCAG AA failures** across 74 text nodes, in **both** themes
- **No horizontal scroll at 360px**; nav survives the narrow breakpoint
- `next build` + TypeScript + `eslint .` all clean

## Before launch

- [ ] Confirm handles: `github.com/dcyfr`, `dev.to/dcyfr`.
- [ ] Decide how much agent-fleet detail should be public.
- [ ] Point `cyberdrew.dev` at the Vercel deployment.

## Deploy

Zero-config on **Vercel**. Set the production domain to `cyberdrew.dev`.
