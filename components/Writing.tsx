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
        <div className="sect-head" data-rule-glow>
          <p className="eyebrow">
            <span className="idx">{writing.index}</span>
            {writing.eyebrow}
          </p>
          <h2 className="sect-h">{writing.headline}</h2>
          <p className="sect-deck">{writing.deck}</p>
        </div>

        <div className="rows writing-list">
          {posts.map((post, index) => (
            <a
              className={`row row-post${index === 0 ? " row-post-featured" : ""}`}
              key={post.href}
              href={post.href}
              target="_blank"
              rel="noreferrer"
            >
              <span className="num">{post.num}</span>
              <div className="post-copy">
                {index === 0 ? <span className="post-featured-label">Latest feature</span> : null}
                <h3>
                  {post.title}
                  {"\u00A0"}
                  <ArrowIcon />
                </h3>
              </div>
              <span className="meta">
                <span className="post-kind">{post.kind}</span>
                <span>{post.date}</span>
              </span>
            </a>
          ))}
        </div>

        <a className="more" href={writing.more.href} target="_blank" rel="noreferrer">
          {writing.more.label}
          {"\u00A0"}
          <ArrowIcon />
        </a>
      </div>
    </section>
  );
}
