"use client";

import { useEffect } from "react";

/**
 * Marks the nav link for whichever section owns the viewport, so the header
 * is a position readout rather than a static list. Pairs with the scroll
 * rule: position in a document is information.
 *
 * Uses aria-current="true" as both the styling hook and the accessible
 * signal, so the state is exposed rather than being colour-only.
 */
export function NavSpy() {
  useEffect(() => {
    const links = [...document.querySelectorAll<HTMLAnchorElement>(".nav-link")];
    const sections = links
      .map((l) => document.querySelector<HTMLElement>(l.getAttribute("href") ?? ""))
      .filter((s): s is HTMLElement => Boolean(s));
    if (sections.length === 0) return;

    const mark = (id: string | null) => {
      for (const l of links) {
        if (id && l.getAttribute("href") === `#${id}`) l.setAttribute("aria-current", "true");
        else l.removeAttribute("aria-current");
      }
    };

    const seen = new Map<string, boolean>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) seen.set(e.target.id, e.isIntersecting);
        // Topmost intersecting section wins, so overlap never flickers.
        const active = sections.find((s) => seen.get(s.id));
        mark(active?.id ?? null);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return null;
}
