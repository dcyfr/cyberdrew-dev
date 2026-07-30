"use client";

import { useEffect } from "react";

/**
 * Reveals [data-reveal] elements as they enter the viewport, once each.
 *
 * The hidden state lives behind .js-reveal on <html>, set pre-paint in
 * layout.tsx, so a JS failure can never strand the page at opacity 0. This
 * component only adds .is-in; if it never runs, everything is already visible.
 */
export function ScrollReveal() {
  useEffect(() => {
    const nodes = [...document.querySelectorAll<HTMLElement>("[data-reveal]")];
    if (nodes.length === 0) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      nodes.forEach((n) => n.classList.add("is-in"));
      return;
    }

    // Anything already on screen at load reveals immediately, so the first
    // viewport is never animating in from nothing on a deep link.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add("is-in");
          observer.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, []);

  return null;
}
