"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";

type Theme = "light" | "dark";

/**
 * The theme lives on <html data-theme>, set before first paint by the boot
 * script in layout.tsx. This subscribes to it rather than mirroring it into
 * React state from an effect, which would cascade a render on every mount.
 */
function subscribe(onChange: () => void) {
  const mq = window.matchMedia("(prefers-color-scheme: light)");
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributeFilter: ["data-theme"] });
  mq.addEventListener("change", onChange);
  return () => {
    observer.disconnect();
    mq.removeEventListener("change", onChange);
  };
}

function getSnapshot(): Theme {
  const attr = document.documentElement.getAttribute("data-theme");
  if (attr === "light" || attr === "dark") return attr;
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

// Dark is the default ground, so it is what the server renders.
const getServerSnapshot = (): Theme => "dark";

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  /**
   * Keep the browser chrome on the same ground as the page.
   *
   * The two theme-color metas in layout.tsx are keyed to prefers-color-scheme,
   * which is the OS answer — and this button exists precisely so the page can
   * disagree with the OS. Choose light on a dark phone and iOS keeps painting
   * its bars obsidian against a bone page: the same dark band viewport-fit was
   * added to remove, arriving by the other route.
   *
   * Both tags get the resolved colour, so whichever one the browser matches is
   * the right one. It is read from --bg rather than restated here, because a
   * second copy of the ground's hex is a second thing to forget.
   *
   * Self-corrects if the OS scheme later changes: subscribe() is watching that
   * media query too, so theme updates and this runs again.
   */
  useEffect(() => {
    const bg = getComputedStyle(document.documentElement).getPropertyValue("--bg").trim();
    if (!bg) return;
    for (const m of document.querySelectorAll('meta[name="theme-color"]')) {
      m.setAttribute("content", bg);
    }
  }, [theme]);

  const swap = useCallback(() => {
    const next: Theme = theme === "light" ? "dark" : "light";
    const root = document.documentElement;

    // A stepped transition never settles when the underlying value changes via
    // a custom property — it strands every transitioned colour on the previous
    // theme's value (measured bone-on-white at 1.40:1). Suppress for one frame.
    root.classList.add("theme-swap");
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Private mode / blocked storage — the swap still applies for this view.
    }
    requestAnimationFrame(() => {
      requestAnimationFrame(() => root.classList.remove("theme-swap"));
    });
  }, [theme]);

  return (
    <button
      className="theme-toggle"
      onClick={swap}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
      title="Switch theme"
      type="button"
    >
      {theme === "light" ? "◐" : "◑"}
    </button>
  );
}
