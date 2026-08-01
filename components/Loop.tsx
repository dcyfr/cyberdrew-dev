import type { CSSProperties } from "react";
import { loop } from "@/lib/site";

/**
 * How the fleet runs when nobody is watching.
 *
 * An ordered spine rather than the pinned dial the first version used: the
 * sequence is the whole point, and a sticky centrepiece is a lot of machinery
 * to say "these happen in order". The rule running down the ordinals is what
 * carries the sequence, and the closing line is what makes it a loop instead
 * of a list.
 *
 * Each step names its own stop condition, which is the handoff into the
 * guardrails section below — those are the same controls, stated as values
 * rather than in prose.
 */
export function Loop() {
  return (
    <section className="bay" id="loop">
      <div className="wide">
        <div className="sect-head" data-reveal>
          <p className="eyebrow">
            <span className="idx">{loop.index}</span>
            {loop.eyebrow}
          </p>
          <h2 className="sect-h" data-glow>{loop.headline}</h2>
          <p className="sect-deck">{loop.deck}</p>
        </div>

        <ol className="loop">
          {loop.steps.map((s, i) => (
            <li className="step" key={s.num} data-reveal style={{ "--i": i } as CSSProperties}>
              <span className="step-num" aria-hidden="true">{s.num}</span>
              <div className="step-body">
                <h3 className="step-head">
                  <span className="step-name">{s.name}</span>
                  <span className="step-tier">{s.tier}</span>
                </h3>
                <p className="step-desc">{s.desc}</p>
                {/* The guard is the load-bearing half: any of these five can
                    be described as "it does a thing", and the interesting
                    claim is what happens when it does the wrong thing. */}
                <p className="step-guard">{s.guard}</p>
              </div>
            </li>
          ))}
        </ol>

        <p className="loop-close" data-reveal>{loop.close}</p>
      </div>
    </section>
  );
}
