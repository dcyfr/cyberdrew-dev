import { envelope } from "@/lib/site";

export function Envelope() {
  return (
    <section className="bay" id="envelope">
      <div className="wide">
        <div className="sect-head">
          <p className="eyebrow">{envelope.eyebrow}</p>
          <h2 className="sect-h">{envelope.headline}</h2>
          <p className="sect-deck">{envelope.deck}</p>
        </div>

        {/* The log is the interface: tabular rows, accent on the value only. */}
        <div className="guards">
          {envelope.guards.map((g) => (
            <div className="datarow" key={g.name}>
              <div className="datarow-n">{g.name}</div>
              <div className="datarow-v">{g.value}</div>
              <div className="datarow-d">{g.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
