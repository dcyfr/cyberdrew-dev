"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
} from "react";
import { createPortal } from "react-dom";
import { nav } from "@/lib/site";
import { ThemeToggle } from "./ThemeToggle";

/**
 * The dock's two right-hand slots, rendered as one fragment because they share
 * one piece of state: the centred link rail (with its collapsed panel) and the
 * end cap that holds the theme toggle and the disclosure trigger.
 *
 * Three tiers, decided by the dock's own inline-size rather than the
 * viewport's — see the container queries in globals.css:
 *   full       links inline, roomy, wordmark spelled out
 *   condensed  links inline, tightened, wordmark down to its mark
 *   collapsed  links behind the trigger, in a panel the width of the dock
 *
 * Disclosure contract: aria-expanded/aria-controls, Escape closes and returns
 * focus to the trigger, Tab is trapped between the trigger and the panel,
 * Up/Down/Home/End steer the list, an outside press closes, scrolling closes,
 * following a link closes, and the panel cannot survive the dock growing back
 * past its collapse point.
 */

/** Everything in the panel that can take keyboard focus. */
const FOCUSABLE = "a[href], button:not([disabled])";

/** How far the page may move under an open panel before that counts as a
 *  dismissal. Absorbs rubber-banding and mobile address-bar collapse. */
const SCROLL_DISMISS_PX = 24;

/* "Has this hydrated yet", asked without an effect. The scrim is portalled
   into <body>, which there is no server equivalent of, and a mount flag set
   from an effect is a cascading render (and a lint error) for a value that is
   constant per environment. Same shape ThemeToggle uses to read the theme. */
const noopSubscribe = () => () => {};
const useIsClient = () => useSyncExternalStore(noopSubscribe, () => true, () => false);

export function NavMenu() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // The scrim cannot live inside the dock: .header carries `contain: layout`
  // as a side effect of `container-type`, which makes it the containing block
  // for FIXED descendants too, so a scrim rendered in place would be trapped
  // inside the pill instead of covering the viewport.
  const isClient = useIsClient();

  const close = useCallback((refocus = false) => {
    setOpen(false);
    if (refocus) triggerRef.current?.focus();
  }, []);

  /* Ask the CSS where it decided to collapse instead of restating the
     threshold here, where the two would be free to drift apart: if the
     container query has hidden the trigger then the inline links are showing,
     and an open panel is stale state whose aria-expanded is now a lie. */
  useEffect(() => {
    const trigger = triggerRef.current;
    const dock = trigger?.closest<HTMLElement>(".header");
    if (!trigger || !dock) return;

    const sync = () => {
      if (getComputedStyle(trigger).display === "none") setOpen(false);
    };
    const ro = new ResizeObserver(sync);
    ro.observe(dock);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    const trigger = triggerRef.current;

    const items = () => [...(panel?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? [])];

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close(true);
        return;
      }

      const list = items();
      if (list.length === 0) return;
      const active = document.activeElement as HTMLElement | null;
      const i = active ? list.indexOf(active) : -1;

      /* Trigger and panel are one closed tab ring while the panel is open, so
         Tab can never land on the content the scrim is covering. DOM order
         already carries trigger -> first item and first item -> trigger; only
         the two wrap-around edges need help. */
      if (e.key === "Tab") {
        if (!e.shiftKey && i === list.length - 1) {
          e.preventDefault();
          trigger?.focus();
        } else if (e.shiftKey && active === trigger) {
          e.preventDefault();
          list[list.length - 1]?.focus();
        }
        return;
      }

      // Arrow steering, but only once focus is inside the panel: the panel is
      // a list, and Up/Down is how a list is read.
      if (i < 0) return;
      const go = (n: number) => {
        e.preventDefault();
        list[(n + list.length) % list.length]?.focus();
      };
      if (e.key === "ArrowDown") go(i + 1);
      else if (e.key === "ArrowUp") go(i - 1);
      else if (e.key === "Home") go(0);
      else if (e.key === "End") go(list.length - 1);
    };

    const onPointer = (e: PointerEvent) => {
      const t = e.target as Node;
      if (!panel?.contains(t) && !trigger?.contains(t)) setOpen(false);
    };

    // A panel that stays pinned while the page moves under it reads as stuck
    // to the glass rather than attached to the dock.
    const y0 = window.scrollY;
    const onScroll = () => {
      if (Math.abs(window.scrollY - y0) > SCROLL_DISMISS_PX) setOpen(false);
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
      window.removeEventListener("scroll", onScroll);
    };
  }, [open, close]);

  return (
    <>
      <nav className="nav" aria-label="Primary">
        {/* The current-section pill is ONE object that travels between links,
            not five that blink on and off. NavSpy drives --ind-x/--ind-w off
            whichever link is current; without JS the per-link [aria-current]
            fill is the fallback, so nothing is lost. */}
        <span className="nav-ind" aria-hidden="true" />
        {nav.map((n) => (
          <a className="nav-link" data-nav-link="" key={n.href} href={n.href}>
            {n.label}
          </a>
        ))}
      </nav>

      {/* Collapsed only. Positioned off .header, so it is the width of the
          dock and reads as the dock growing rather than as a card landing
          near it. Never `hidden`: display is driven from [data-open] so the
          close can be transitioned (see globals.css). Exactly one of this and
          .nav is ever display:block, so the two Primary landmarks can never
          both be in the accessibility tree. */}
      <div
        className="nav-panel"
        id={panelId}
        ref={panelRef}
        data-open={open || undefined}
        // --n lets the stagger run from whichever end of the list is nearest
        // the dock, which flips with the dock itself.
        style={{ "--n": nav.length } as CSSProperties}
      >
        <nav aria-label="Primary">
          {nav.map((n, i) => (
            <a
              className="nav-panel-link"
              data-nav-link=""
              key={n.href}
              href={n.href}
              style={{ "--i": i } as CSSProperties}
              onClick={() => setOpen(false)}
            >
              {n.label}
            </a>
          ))}
        </nav>
      </div>

      {/* The end cap survives every tier: the theme toggle is never behind a
          disclosure, and on a phone it lands next to the trigger in the same
          thumb arc. */}
      <div className="dock-end">
        <ThemeToggle />
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
      </div>

      {/* Dismissal surface and separation in one. Kept mounted so its fade-out
          can run; [data-open] is the only thing that moves. */}
      {isClient &&
        createPortal(
          <div className="dock-scrim" data-open={open || undefined} aria-hidden="true" />,
          document.body,
        )}
    </>
  );
}
