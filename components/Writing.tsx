import type { CSSProperties } from "react";
import { writing } from "@/lib/site";
import { ArrowIcon } from "./ArrowIcon";

export function Writing() {
  return (
    <section className="bay" id="writing">
      <div className="wide">
        <div className="sect-head" data-reveal>
          <p className="eyebrow">
            <span className="idx">{writing.index}</span>
            {writing.eyebrow}
          </p>
          <h2 className="sect-h" data-glow>{writing.headline}</h2>
        </div>

        <div className="rows">
          {writing.posts.map((p, i) => (
            <a
              className="row row-post"
              key={p.num}
              data-reveal
              style={{ "--i": i } as CSSProperties}
              href={p.href}
              target="_blank"
              rel="noreferrer"
            >
              <span className="num">{p.num}</span>
              <h3>
                {p.title}
                {"\u00A0"}
                <ArrowIcon />
              </h3>
              <span className="meta">
                {p.kind} · {p.date}
              </span>
            </a>
          ))}
        </div>

        <a className="more" data-reveal href={writing.more.href} target="_blank" rel="noreferrer">
          {writing.more.label}
          {"\u00A0"}
          <ArrowIcon />
        </a>
      </div>
    </section>
  );
}
