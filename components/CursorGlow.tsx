"use client";

import { useEffect } from "react";

/**
 * One light source, three things it falls on.
 *
 * Edges take a travelling light: a hot core on the rule with a soft bleed
 * around it. Glass panels take a specular sweep. Bordered panels take a ring —
 * the same light, wrapped all the way round the border instead of laid along
 * one hairline. All three from the SAME pointer position, which is the point of
 * driving them from one loop: a highlight pinned to a card's corner reads as
 * the card lighting up, while a highlight that moves, and that agrees with the
 * light on the heading above it, reads as one surface catching one source.
 *
 * Nothing here lights TYPE. The headline used to take a gradient clipped to its
 * own glyphs; that read as coloured text rather than as something lit, and it
 * made the type's colour a moving target for contrast. Lighting edges instead
 * means the numbers are the same lit and unlit.
 *
 * Writes at most five custom properties per frame and nothing else; every
 * gradient lives in CSS. Skipped entirely under reduced motion.
 *
 * TWO WAYS TO ASK "where is the reader looking".
 *
 * With a cursor, the cursor is the answer and the light follows it. Touch has
 * no cursor, and this used to bail there — which meant the effect was missing
 * on phones, where most of the page is actually read. Bailing was treating "no
 * pointer" as "no answer", and there is a perfectly good second answer: the
 * scroll position. What you are reading on a phone is whatever you just
 * scrolled to, so the light hangs at a fixed reading line in the viewport and
 * the page moves past it. Sections light as they arrive and go out as they
 * leave, which is the same behaviour a pointer produces, driven by the other
 * input.
 *
 * It is deliberately NOT a static full-strength glow. A light that never moves
 * is a painted-on highlight; the thing that makes this read as a light source
 * is that its position is a fact about the reader, and on touch the scroll is
 * that fact. The lateral drift below is the same idea: the point travels as
 * the page does, so no two sections are lit identically.
 */
