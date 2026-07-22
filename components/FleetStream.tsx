"use client";

import { useEffect, useState } from "react";
import { streamEvents, type StreamEvent } from "@/lib/content";
import { pad, usePrefersReducedMotion } from "@/lib/hooks";

type Line = StreamEvent & { id: number; time: string };

const stamp = () => {
  const d = new Date();
  return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
};

// Live agent-activity readout — the "heartbeat" that frames the page as a
// running autonomous system rather than a static portfolio.
export default function FleetStream() {
  const reduce = usePrefersReducedMotion();
  const [lines, setLines] = useState<Line[]>([]);

  useEffect(() => {
    let id = 0;
    let idx = 0;
    const next = (): Line => {
      const ev = streamEvents[idx % streamEvents.length];
      idx++;
      return { ...ev, id: id++, time: stamp() };
    };

    // Seed immediately so the panel is never empty.
    const seed = reduce ? 6 : 3;
    setLines(Array.from({ length: seed }, next));

    if (reduce) return;
    const timer = setInterval(() => {
      setLines((prev) => [...prev, next()].slice(-7));
    }, 1900);
    return () => clearInterval(timer);
  }, [reduce]);

  return (
    <section className="stream reveal" aria-label="live fleet telemetry">
      <div className="shead">
        <span className="title">
          <span className="dotlive" /> fleet.stream
        </span>
        <span className="metrics">
          <span>
            <b>30+</b> agents
          </span>
          <span>
            <b>24/7</b> autonomy
          </span>
          <span>
            <b>local-first</b> inference
          </span>
          <span>
            <b>cost</b>-gated
          </span>
        </span>
      </div>
      <div className="log" aria-hidden="true">
        {lines.map((l) => (
          <div className="ln" key={l.id}>
            <span className="t">{l.time}</span>
            <span className="ch">{l.ch}</span>
            <span className="ms">
              {l.before}
              {l.ok && <span className="ok">{l.ok}</span>}
              {l.after}
            </span>
          </div>
        ))}
        <div className="cursor">
          &gt;
          <span className="blk" />
        </div>
      </div>
    </section>
  );
}
