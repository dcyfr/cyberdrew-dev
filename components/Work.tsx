import { work } from "@/lib/site";

export function Work() {
  return (
    <section className="bay" id="work">
      <div className="wide">
        <div className="sect-head">
          <p className="eyebrow">{work.eyebrow}</p>
          <h2 className="sect-h">{work.headline}</h2>
        </div>

        <div className="rows">
          {work.items.map((w) => (
            <a
              className="row row-work"
              key={w.num}
              href={w.href}
              target="_blank"
              rel="noreferrer"
            >
              <span className="num">{w.num}</span>

              <div>
                <h3>
                  {w.title}
                  <span className="arrow" aria-hidden="true">
                    ↗
                  </span>
                </h3>
                <p>{w.desc}</p>
                <div className="tags">
                  {w.tags.map((t) => (
                    <span className="tag" key={t}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <span className="status">
                <i aria-hidden="true" />
                {w.status}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
