"use client";

import { useEffect, useState } from "react";
import { commands, dispatchQueries } from "@/lib/content";
import { usePrefersReducedMotion } from "@/lib/hooks";

// The hero product surface: a launcher palette pointed at agents instead of
// apps. The selection walks the list and the query line types itself, so the
// page reads as a system already doing something rather than a screenshot.
//
// SSR renders the first query in full and the first row selected — no layout
// shift on hydration, and it degrades to a static (still legible) panel when
// JS is off or motion is reduced.
export default function Console() {
  const reduce = usePrefersReducedMotion();
  const [sel, setSel] = useState(0);
  const [qi, setQi] = useState(0);
  const [typed, setTyped] = useState<string>(dispatchQueries[0]);

  // Walk the selection down the command list.
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setSel((s) => (s + 1) % commands.length), 2100);
    return () => clearInterval(id);
  }, [reduce]);

  // Type the current query, hold, erase, advance.
  useEffect(() => {
    if (reduce) return;
    const full = dispatchQueries[qi];
    let i = 0;
    let erasing = false;
    let hold = 0;

    const id = setInterval(() => {
      if (hold > 0) {
        hold--;
        return;
      }
      if (!erasing) {
        i++;
        setTyped(full.slice(0, i));
        if (i >= full.length) {
          erasing = true;
          hold = 22; // ~1.5s dwell on the complete phrase
        }
      } else {
        i--;
        setTyped(full.slice(0, i));
        if (i <= 0) {
          clearInterval(id);
          setQi((q) => (q + 1) % dispatchQueries.length);
        }
      }
    }, 68);

    return () => clearInterval(id);
  }, [qi, reduce]);

  return (
    <div className="console" role="img" aria-label="Agent dispatch console: research, review, monitor, heal and ship commands, fleet online">
      <div className="cbar">
        <span className="glyph" aria-hidden="true" />
        <span className="q">
          {typed}
          {typed.length === 0 && <span className="ph">dispatch an agent…</span>}
          <span className="caret" aria-hidden="true" />
        </span>
        <span className="keys" aria-hidden="true">
          <span className="kbd">⌘</span>
          <span className="kbd">K</span>
        </span>
      </div>

      <p className="clabel">Fleet</p>

      <div className="rows">
        {commands.map((c, i) => (
          <div className="crow" key={c.name} data-on={reduce ? i === 0 : i === sel}>
            <span className="ico" aria-hidden="true">
              {c.ico}
            </span>
            <span className="name">{c.name}</span>
            <span className="desc">{c.desc}</span>
            <span className="keys" aria-hidden="true">
              {c.keys.map((k) => (
                <span className="kbd" key={k}>
                  {k}
                </span>
              ))}
            </span>
          </div>
        ))}
      </div>

      <div className="cfoot">
        <span className="pulse" aria-hidden="true" />
        <span>fleet online · 30+ agents · nominal</span>
        <span className="sep" />
        <span className="act">
          dispatch <span className="kbd">↵</span>
        </span>
      </div>
    </div>
  );
}
