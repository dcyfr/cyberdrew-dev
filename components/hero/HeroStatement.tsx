import type { CSSProperties } from "react";
import { getLedger, hero } from "@/lib/site";
import {
  HeroActions,
  HeroCredentials,
  HeroEyebrow,
  HeroPortrait,
  HeroRoles,
} from "./parts";

/**
 * A · STATEMENT — one column, and a band of figures under it.
 *
 * The argument against the two-column hero: a headline that stops at 60% of the
 * rail is not a statement, it is a column of a magazine. This gives the claim
 * the whole width and nothing to share it with, which is the only arrangement
 * where "Agents that act / Rails that hold" lands as a thing being asserted
 * rather than a heading over some content.
 *
 * The proof does not disappear, it moves under the fold line of the hero and
 * becomes a RULED BAND: four figures in a row, divided by hairlines, sitting on
 * the one horizontal rule in the hero. That rule is what takes the travelling
 * light — so the lit edge here is real structure the layout needed anyway,
 * rather than a hairline invented to have something to light.
 *
 * The portrait drops to byline scale and sits with the roles, because in this
 * arrangement the face is attribution, not subject. Whose claim is this.
 */
export function HeroStatement({ id = "top" }: { id?: string } = {}) {
  const ledger = getLedger();

  return (
    <section className="hero hero-statement" id={id}>
      <div className="wide">
        <HeroEyebrow />

        {/* No lit edge on the headline here: the band below already has one,
            and it is a REAL rule. Two lights within 400px of each other both
            fire on the same pointer and read as a glitch rather than a source. */}
        <h1>
          {hero.headline.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </h1>

        <p className="hero-deck">{hero.deck}</p>

        <HeroActions />

        {/* Byline: the face at the size of the type it sits with, so it reads
            as a signature on the claim rather than as a portrait. */}
        <div className="hero-byline">
          <HeroPortrait size={56} className="portrait-sm" />
          <div className="hero-byline-say">
            <HeroRoles />
            <HeroCredentials />
          </div>
        </div>

        {/* The one rule in this hero, and the thing the light runs along. */}
        <dl className="hero-band" aria-label="By the numbers" data-rule-glow>
          {ledger.map((s, i) => (
            <div className="hero-band-cell" key={s.label} data-reveal style={{ "--i": i } as CSSProperties}>
              <dt className="ledger-val">
                {s.value}
                {s.unit ? <span className="ledger-unit">{s.unit}</span> : null}
              </dt>
              <dd className="ledger-label">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
