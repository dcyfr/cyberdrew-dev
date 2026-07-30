"use client";

import { useEffect, useState } from "react";
import { wordmarkCycle } from "@/lib/site";

/**
 * Cycles the header title through the wordmark set on a hard cut (no fade;
 * cuts are the house motion language). Under prefers-reduced-motion it rests
 * on the first entry. The span is aria-hidden: the link's accessible name is
 * the static aria-label on the anchor, so assistive tech never sees churn.
 */
export function WordmarkCycler() {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setI((v) => (v + 1) % wordmarkCycle.length), 2800);
    return () => clearInterval(id);
  }, []);

  return <span aria-hidden="true">{wordmarkCycle[i]}</span>;
}
