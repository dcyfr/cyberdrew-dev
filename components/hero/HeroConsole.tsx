import { getLedger, hero } from "@/lib/site";
import {
  HeroActions,
  HeroCredentials,
  HeroEyebrow,
  HeroPortrait,
  HeroRoles,
} from "./parts";

/**
 * B · CONSOLE — the hero as an instrument, inside the page's own glass.
 *
 * Every other floating object on this page is a panel: the dock, the cards, the
 * contact slab. The hero was the one thing sitting directly on the ground, and
 * on a page whose subject is a system you watch and can stop, the opening
 * screen arguably ought to be the readout.
 *
 * So it takes the same glass, and it takes the RING — the border light the
 * contact slab wears — which makes the first and last things on the page the
 * same object, lit the same way. That is the strongest version of the site's
 * one visual idea, and the reason to pick this variant over the others.
 *
 * The figures are a readout, not a stat block: label left, value right, one
 * hairline between rows. A row of four big numerals says "marketing"; a
 * right-aligned column of values says "this is the current state of something".
 */
export function HeroConsole({ id = "top" }: { id?: string } = {}) {
  const ledger = getLedger();

  return (
    <section className="hero hero-console" id={id}>
      <div className="wide">
        <div className="console" data-ring-glow>
          <div className="console-body">
            <div className="console-say">
              <HeroEyebrow />

              <h1>
                {hero.headline.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </h1>

              <p className="hero-deck">{hero.deck}</p>

              <HeroActions />
            </div>

            {/* The instrument column. Ruled off the statement rather than
                floating beside it, so the panel reads as two compartments of
                one device. */}
            <div className="console-inst">
              <div className="console-id">
                <HeroPortrait size={72} className="portrait-sm" />
                {/* The live dot is the fleet's own state, said once, quietly.
                    It is decorative here — the "continuous" figure below is
                    the claim, and this is only its indicator. */}
                <p className="console-live" aria-hidden="true">
                  <span className="console-dot" />
                  running
                </p>
              </div>

              <dl className="console-read" aria-label="By the numbers">
                {ledger.map((s) => (
                  <div className="console-row" key={s.label}>
                    <dt className="console-key">{s.label}</dt>
                    <dd className="console-value">
                      {s.value}
                      {s.unit ? <span className="ledger-unit">{s.unit}</span> : null}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          {/* Footer bar of the panel: who, and what backs it. Inside the glass
              because they are part of the readout, under a rule because they
              are a different kind of fact from the figures above. */}
          <div className="console-foot">
            <HeroRoles />
            <HeroCredentials />
          </div>
        </div>
      </div>
    </section>
  );
}
