import { work } from "@/lib/site";

export function Work() {
  return (
    <section className="bay" id="work">
      <div className="wide">
        <div className="sect-head">
          <p className="eyebrow">{work.eyebrow}</p>
          <h2 className="sect-h">{work.headline}</h2>
        </div>

        <div className="work-list">
          {work.items.map((w) => (
            <a
              className="work-item"
              key={w.num}
              href={w.href}
              target="_blank"
              rel="noreferrer"
            >
              <div className="work-num">{w.num}</div>

              <div className="work-body">
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

              <div className="work-status">
                <span className="pill" data-kind={w.status.kind}>
                  <i aria-hidden="true" />
                  {w.status.label}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