export function CursorGlow() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    // A panel is a bounded object you are already pointing at, so its
    // highlight fades over a short reach. An edge is one pixel tall and has to
    // start arriving before the pointer is on top of it, or it only ever
    // appears after you have stopped looking for it. A ring is an edge that
    // surrounds you, so it gets the longest reach of the three — you approach
    // it from outside and then stand inside it.
    const targets = [
      ...[...document.querySelectorAll<HTMLElement>(".row")].map((el) => ({
        el,
        reach: 90,
        ring: false,
      })),
      ...[...document.querySelectorAll<HTMLElement>("[data-rule-glow]")].map((el) => ({
        el,
        reach: 260,
        ring: false,
      })),
      ...[...document.querySelectorAll<HTMLElement>("[data-ring-glow]")].map((el) => ({
        el,
        reach: 320,
        ring: true,
      })),
    ];
    if (targets.length === 0) return;

    let frame = 0;
    let x = 0;
    let y = 0;

    const paint = () => {
      frame = 0;
      for (const { el, reach, ring } of targets) {
        const r = el.getBoundingClientRect();
        // Skip anything off screen: on a long page most targets are, and
        // getBoundingClientRect is the expensive part of this loop.
        if (r.bottom < -reach || r.top > window.innerHeight + reach) continue;
        if (r.width === 0 || r.height === 0) continue;

        // Proximity, not a boolean: the light arrives and leaves rather than
        // switching, which is what keeps it reading as a light source.
        const dy = y < r.top ? r.top - y : y > r.bottom ? y - r.bottom : 0;

        if (!ring) {
          el.style.setProperty("--gx", `${((x - r.left) / r.width) * 100}%`);
          el.style.setProperty("--gy", `${((y - r.top) / r.height) * 100}%`);
          el.style.setProperty("--ga", Math.max(0, 1 - dy / reach).toFixed(3));
          continue;
        }

        // A ring lights at the point on its border NEAREST the pointer, so the
        // arc slides along a side and bends round a corner instead of jumping
        // between them. Two cases, and the second is the one that matters:
        //
        //   outside the box — clamping the pointer into the rect already lands
        //     on the boundary, and clamping BOTH axes at once lands exactly on
        //     the corner when you approach diagonally, which is why corners
        //     come out right for free;
        //   inside the box  — the clamp is a no-op, so snap the shorter axis to
        //     whichever of the four edges is closest.
        //
        // Only the projected point is published. CSS never has to know where
        // the pointer actually was, which is what keeps the ring's geometry a
        // pure function of --rx/--ry.
        let bx = Math.min(Math.max(x, r.left), r.right);
        let by = Math.min(Math.max(y, r.top), r.bottom);
        const inside = x > r.left && x < r.right && y > r.top && y < r.bottom;
        if (inside) {
          const dl = x - r.left;
          const dr = r.right - x;
          const dt = y - r.top;
          const db = r.bottom - y;
          const nearest = Math.min(dl, dr, dt, db);
          if (nearest === dl) bx = r.left;
          else if (nearest === dr) bx = r.right;
          else if (nearest === dt) by = r.top;
          else by = r.bottom;
        }

        // True distance to the box, not just the vertical drop the edges use.
        // A slab is over a thousand pixels wide, so a pointer parked off to one
        // side of it is vertically adjacent and nowhere near it.
        const dx = x < r.left ? r.left - x : x > r.right ? x - r.right : 0;
        const d = Math.hypot(dx, dy);

        el.style.setProperty("--rx", `${((bx - r.left) / r.width) * 100}%`);
        el.style.setProperty("--ry", `${((by - r.top) / r.height) * 100}%`);
        el.style.setProperty("--ga", Math.max(0, 1 - d / reach).toFixed(3));
      }
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };

    if (fine) {
      const onMove = (e: PointerEvent) => {
        x = e.clientX;
        y = e.clientY;
        schedule();
      };

      window.addEventListener("pointermove", onMove, { passive: true });
      return () => {
        window.removeEventListener("pointermove", onMove);
        if (frame) cancelAnimationFrame(frame);
      };
    }

    // The reading line, once the page is moving. Slightly above centre because
    // that is where a thing you have just scrolled to comes to rest, and
    // because the reaches above are symmetric — put the line at 50% and the
    // light favours whatever is leaving the screen as much as whatever is
    // arriving.
    const REST_LINE = 0.42;
    // Where it sits before the first scroll. At the top of a document nothing
    // has been scrolled TO, so a line at 42% is a claim about attention that
    // there is no evidence for, and it lands in the hero's empty upper half:
    // the page opens completely dark and stays that way until you touch it.
    // The hero's own lit edge sits low, so the line starts on it and rises to
    // rest over the first screenful. That opening state is what a desktop
    // visitor gets for free the moment the pointer crosses the window, and
    // what touch had no way to ask for.
    const OPEN_LINE = 0.84;
    const SETTLE_PX = 420;
    // How far the page travels for one full left-to-right pass of the light.
    // Long on purpose: at roughly two viewports per sweep the drift is a thing
    // you notice having happened, not a thing you watch happening.
    const SWEEP_PX = 2200;

    // A nav tap is the one moment where the reader is demonstrably NOT looking
    // at the reading line: they are looking at the thing they asked for, and
    // that thing comes to rest at the top of the screen. Left alone, the tap
    // ends with two cards glowing in the middle of the viewport and the
    // heading you tapped for sitting dark above them. So the light rides up to
    // meet the landing and then walks back down to rest — the section arrives
    // lit, which is the arrival being acknowledged rather than decorated.
    const LAND_LINE = 0.12;
    // Generous, because the smooth scroll spends the first part of it in
    // flight. What is left is the dwell once the section is actually there.
    const LAND_MS = 2200;
    let landedAt = 0;

    const line = () => {
      const settle = Math.min(1, window.scrollY / SETTLE_PX);
      const rest = OPEN_LINE + (REST_LINE - OPEN_LINE) * settle;
      if (!landedAt) return rest;
      const p = (performance.now() - landedAt) / LAND_MS;
      if (p >= 1) {
        landedAt = 0;
        return rest;
      }
      // smoothstep, so the light leaves the heading the way it arrived
      return LAND_LINE + (rest - LAND_LINE) * (p * p * (3 - 2 * p));
    };

    const track = () => {
      // A triangle wave, so the light turns around at the edges instead of
      // teleporting back to the left every sweep.
      const phase = (window.scrollY / SWEEP_PX) % 2;
      const t = phase < 1 ? phase : 2 - phase;
      x = window.innerWidth * (0.12 + 0.76 * t);
      y = window.innerHeight * line();
      schedule();
    };

    // Scroll alone cannot drive the walk back down: a smooth scroll stops
    // firing events the moment it arrives, which is exactly when the ease has
    // the furthest still to travel. Pump it for as long as a landing is live
    // and not one frame longer.
    let pump = 0;
    const runPump = () => {
      pump = landedAt ? requestAnimationFrame(runPump) : 0;
      track();
    };

    // Delegated, so it covers the dock rail, the collapsed panel and the hero
    // buttons at once — and, unlike hashchange, it still fires when you tap
    // the section you are already on.
    const onJump = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href^='#']");
      if (!a || a.getAttribute("href") === "#") return;
      landedAt = performance.now();
      if (!pump) runPump();
    };

    // Once up front: the hero is already at the reading line on first paint,
    // and waiting for a scroll to light anything would mean the page opens in
    // the unlit state it is supposed to be the exception.
    track();

    document.addEventListener("click", onJump);
    window.addEventListener("scroll", track, { passive: true });
    window.addEventListener("resize", track, { passive: true });
    return () => {
      document.removeEventListener("click", onJump);
      window.removeEventListener("scroll", track);
      window.removeEventListener("resize", track);
      if (pump) cancelAnimationFrame(pump);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
