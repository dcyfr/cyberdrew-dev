"use client";

import { useEffect, useRef, useState } from "react";
import { person } from "@/lib/content";
import { usePrefersReducedMotion, useUptime } from "@/lib/hooks";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&*/<>_01".split("");

// Scramble-in "decrypt" reveal for a single word. SSR renders the final text
// (good for SEO); the scramble only runs client-side when motion is allowed.
function useDecrypt(final: string, enabled: boolean) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;
    // Lock the box to the final word's width so scrambling proportional serif
    // glyphs can't reflow the surrounding <h1> — kills the load-in jitter.
    el.style.width = `${el.getBoundingClientRect().width}px`;
    el.style.textAlign = "center";
    el.style.whiteSpace = "nowrap";
    el.style.overflow = "hidden";
    let frame = 0;
    const total = 28;
    const id = setInterval(() => {
      frame++;
      let out = "";
      for (let i = 0; i < final.length; i++) {
        if (final[i] === " ") {
          out += " ";
          continue;
        }
        const settle = (i / final.length) * total * 0.8;
        out += frame > settle + Math.random() * 6 ? final[i] : GLYPHS[(Math.random() * GLYPHS.length) | 0];
      }
      el.textContent = out;
      if (frame >= total) {
        clearInterval(id);
        el.textContent = final;
        // release the lock — natural width now equals the locked width, no shift
        el.style.width = "";
        el.style.overflow = "";
        el.style.whiteSpace = "";
        el.style.textAlign = "";
      }
    }, 42);
    return () => clearInterval(id);
  }, [final, enabled]);
  return ref;
}

export default function Hero() {
  const reduce = usePrefersReducedMotion();
  const uptime = useUptime();
  const [booted, setBooted] = useState(false);
  const glitchRef = useDecrypt("systems", !reduce);

  useEffect(() => {
    const id = setTimeout(() => setBooted(true), reduce ? 0 : 1100);
    return () => clearTimeout(id);
  }, [reduce]);

  return (
    <header className="hero">
      <div>
        <div className="boot">
          <span className="cur">&gt;</span> initializing <span className="cur">agent.fleet</span> …{" "}
          {booted && <span className="ok">● online · 30+ agents · nominal</span>}
          {!booted && <span className="caret" />}
        </div>
        <p className="eyebrow">{person.eyebrow}</p>
        <h1 className="serif" aria-label="I build the systems that build.">

          I build the{" "}
          <span className="glitch" ref={glitchRef}>
            systems
          </span>{" "}
          that build.
        </h1>
        <p className="lede">
          <span className="diff">Not web apps — autonomous agents.</span> I build AI that reasons, takes
          action, and runs itself: a governed fleet that researches, writes code, monitors, and
          self-heals — 24/7, on a local-first model stack, while I sleep.
        </p>
        <p className="roles">
          <b>Founder</b> @ DCYFR Labs &nbsp;·&nbsp; <b>Head of AI</b> @ GameShark Labs &nbsp;·&nbsp; remote
        </p>
        <div className="cta-row">
          <a className="btn primary" href={person.cal} target="_blank" rel="noopener noreferrer">
            Book a 1:1 <span className="arw">→</span>
          </a>
          <a className="btn" href="#work">
            See the work
          </a>
          <a className="btn" href={`mailto:${person.email}`}>
            {person.email}
          </a>
        </div>
      </div>

      <aside className="instrument" aria-label="operator status">
        <div className="bar">
          <span className="led" /> operator.status <span className="tag">◇ online</span>
        </div>
        <div className="rows">
          <div className="irow">
            <span className="k">callsign</span>
            <span className="v">{person.handle}</span>
          </div>
          <div className="irow">
            <span className="k">agents live</span>
            <span className="v">
              <span className="mini live" /> 30+ · shipping
            </span>
          </div>
          <div className="irow">
            <span className="k">inference</span>
            <span className="v">
              <span className="mini on" /> local-first
            </span>
          </div>
          <div className="irow">
            <span className="k">spend gate</span>
            <span className="v">$100/mo · enforced</span>
          </div>
          <div className="irow">
            <span className="k">load</span>
            <span className="v">
              <span className="load">
                <i />
                <i />
                <i />
                <i />
                <i />
              </span>
            </span>
          </div>
          <div className="irow">
            <span className="k">uptime</span>
            <span className="v">{uptime}</span>
          </div>
        </div>
      </aside>
    </header>
  );
}
