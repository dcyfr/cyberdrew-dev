"use client";

import { useEffect, useId, useRef, useState } from "react";
import { nav } from "@/lib/site";
import { ThemeToggle } from "./ThemeToggle";

/**
 * Desktop: links inline with the theme toggle.
 * Narrow: everything collapses behind one disclosure, so the dock stays a
 * dock instead of cramming five targets into 336px.
 *
 * Disclosure contract: aria-expanded/aria-controls, Escape closes and returns
 * focus to the trigger, an outside click closes, and following a link closes.
 */
export function NavMenu() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      triggerRef.current?.focus();
    };
    const onPointer = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    <div className="nav-wrap" ref={wrapRef}>
      <nav className="nav" aria-label="Primary">
        {nav.map((n) => (
          <a className="nav-link" key={n.href} href={n.href}>
            {n.label}
          </a>
        ))}
        <ThemeToggle />
      </nav>

      <button
        ref={triggerRef}
        className="nav-trigger"
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="bars" data-open={open || undefined} aria-hidden="true">
          <i />
          <i />
        </span>
      </button>

      <div className="nav-panel" id={panelId} data-open={open || undefined} hidden={!open}>
        {nav.map((n) => (
          <a className="nav-panel-link" key={n.href} href={n.href} onClick={() => setOpen(false)}>
            {n.label}
          </a>
        ))}
        <div className="nav-panel-foot">
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
