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
        <div className="sect-head" data-rule-glow>
          <p className="eyebrow">
            <span className="idx">{loop.index}</span>
            {loop.eyebrow}
          </p>
          <h2 className="sect-h">{loop.headline}</h2>
          <p className="sect-deck">{loop.deck}</p>
        </div>

        <div className="loop-flow" aria-hidden="true">
          {loop.steps.map((step, index) => (
            <div className="loop-flow-item" key={step.num}>
              <span className="loop-flow-stage">{step.name}</span>
              {index < loop.steps.length - 1 ? <span className="loop-flow-arrow">→</span> : null}
            </div>
          ))}
        </div>

        <ol className="loop">
          {loop.steps.map((step) => (
            <li className="step" key={step.num}>
              <span className="step-num" aria-hidden="true">{step.num}</span>
              <div className="step-body">
                <h3 className="step-head">
                  <span className="step-name">{step.name}</span>
                  <span className="step-tier">{step.tier}</span>
                </h3>
                <p className="step-desc">{step.desc}</p>
                <p className="step-guard">{step.guard}</p>
              </div>
            </li>
          ))}
        </ol>

        <p className="loop-close">{loop.close}</p>
      </div>
    </section>
  );
}
