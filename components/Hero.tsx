"use client";

import { useEffect, useRef, useState } from "react";
import Console from "@/components/Console";
import { person } from "@/lib/content";
import { usePrefersReducedMotion } from "@/lib/hooks";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&*/<>_01".split("");

// Scramble-in "decrypt" reveal for a single word. SSR renders the final text
// (good for SEO); the scramble only runs client-side when motion is allowed.
function useDecrypt(final: string, enabled: boolean) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;
    // Lock the box to the final word's width so scrambling glyphs can't reflow
    // the surrounding <h1> — kills the load-in jitter.
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
        out +=
          frame > settle + Math.random() * 6
            ? final[i]
            : GLYPHS[(Math.random() * GLYPHS.length) | 0];
      }
      el.textContent = out;
      if (frame >= total) {
        clearInterval(id);
        el.textContent = final;
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
  const [booted, setBooted] = useState(false);
  const glitchRef = useDecrypt("systems", !reduce);

  useEffect(() => {
    const id = setTimeout(() => setBooted(true), reduce ? 0 : 1100);
    return () => clearTimeout(id);
  }, [reduce]);

  return (
    <header className="hero">
      {/* One dramatic field per view — cel bands, a slow bloom, grain, and a
          scrim that is effectively solid through the entire text zone so hero
          contrast is measurable rather than a function of what sits behind. */}
      <div className="hero-field" aria-hidden="true">
        <div className="bands" />
        <div className="bloom" />
        <div className="fieldgrain" />
        <div className="scrim" />
      </div>

      <div className="wrap hero-inner">
        <p className="boot">
          <span className="pulse" aria-hidden="true" />
          {booted ? (
            <>
              <span className="ok">online</span> · 30+ agents · nominal
            </>
          ) : (
            <>initializing agent.fleet …</>
          )}
        </p>

        <h1 aria-label="I build the systems that build.">
          I build the{" "}
          <span className="glitch" ref={glitchRef}>
            systems
          </span>{" "}
          that build.
        </h1>

        <p className="lede">
          <span className="diff">Not web apps — autonomous agents.</span>{" "}
          I&apos;m a security architect who builds AI that can actually take actions: a governed
          fleet that researches,
          reviews code, and self-heals on a local-first stack, with the sandboxes, kill-switches and
          spend gates that let it run unsupervised.{" "}
          <b>Autonomy you can trust, because I built it to be trusted.</b>
        </p>

        <p className="creds">
          Founder @ DCYFR Labs · Head of AI @ GameShark Labs · 6+ yrs security architecture ·{" "}
          <b>@dcyfr/ai</b> on npm
        </p>

        <div className="cta-row">
          <a className="btn primary" href={person.cal} target="_blank" rel="noopener noreferrer">
            Book a 1:1 <span className="arw">→</span>
          </a>
          <a className="btn" href="#fleet">
            See the fleet
          </a>
          <a className="btn ghost" href={`mailto:${person.email}`}>
            {person.email}
          </a>
        </div>

        <Console />
      </div>
    </header>
  );
}
