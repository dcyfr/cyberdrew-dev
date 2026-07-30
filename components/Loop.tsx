"use client";

import { useEffect, useRef, useState } from "react";
import { loop } from "@/lib/site";

/**
 * The sticky sequence. A pinned dial holds while the steps scroll past, and an
 * IntersectionObserver keyed to a -45%/-45% band swaps the active state — so
 * the visual IS the system being described, not a decoration beside it.
 */
export function Loop() {
  const [active, setActive] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const nodes = stepRefs.current.filter(Boolean) as HTMLDivElement[];
    if (nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const idx = Number((entry.target as HTMLElement).dataset.idx);
          if (!Number.isNaN(idx)) setActive(idx);
        }
      },
      // A narrow band across the middle of the viewport: exactly one step
      // qualifies at a time, so the dial never flickers between two states.
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, []);

  const pct = Math.round(((active + 1) / loop.steps.length) * 100);

  return (
    <section className="bay" id="loop">
      <div className="wide">
        <div className="sect-head">
          <p className="eyebrow">{loop.eyebrow}</p>
          <h2 className="sect-h">{loop.headline}</h2>
          <p className="sect-deck">{loop.deck}</p>
        </div>

        <div className="loop-grid">
          <div className="loop-pin">
            <div className="dial">
              <div className="dial-head">
                <span>cycle</span>
                <span>every 30 min</span>
              </div>

              <div className="dial-rows">
                {loop.steps.map((s, i) => {
                  const state = i === active ? "active" : i < active ? "done" : "idle";
                  return (
                    <div className="dial-row" key={s.id} data-state={state}>
                      <span className="n">{s.num}</span>
                      <span className="nm">{s.name.toLowerCase()}</span>
                      {/* State is named, never implied — colour is redundant. */}
                      <span className="st">
                        {state === "active" ? "running" : state === "done" ? "done" : "queued"}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div
                className="dial-bar"
                role="progressbar"
                aria-valuenow={pct}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Cycle progress"
              >
                <i style={{ width: `${pct}%` }} />
              </div>
            </div>
          </div>

          <div className="loop-steps">
            {loop.steps.map((s, i) => (
              <div
                className="loop-step"
                key={s.id}
                data-idx={i}
                ref={(el) => {
                  stepRefs.current[i] = el;
                }}
              >
                <p className="step-tier">
                  {s.num} — {s.tier}
                </p>
                <h3>{s.name}</h3>
                <p>{s.desc}</p>
                <div className="step-guard">
                  <b>What stops it</b>
                  {s.guard}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
