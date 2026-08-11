"use client";

import { useEffect } from "react";

/**
 * Marks the nav link for whichever section owns the viewport, so the header
 * is a position readout rather than a static list. Pairs with the scroll
 * rule: position in a document is information.
 *
 * Two jobs, one observer:
 *   1. aria-current="location" on EVERY nav link for that section — the inline
 *      rail and the collapsed panel both, so the readout survives the tier
 *      change instead of being a desktop-only affordance.
 *   2. The geometry of the travelling pill (--ind-x / --ind-w on .nav). One
 *      object that moves between links reads as a mechanism; five that blink
 *      on and off read as five states.
 *
 * aria-current is both the styling hook and the accessible signal, so the
 * state is exposed rather than being colour-only. "location" is its ARIA
 * meaning here: the current place within a page, not a page within a site.
 */
export function NavSpy() {
  useEffect(() => {
    const links = [...document.querySelectorAll<HTMLAnchorElement>("[data-nav-link]")];
    if (links.length === 0) return;

    const bar = document.querySelector<HTMLElement>(".nav");
    const railLinks = bar ? [...bar.querySelectorAll<HTMLAnchorElement>("[data-nav-link]")] : [];

    // Both link lists address the same sections, so a naive map would observe
    // every section twice and the intersection bookkeeping would double up.
    const hrefs = [...new Set(links.map((l) => l.getAttribute("href") ?? ""))].filter((h) =>
      h.startsWith("#"),
    );
    const sections = hrefs
      .map((h) => document.querySelector<HTMLElement>(h))
      .filter((s): s is HTMLElement => Boolean(s));
    if (sections.length === 0) return;

    let activeId: string | null = null;

    /* offsetLeft/offsetWidth are measured against .nav, which is
       position:relative for exactly this reason. A collapsed rail is
       display:none, which strands both at 0 and would suck the pill to the
       left edge — offsetParent is the cheapest honest test for that. */
    const place = () => {
      if (!bar || bar.offsetParent === null) return;
      const link = activeId
        ? railLinks.find((l) => l.getAttribute("href") === `#${activeId}`)
        : null;
      if (!link) {
        bar.removeAttribute("data-ind");
        return;
      }
      bar.style.setProperty("--ind-x", `${link.offsetLeft}px`);
      bar.style.setProperty("--ind-w", `${link.offsetWidth}px`);
      bar.setAttribute("data-ind", "");
    };

    // Seed the pill on the first link while it is still invisible, so its
    // first appearance slides from a real position instead of growing out of
    // zero width at the rail's left edge.
    if (bar && railLinks[0] && bar.offsetParent !== null) {
      bar.style.setProperty("--ind-x", `${railLinks[0].offsetLeft}px`);
      bar.style.setProperty("--ind-w", `${railLinks[0].offsetWidth}px`);
    }

    const mark = (id: string | null) => {
      activeId = id;
      for (const l of links) {
        if (id && l.getAttribute("href") === `#${id}`) l.setAttribute("aria-current", "location");
        else l.removeAttribute("aria-current");
      }
      place();
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

    // The rail re-lays out on resize, on the tier change, and once the display
    // face swaps in — the pill has to follow all three or it strands.
    const ro = bar ? new ResizeObserver(place) : null;
    if (bar) ro?.observe(bar);
    document.fonts?.ready.then(place).catch(() => {});

    return () => {
      observer.disconnect();
      ro?.disconnect();
    };
  }, []);

  return null;
}
