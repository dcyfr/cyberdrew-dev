"use client";

import { useEffect } from "react";

/**
 * Retracts the dock while scrolling down and brings it back on the way up,
 * so a translucent pill never sits on top of display type.
 *
 * This is the one place a scroll listener is justified: the progress rule is
 * pure CSS because it only needs scroll *position*, but direction has no
 * broadly-supported declarative form yet. The listener is passive and
 * rAF-coalesced, so it never blocks scrolling and does at most one write per
 * frame.
 */
export function DockAutoHide() {
  useEffect(() => {
    const dock = document.querySelector<HTMLElement>(".header");
    if (!dock) return;

    // Below this depth the dock always stays put: retracting it over the top
    // of the hero would read as a glitch rather than an affordance.
    const ALWAYS_SHOWN_ABOVE = 140;
    // Ignore sub-threshold jitter, including trackpad and rubber-band noise.
    const THRESHOLD = 6;

    let last = window.scrollY;
    let ticking = false;

    const update = () => {
      ticking = false;
      const y = Math.max(0, window.scrollY);
      const dy = y - last;

      if (y <= ALWAYS_SHOWN_ABOVE) {
        dock.dataset.dock = "shown";
        last = y;
        return;
      }
      if (Math.abs(dy) < THRESHOLD) return;
      dock.dataset.dock = dy > 0 ? "hidden" : "shown";
      last = y;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    // A keyboard user tabbing into the nav must never land on a retracted
    // dock: focus forces it back regardless of scroll direction.
    const onFocusIn = () => {
      dock.dataset.dock = "shown";
    };

    dock.dataset.dock = "shown";
    window.addEventListener("scroll", onScroll, { passive: true });
    dock.addEventListener("focusin", onFocusIn);
    return () => {
      window.removeEventListener("scroll", onScroll);
      dock.removeEventListener("focusin", onFocusIn);
    };
  }, []);

  return null;
}
