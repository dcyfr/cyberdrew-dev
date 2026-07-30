import { writing } from "@/lib/site";

export function Writing() {
  return (
    <section className="bay" id="writing">
      <div className="wide">
        <div className="sect-head">
          <p className="eyebrow">{writing.eyebrow}</p>
          <h2 className="sect-h">{writing.headline}</h2>
        </div>

        <div className="rows">
          {writing.posts.map((p) => (
            <a
              className="row row-post"
              key={p.num}
              href={p.href}
              target="_blank"
              rel="noreferrer"
            >
              <span className="num">{p.num}</span>
              <h3>
                {p.title}
                <span className="arrow" aria-hidden="true">
                  ↗
                </span>
              </h3>
              <span className="meta">
                {p.kind} · {p.date}
              </span>
            </a>
          ))}
        </div>

        <a className="more" href={writing.more.href} target="_blank" rel="noreferrer">
          {writing.more.label} ↗
        </a>
      </div>
    </section>
  );
}
