"use client";

import { useEffect } from "react";

/**
 * One light source, two materials.
 *
 * Display type takes a warm-to-cool glow clipped to the glyphs. The temperature
 * axis is already in the identity: bone is warm (R>G>B), obsidian is cool
 * (B>R). This amplifies that existing axis rather than introducing hue, so the
 * page stays monochrome in the sense that matters.
 *
 * Glass panels take a specular sweep from the SAME pointer position. That is
 * the point of driving both from one loop: a highlight pinned to a card's
 * top-left corner reads as the card lighting up, while a highlight that moves
 * with the pointer — and agrees with the light on the headline above it —
 * reads as a curved surface catching a light source. It is the cheapest of the
 * Liquid Glass cues and the most characteristic.
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

    // Text glows only when the pointer is roughly on the same band of the page.
    // A panel is a bounded object, so its highlight fades over a shorter reach.
    const text = [...document.querySelectorAll<HTMLElement>("[data-glow]")].map(
      (el) => ({ el, reach: 220 }),
    );
    const panels = [...document.querySelectorAll<HTMLElement>(".row")].map(
      (el) => ({ el, reach: 90 }),
    );
    const targets = [...text, ...panels];
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
