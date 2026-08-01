import type { CSSProperties } from "react";
import { getLedger } from "@/lib/site";

/**
 * Four figures beside the hero.
 *
 * The hero's right half was empty at every width above the stacking point —
 * the deck measured 605px inside an 1180px rail — while the page's only proof
 * sat below three scrolls of prose. This puts the numbers next to the claim
 * they support, and costs no vertical space to do it.
 *
 * Tabular figures, because four values in a column that do not share a digit
 * width read as four unrelated facts rather than one ledger.
 */
export function Ledger() {
  // Server component, so the derived years figure resolves at build and on
  // each hourly revalidation rather than against a visitor's clock.
  const ledger = getLedger();

  return (
    <dl className="ledger" aria-label="By the numbers">
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
  );
}
