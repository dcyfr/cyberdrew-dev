import type { CSSProperties } from "react";
import { writing } from "@/lib/site";
import { getFeaturedPosts } from "@/lib/feed";
import { ArrowIcon } from "./ArrowIcon";

// Server component: the feed is read at build and revalidated hourly, so the
// list costs the visitor nothing and dcyfr.ai's `featured:` flags decide what
// appears here. getFeaturedPosts never throws — it falls back to the snapshot
// in lib/site.ts — so this section renders either way.
export async function Writing() {
  const posts = await getFeaturedPosts();

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
          {posts.map((p, i) => (
            <a
              className="row row-post"
              key={p.href}
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
