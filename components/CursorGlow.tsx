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
 * gradient lives in CSS. Pointer-only, and skipped entirely under reduced
 * motion or on coarse pointers, where there is no cursor to follow and the
 * effect would just be a static smear.
 */
export function CursorGlow() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

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

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!frame) frame = requestAnimationFrame(paint);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
