import type { CSSProperties } from "react";
import { eclipse, getLedger, hero } from "@/lib/site";
import {
  HeroActions,
  HeroCredentials,
  HeroEyebrow,
  HeroPortrait,
  HeroRoles,
} from "./parts";

/**
 * D · SPLIT — one hard vertical division, and a face at real scale.
 *
 * The current hero has two columns but no division: the right side floats,
 * carrying a portrait at 112px and four figures, and reads as leftovers. This
 * variant commits to the split instead of apologising for it — a full-height
 * rule down the middle, type on one side and the person on the other, at a size
 * that makes the photograph a subject rather than an avatar.
 *
 * The reason to want it: this is the only variant where a visitor sees a human
 * being at the top of the page. Everything else here argues that autonomy is
 * safe because of controls; a face argues that someone is accountable for them,
 * which is a different and complementary claim. The eclipse caption sits under
 * the portrait for the same reason it works further down the page — it says why
 * the picture is there rather than what is in it.
 *
 * The cost, and it is real: at 240px the portrait is now the loudest object
 * above the fold, competing with the headline for first read. Pick this one
 * only if that trade is wanted.
 */
export function HeroSplit({ id = "top" }: { id?: string } = {}) {
  const ledger = getLedger();

  return (
    <section className="hero hero-split" id={id}>
      <div className="wide">
        <div className="split">
          <div className="split-say">
            <HeroEyebrow />

            <h1 data-rule-glow>
              {hero.headline.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </h1>

            <p className="hero-deck">{hero.deck}</p>

            <HeroActions />

            <HeroRoles />
            <HeroCredentials />
          </div>

          <div className="split-face">
            <figure className="split-fig">
              <HeroPortrait size={240} className="portrait-lg" />
              <figcaption className="split-cap">{eclipse.caption}</figcaption>
            </figure>

            {/* Two up under the face, against the rule. The figures are the
                caption to the person: this is what the accountable party is
                accountable for. */}
            <dl className="split-ledger" aria-label="By the numbers">
              {ledger.map((s, i) => (
                <div className="ledger-row" key={s.label} data-reveal style={{ "--i": i } as CSSProperties}>
                  <dt className="ledger-val">
                    {s.value}
                    {s.unit ? <span className="ledger-unit">{s.unit}</span> : null}
                  </dt>
                  <dd className="ledger-label">{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
