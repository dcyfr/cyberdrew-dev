import { offer } from "@/lib/site";

export function Offer() {
  return (
    <section className="bay" id="work-with-me">
      <div className="wide">
        <div className="sect-head">
          <p className="eyebrow">{offer.eyebrow}</p>
          <h2 className="sect-h">{offer.headline}</h2>
          <p className="sect-deck">{offer.deck}</p>
        </div>

        <div className="offer-grid">
          {offer.models.map((m) => (
            <div className="offer-card" key={m.num}>
              <span className="n">{m.num}</span>
              <h3>{m.title}</h3>
              <p>{m.desc}</p>
              <p className="offer-fit">{m.fit}</p>
            </div>
          ))}
        </div>

        <div className="offer-cta">
          <a className="btn btn-primary" href={offer.cta.href} target="_blank" rel="noreferrer">
            {offer.cta.label}
          </a>
          <span className="alt">
            <a href={offer.alt.href}>{offer.alt.label}</a>
          </span>
        </div>
      </div>
    </section>
  );
}
