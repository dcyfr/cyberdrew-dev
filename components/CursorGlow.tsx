"use client";

import { useEffect } from "react";

/**
 * One light source, two things it falls on.
 *
 * Edges take a travelling light: a hot core on the rule with a soft bleed
 * around it. Glass panels take a specular sweep. Both from the SAME pointer
 * position, which is the point of driving them from one loop — a highlight
 * pinned to a card's corner reads as the card lighting up, while a highlight
 * that moves, and that agrees with the light on the heading above it, reads as
 * one surface catching one source.
 *
 * Nothing here lights TYPE. The headline used to take a gradient clipped to its
 * own glyphs; that read as coloured text rather than as something lit, and it
 * made the type's colour a moving target for contrast. Lighting edges instead
 * means the numbers are the same lit and unlit.
 *
 * Writes three custom properties per frame and nothing else; every gradient
 * lives in CSS. Pointer-only, and skipped entirely under reduced motion or on
 * coarse pointers, where there is no cursor to follow and the effect would
 * just be a static smear.
 */
export function CursorGlow() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    // A panel is a bounded object you are already pointing at, so its
    // highlight fades over a short reach. An edge is one pixel tall and has to
    // start arriving before the pointer is on top of it, or it only ever
    // appears after you have stopped looking for it.
    const panels = [...document.querySelectorAll<HTMLElement>(".row")].map(
      (el) => ({ el, reach: 90 }),
    );
    const edges = [
      ...document.querySelectorAll<HTMLElement>("[data-rule-glow]"),
    ].map((el) => ({ el, reach: 260 }));
    const targets = [...panels, ...edges];
    if (targets.length === 0) return;

    let frame = 0;
    let x = 0;
    let y = 0;

    const paint = () => {
      frame = 0;
      for (const { el, reach } of targets) {
        const r = el.getBoundingClientRect();
        // Skip anything off screen: on a long page most targets are, and
        // getBoundingClientRect is the expensive part of this loop.
        if (r.bottom < -reach || r.top > window.innerHeight + reach) continue;
        if (r.width === 0 || r.height === 0) continue;

        // Proximity, not a boolean: the light arrives and leaves rather than
        // switching, which is what keeps it reading as a light source.
        const dy = y < r.top ? r.top - y : y > r.bottom ? y - r.bottom : 0;
        const near = Math.max(0, 1 - dy / reach);

        el.style.setProperty("--gx", `${((x - r.left) / r.width) * 100}%`);
        el.style.setProperty("--gy", `${((y - r.top) / r.height) * 100}%`);
        el.style.setProperty("--ga", near.toFixed(3));
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
