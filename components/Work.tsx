import type { CSSProperties } from "react";
import { work } from "@/lib/site";
import { StarMark } from "./StarMark";
import { ArrowIcon } from "./ArrowIcon";

export function Work() {
  return (
    <section className="bay" id="work">
      <div className="wide">
        <div className="sect-head" data-reveal>
          <p className="eyebrow">
            <span className="idx">{work.index}</span>
            {work.eyebrow}
          </p>
          <h2 className="sect-h" data-glow>{work.headline}</h2>
        </div>

        <div className="rows">
          {work.items.map((w, i) => (
            <a
              className="row row-work"
              key={w.num}
              data-reveal
              style={{ "--i": i } as CSSProperties}
              href={w.href}
              target="_blank"
              rel="noreferrer"
            >
              {/* ordinal + status share the left rail so the metadata reads
                  as one unit instead of straddling the row */}
              <div className="row-meta">
                <span className="num">{w.num}</span>
                {/* The marker's motion states what the status means: open
                    turns, running steps, live pulses. */}
                <span className="status" data-kind={w.status.kind}>
                  <StarMark size={9} />
                  {w.status.label}
                </span>
              </div>

              <div>
                {/* \u00A0 before the icon: a non-breaking space glues it to
                    the last word, so it can never wrap onto a line alone. */}
                <h3>
                  {w.title}
                  {"\u00A0"}
                  <ArrowIcon />
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
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
