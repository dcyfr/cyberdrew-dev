import type { CSSProperties } from "react";
import { guardrails } from "@/lib/site";

/**
 * The proof section, and the answer to the second half of the headline —
 * "Rails that hold". Work covers "agents that act"; without this the page made
 * the guardrail claim once in the hero deck and never returned to it.
 *
 * Deliberately not cards. Each control is a hairline row carrying a name, a
 * hard value, and one sentence — the same shape as a log line, because the
 * argument is that these are numbers somebody could go and check, not
 * features. The value is the emphasis, so it gets the mono face and the ink.
 */
export function Guardrails() {
  return (
    <section className="bay" id="guardrails">
      <div className="wide">
        <div className="sect-head" data-reveal>
          <p className="eyebrow">
            <span className="idx">{guardrails.index}</span>
            {guardrails.eyebrow}
          </p>
          <h2 className="sect-h" data-glow>{guardrails.headline}</h2>
          <p className="sect-deck">{guardrails.deck}</p>
        </div>

        <dl className="guards">
          {guardrails.items.map((g, i) => (
            <div
              className="guard"
              key={g.name}
              data-reveal
              style={{ "--i": i } as CSSProperties}
            >
              <dt className="guard-head">
                <span className="guard-name">{g.name}</span>
                <span className="guard-val">{g.value}</span>
              </dt>
              <dd className="guard-desc">{g.desc}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
