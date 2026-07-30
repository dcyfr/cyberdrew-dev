"use client";

import { useCallback, useSyncExternalStore } from "react";

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
