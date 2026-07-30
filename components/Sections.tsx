import {
  capabilities,
  constraints,
  footerNav,
  offer,
  socialLinks,
  ventures,
  work,
  writing,
} from "@/lib/content";

const ext = (external?: boolean) =>
  external ? { target: "_blank" as const, rel: "noopener noreferrer" } : {};

// Constraint strip. These are guarantees, not features — the reason the
// autonomy is safe to run at all.
export function Marquee() {
  const run = [...constraints, ...constraints];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="track">
        {run.map((c, i) => (
          <span key={`${c}-${i}`}>{c}</span>
        ))}
      </div>
    </div>
  );
}

export function Fleet() {
  return (
    <section className="block reveal" id="fleet">
      <div className="wrap">
        <div className="sec-head center">
          <p className="eyebrow">The fleet</p>
          <h2>A system that runs itself, on rails you can see.</h2>
          <p className="lede">
            Every number below is a constraint I chose and enforce in code — not a benchmark.
            Autonomy is only useful if you can say exactly where it stops.
          </p>
        </div>
        <div className="bento">
          {capabilities.map((c) => (
            <div className={`bcard ${c.span}`} key={c.title}>
              <span className="bnum">{c.num}</span>
              <h3>{c.title}</h3>
              <p>{c.desc}</p>
              <span className="state">
                <span className="dot" aria-hidden="true" />
                {c.state}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Work() {
  return (
    <section className="block reveal" id="work">
      <div className="wrap">
        <div className="sec-head">
          <p className="eyebrow">Selected work</p>
          <h2>Systems that run themselves.</h2>
          <p className="lede">
            Not a stack of frameworks — the autonomous machinery I&apos;ve built, shipped, and keep
            running.
          </p>
        </div>
        <div className="steps">
          {work.map((w) => (
            <div className="step" key={w.num}>
              <span className="num">{w.num}</span>
              <div className="body">
                <h3>
                  <a href={w.href} {...ext(w.external)}>
                    {w.title}
                  </a>
                </h3>
                <p>{w.desc}</p>
                <div className="tags">
                  {w.tags.map((t) => (
                    <span className={t.hot ? "tag hot" : "tag"} key={t.label}>
                      {t.label}
                    </span>
                  ))}
                </div>
              </div>
              <span className={`status ${w.status.kind}`}>
                <span className="dot" aria-hidden="true" />
                {w.status.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Ventures() {
  return (
    <section className="block reveal">
      <div className="wrap">
        <div className="sec-head">
          <p className="eyebrow">Ventures</p>
          <h2>What I lead</h2>
        </div>
        <div className="grid two">
          {ventures.map((v) => (
            <a
              className="vcard"
              key={v.title}
              href={v.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="kicker">{v.kicker}</span>
              <h3>
                {v.title} <span className="arw">↗</span>
              </h3>
              <p>{v.desc}</p>
              <div className="tags">
                {v.tags.map((t) => (
                  <span className="tag" key={t}>
                    {t}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Writing() {
  return (
    <section className="block reveal" id="writing">
      <div className="wrap">
        <div className="sec-head">
          <p className="eyebrow">Writing &amp; garden</p>
          <h2>Field notes from the frontier.</h2>
          <p className="lede">
            Essays when they&apos;re finished; a digital garden of evergreen notes while
            they&apos;re still growing.
          </p>
        </div>
        <div className="feed">
          {writing.map((p) => (
            <a key={p.num} href={p.href} {...ext(p.href.startsWith("http"))}>
              <span className="num">{p.num}</span>
              <span className="ttl">{p.title}</span>
              <span className="meta">{p.meta}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Offer() {
  return (
    <section className="block reveal" id="work-with-me">
      <div className="wrap">
        <div className="sec-head">
          <p className="eyebrow">{offer.eyebrow}</p>
          <h2>{offer.headline}</h2>
          <p className="lede">{offer.pitch}</p>
        </div>
        <div className="omodels">
          {offer.models.map((m, i) => (
            <div className="omodel" key={m.title}>
              <span className="oi" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3>{m.title}</h3>
              <p>{m.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Now() {
  return (
    <section className="block reveal">
      <div className="wrap">
        <div className="sec-head">
          <p className="eyebrow">Now · last synced Jul 2026</p>
          <h2>Current focus</h2>
        </div>
        <div className="now">
          <div className="nowrow">
            <span className="k">Planning</span>
            <p>
              <b>Teaching the fleet to plan.</b> Multi-step missions the agents decompose, execute,
              and grade themselves — with me out of the loop.
            </p>
          </div>
          <div className="nowrow">
            <span className="k">Trust</span>
            <p>
              <b>Raising the trust ceiling.</b> Hardening the safety model so agents can take
              higher-stakes actions without a human gate on every step.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Connect() {
  return (
    <section className="closing reveal" id="connect">
      <div className="field" aria-hidden="true" />
      <div className="fieldgrain" aria-hidden="true" />
      <div className="wrap">
        <h2>
          Let&apos;s build something <em>autonomous</em> and hard to break.
        </h2>
        <p className="frame">
          20 minutes, no pitch — tell me what you&apos;re trying to automate, and I&apos;ll tell you
          if it&apos;s safe to.
        </p>
        <div className="links">
          {socialLinks.map((l) => (
            <a className="lnk" key={l.label} href={l.href} {...ext(l.external)}>
              {l.label} <span className="h">↗</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="fgrid">
          <div className="fbrand">
            <span className="brand">
              <span className="mark" aria-hidden="true" />
              cyberdrew<span className="tld">.dev</span>
            </span>
            <p>
              Autonomy engineer at the agentic frontier. Building AI that reasons, acts, and runs
              itself — safely.
            </p>
          </div>
          {footerNav.map((col) => (
            <div className="fcol" key={col.heading}>
              <h4>{col.heading}</h4>
              <ul>
                {col.items.map((it) => (
                  <li key={it.label}>
                    <a href={it.href} {...ext("external" in it ? it.external : undefined)}>
                      {it.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="frow">
          <span>© 2026 Drew (dcyfr)</span>
          <span className="accent">think freely · build securely · ship boldly</span>
          <span className="spacer" />
          <span>built agentically</span>
        </div>
      </div>
    </footer>
  );
}
