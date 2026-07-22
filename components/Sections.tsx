import { socialLinks, ventures, work, writing } from "@/lib/content";

const ext = (external?: boolean) =>
  external ? { target: "_blank" as const, rel: "noopener noreferrer" } : {};

export function Statement() {
  return (
    <section className="statement reveal">
      <p>I build autonomous AI systems that operate the same tools people do.</p>
      <p className="sub">
        They reason, take action, and run entire workflows — research, code, ops — for hours or months,
        so I ship outcomes, not keystrokes.
      </p>
      <p className="closer">
        Chat answers. Agents act. <b>I operate the fleet.</b>
      </p>
    </section>
  );
}

export function Work() {
  return (
    <section className="block reveal" id="work">
      <div className="sec-head">
        <p className="eyebrow">Selected work</p>
        <h2 className="serif">Systems that run themselves.</h2>
        <p className="lede">
          Not a stack of frameworks — the autonomous machinery I&apos;ve built, shipped, and keep running.
        </p>
      </div>
      <div className="steps">
        {work.map((w) => (
          <div className="step" key={w.num}>
            <span className="num">{w.num}</span>
            <div className="body">
              <h3 className="serif">
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
            <span className={`status ${w.status.kind}`}>{w.status.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Ventures() {
  return (
    <section className="block reveal">
      <div className="sec-head">
        <p className="eyebrow">Ventures</p>
        <h2 className="serif">What I lead</h2>
      </div>
      <div className="grid two">
        {ventures.map((v) => (
          <a className="vcard" key={v.title} href={v.href} target="_blank" rel="noopener noreferrer">
            <span className="kicker">{v.kicker}</span>
            <h3 className="serif">
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
    </section>
  );
}

export function Writing() {
  return (
    <section className="block reveal" id="writing">
      <div className="sec-head">
        <p className="eyebrow">Writing &amp; garden</p>
        <h2 className="serif">Field notes from the frontier.</h2>
        <p className="lede">
          Essays when they&apos;re finished; a digital garden of evergreen notes while they&apos;re still
          growing.
        </p>
      </div>
      <div className="feed">
        {writing.map((p) => (
          <a key={p.num} href={p.href} {...ext(p.href.startsWith("http"))}>
            <span className="num">{p.num}</span>
            <span className="ttl serif">{p.title}</span>
            <span className="meta">{p.meta}</span>
          </a>
        ))}
      </div>
    </section>
  );
}

export function Now() {
  return (
    <section className="block reveal">
      <div className="sec-head">
        <p className="eyebrow">Now · last synced Jul 2026</p>
        <h2 className="serif">Current focus</h2>
      </div>
      <div className="now">
        <p>
          <b>Teaching the fleet to plan.</b> Multi-step missions the agents decompose, execute, and grade
          themselves — with me out of the loop.
        </p>
        <p>
          <b>Raising the trust ceiling.</b> Hardening the safety model so agents can take higher-stakes
          actions without a human gate on every step.
        </p>
      </div>
    </section>
  );
}

export function Connect() {
  return (
    <section className="closing reveal" id="connect">
      <h2 className="serif">
        Let&apos;s build something <em>autonomous</em>.
      </h2>
      <div className="links">
        {socialLinks.map((l) => (
          <a className="lnk" key={l.label} href={l.href} {...ext(l.external)}>
            {l.label} <span className="h">↗</span>
          </a>
        ))}
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer>
      <div className="row">
        <span>© 2026 Drew</span>
        <span className="accent">// think freely · build securely · ship boldly</span>
        <span className="spacer" />
        <span>hand-built · cyberdrew.dev</span>
      </div>
    </footer>
  );
}
