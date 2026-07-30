"use client";

import { useEffect, useState } from "react";

/**
 * Cycles a phrase on a hard cut (no fade; cuts are the house motion
 * language). Rests on items[0] under prefers-reduced-motion.
 *
 * Accessibility: the animated span is aria-hidden and the full resting phrase
 * is exposed once in a visually-hidden sibling, so assistive tech reads one
 * stable string instead of a value that mutates every few seconds.
 */
export function TextCycler({
  items,
  intervalMs = 2800,
  label,
}: {
  items: readonly string[];
  intervalMs?: number;
  label?: string;
}) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (items.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setI((v) => (v + 1) % items.length), intervalMs);
    return () => clearInterval(id);
  }, [items, intervalMs]);

  return (
    <>
      <span aria-hidden="true">{items[i]}</span>
      <span className="sr-only">{label ?? items[0]}</span>
    </>
  );
}
