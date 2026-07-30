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

## Layout: floating, not fenced

Nothing is bounded by a shared rule. The header is a **floating dock**, fixed
and inset from every edge, with the page scrolling under it. Work and writing
items are **discrete cards** that lift on hover rather than list rows divided
by hairlines. The contact block is an **inset slab** with radius and elevation
instead of a full-bleed band. Tags are soft chips, not outlined boxes.

That is why `--radius` is no longer `0`: a floating object needs an edge and a
shadow to read as floating. The identity doc's "hard cut, not a soft card"
governs imagery and plates; its own carve-out gives interface chrome radius
and elevation, because affordance beats purity.

Sections rise into place on scroll (`[data-reveal]`, staggered via `--i`),
transform and opacity only.

Surfaces are glass: translucent fill, a blur sampling what is behind, a bright
top bevel, a dark bottom edge, a soft bloom outside. Glass needs something to
refract, so `body::before` paints three very low-alpha blooms into the ground
and `body::after` dithers them — a gradient that large cannot be represented
in 8-bit sRGB without banding, and noise is the fix, not animation.

Key display text carries a warm-to-cool light under the pointer
(`[data-glow]`), amplifying the temperature axis the palette already has.

## Stack

- **Next.js 16** (App Router) · **React 19** · **TypeScript**
- No Tailwind here — hand-tuned CSS in [`app/globals.css`](app/globals.css)
  driven by tokens. Dark is default; light via `prefers-color-scheme` and an
  explicit `data-theme` toggle.
- One self-hosted variable grotesk (Archivo, 36KB Latin subset) via
  `next/font/local`, preloaded with a metric-matched fallback. Mono and the
  OG card fall back to system/vendored faces.

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
  icon.tsx             generated favicon, same star path
  not-found.tsx        themed 404
  llms.txt/route.ts    machine-readable site, GENERATED from lib/site.ts
  fonts/               vendored Archivo Variable + licence
components/
  Header.tsx       sticky nav, star mark, static wordmark
  Hero.tsx         statement, deck, actions, roles
  Work.tsx         three hairline rows
  Writing.tsx      four hairline rows, tighter
  Contact.tsx      the single inverted block
  SiteFooter.tsx   sign-off + elsewhere
  ThemeToggle.tsx  light/dark, with the one-frame transition guard
  TextCycler.tsx   token-streaming hero eyebrow (client)
  NavSpy.tsx       marks the nav link owning the viewport (client)
  ScrollReveal.tsx reveals [data-reveal] on entry (client)
  NavMenu.tsx      inline links wide, disclosure narrow (client)
  CursorGlow.tsx   warm-to-cool light under the pointer (client)
  StarMark.tsx     renders lib/mark.ts
lib/
  site.ts          ALL copy and links — edit here
  mark.ts          the star path, shared by header, status, favicon, OG
```

Sections: **header · hero · work · writing · contact · footer**. The earlier
loop / envelope / ledger sections are recoverable from git at `59f959e`.

## Invariants (learned the hard way, do not regress these)

- **`llms.txt` is generated, never hand-written.** The old static
  `public/llms.txt` silently drifted until it advertised a project the site no
  longer listed. Do not reintroduce a file in `public/`: it would shadow the
  route and drift again.
- **Glass inside the inverted slab must be mixed from `--on-accent`,** not
  `--surface`. The generic ghost-button fill put mid-grey under light text
  and the email read 3.93:1 in light.
- **Audit translucent layers by COMPOSITING them,** not by skipping to the
  first opaque ancestor. Skipping is precisely what hid that failure: the
  45%-alpha overlay was ignored and the opaque slab underneath scored fine.
- **Any contrast measurement must suppress transitions first** (`.theme-swap`).
  Reading a colour within 160ms of a theme swap returns a mid-transition
  value; it reported the email button at 1.00:1 and sent me chasing a
  non-existent bug.
- **Never hand-write `-webkit-backdrop-filter`.** Lightning CSS dedupes the
  pair down to whichever prefix you wrote and drops the standard property.
  Chrome no longer supports the `-webkit-` alias, so writing it by hand
  silently killed the blur everywhere while `CSS.supports` still said yes.
  Declare the standard property only; the build adds prefixes.
- **Glass needs something behind it.** `body::before` paints three very
  low-alpha blooms into the ground; without them a blurred panel over a flat
  field is just a slightly different flat field.
- **The reveal's hidden state is gated on `.js-reveal`,** set pre-paint in
  layout.tsx. Without that gate a JS failure strands every section at
  opacity 0; setting it after hydration flashes instead.
- **Chips need `--chip-ink`, not `--ink-mut`.** A chip sits on `--surface-2`,
  not the page ground, and the muted ink measured 4.34:1 there in light.
- **`lib/mark.ts` is the only definition of the star.** Header, status
  bullets, favicon and OG card all read it.
- **Satori (OG images) parses TTF/OTF only.** It rejects woff2 with
  "Unsupported OpenType signature wOF2", so the card uses static TTF cuts
  while the page uses the variable woff2.
- **Scroll-driven animations need `animation-duration: auto`;** the
  `animation` shorthand resets it to 0s. Verify them by reading the
  animation timeline `currentTime`, not the computed transform, which lags
  because the animation is composited off the main thread.

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

- **0 WCAG AA failures** across every rendered text node, in **both** themes
- **No horizontal scroll at 360px**; nav survives the narrow breakpoint
- `next build` + TypeScript + `eslint .` all clean

## Before launch

- [ ] Confirm handles: `github.com/dcyfr`, `linkedin.com/in/dcyfr`, `x.com/dcyfr_`.
- [ ] Decide whether the contact section should state real availability.
- [ ] Decide how much agent-fleet detail should be public.
- [ ] Point `cyberdrew.dev` at the Vercel deployment.

## Deploy

Zero-config on **Vercel**. Set the production domain to `cyberdrew.dev`.
