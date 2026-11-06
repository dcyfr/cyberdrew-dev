import { credentials, getLedger, trust } from "@/lib/site";

export function Trust() {
  const ledger = getLedger();

  return (
    <section className="bay" id="trust">
      <div className="wide">
        <div className="sect-head" data-rule-glow>
          <p className="eyebrow">
            <span className="idx">{trust.index}</span>
            {trust.eyebrow}
          </p>
          <h2 className="sect-h">{trust.headline}</h2>
          <p className="sect-deck">{trust.deck}</p>
        </div>

        <dl className="trust-metrics" aria-label="Operating context">
          {ledger.map((stat) => (
            <div className="trust-metric" key={stat.label}>
              <dt className="trust-value">
                {stat.value}
                {stat.unit ? <span className="ledger-unit">{stat.unit}</span> : null}
              </dt>
              <dd className="trust-label">{stat.label}</dd>
            </div>
          ))}
        </dl>

        <div className="trust-credentials">
          <div className="trust-credentials-intro">
            <p className="eyebrow">Verified credentials</p>
            <h3>Security architecture and operations</h3>
          </div>
          <ul className="credential-list">
            {credentials.items.map((credential) => (
              <li className="credential-item" key={credential.abbr}>
                <span className="credential-abbr">{credential.abbr}</span>
                <span className="credential-name">{credential.name}</span>
                <span className="credential-issuer">{credential.issuer}</span>
              </li>
            ))}
          </ul>
          <a className="more" href={credentials.href} target="_blank" rel="noreferrer">
            {credentials.more}
          </a>
        </div>
      </div>
    </section>
  );
}
