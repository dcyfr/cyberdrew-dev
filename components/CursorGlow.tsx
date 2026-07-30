"use client";

import { useEffect } from "react";

/**
 * Warm-to-cool light travelling under the pointer across key display text.
 *
 * The temperature axis is already in the identity: bone is warm (R>G>B),
 * obsidian is cool (B>R). This amplifies that existing axis rather than
 * introducing hue, so the page stays monochrome in the sense that matters.
 *
 * Writes two custom properties per frame and nothing else; the gradient
 * itself is clipped to the glyphs in CSS. Pointer-only, and skipped entirely
 * under reduced motion or on coarse pointers, where there is no cursor to
 * follow and the effect would just be a static smear.
 */
export function CursorGlow() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const targets = [...document.querySelectorAll<HTMLElement>("[data-glow]")];
    if (targets.length === 0) return;

    let frame = 0;
    let x = 0;
    let y = 0;

    const paint = () => {
      frame = 0;
      for (const el of targets) {
        const r = el.getBoundingClientRect();
        // Only light a heading while the pointer is near it, so the whole
        // page is not permanently glowing.
        const near = y > r.top - 220 && y < r.bottom + 220;
        el.style.setProperty("--gx", `${((x - r.left) / r.width) * 100}%`);
        el.style.setProperty("--gy", `${((y - r.top) / r.height) * 100}%`);
        el.style.setProperty("--ga", near ? "1" : "0");
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
