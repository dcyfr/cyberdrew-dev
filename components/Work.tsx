import { work } from "@/lib/site";
import { StarMark } from "./StarMark";
import { ArrowIcon } from "./ArrowIcon";

export function Work() {
  return (
    <section className="bay" id="work">
      <div className="wide">
        <div className="sect-head" data-rule-glow>
          <p className="eyebrow">
            <span className="idx">{work.index}</span>
            {work.eyebrow}
          </p>
          <h2 className="sect-h">{work.headline}</h2>
          <p className="sect-deck">{work.deck}</p>
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
              <div className="row-meta case-meta">
                <span className="num">{w.num}</span>
                <span className="status" data-kind={w.status.kind}>
                  <StarMark size={9} />
                  {w.status.label}
                </span>
              </div>

              <div className="case-body">
                <h3>
                  {w.title}
                  {"\u00A0"}
                  <ArrowIcon />
                </h3>
                <p className="case-desc">{w.desc}</p>
                <div className="case-outcome">
                  <span className="case-label">Outcome</span>
                  <p>{w.outcome}</p>
                </div>
                <div className="tags">
                  {w.tags.map((tag) => (
                    <span className="tag" key={tag}>{tag}</span>
                  ))}
                </div>
                <span className="case-proof">
                  {w.proofLabel}
                  <ArrowIcon />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
