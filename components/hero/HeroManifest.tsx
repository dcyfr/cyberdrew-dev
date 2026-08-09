import { getLedger, hero, person } from "@/lib/site";
import { HeroActions, HeroCredentials, HeroEyebrow, HeroPortrait, HeroRoles } from "./parts";

/**
 * C · MANIFEST — a spec sheet, and then the claim it belongs to.
 *
 * The inversion this variant is built on: everywhere else the marketing copy is
 * the subject and the machine text is a caption. Here the left rail is a real
 * document header — keyed rows, mono, fixed width — and the headline is what
 * that header is ABOUT. It is the only variant where the page's own idiom (the
 * numbered index, the tabular figures, the hairline) is running the layout
 * instead of decorating it.
 *
 * That makes it the coldest of the four, and the most specific. It is the right
 * pick if the visitor being courted is an engineer who will trust a spec before
 * they trust a sentence — and the wrong one if the page has to work on someone
 * who is not going to read the left column at all.
 *
 * The figures are keyed 01–04 to match the section indices the rest of the page
 * already uses, so the rail is addressed the same way §Work and §Guardrails are.
 */
export function HeroManifest({ id = "top" }: { id?: string } = {}) {
  const ledger = getLedger();

  return (
    <section className="hero hero-manifest" id={id}>
      <div className="wide">
        <div className="manifest">
          {/* The rail. A header block in the documentary sense: what this is,
              who issued it, and the figures it certifies. */}
          <aside className="manifest-rail">
            <div className="manifest-id">
              <HeroPortrait size={64} className="portrait-sm" />
              <p className="manifest-name">
                {person.name}
                <span className="manifest-callsign">{person.callsign}</span>
              </p>
            </div>

            {/* Two lit edges, in two different columns, off one pointer: the
                spec's top rule and the gap under the headline. They are far
                enough apart to read as one light crossing the layout rather
                than as two effects competing. */}
            <dl className="manifest-spec" aria-label="By the numbers" data-rule-glow>
              {ledger.map((s, i) => (
                <div className="manifest-row" key={s.label}>
                  <span className="manifest-idx" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <dt className="manifest-key">{s.label}</dt>
                  <dd className="manifest-val">
                    {s.value}
                    {s.unit ? <span className="ledger-unit">{s.unit}</span> : null}
                  </dd>
                </div>
              ))}
            </dl>
          </aside>

          <div className="manifest-say">
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
        </div>
      </div>
    </section>
  );
}
