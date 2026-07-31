import { footer, person, socials } from "@/lib/site";
import { SocialIcon } from "./SocialIcon";

export function SiteFooter() {
  // Static prerender: these stamp at build time, which tracks deploys.
  const builtAt = process.env.NEXT_PUBLIC_BUILT_AT;
  const commit = process.env.NEXT_PUBLIC_COMMIT;

  return (
    <footer className="site-footer">
      <div className="wide">
        <div className="footer-in" data-reveal>
          <p className="footer-sign">{footer.signoff}</p>

          <nav className="footer-links" aria-label="Elsewhere">
            <a href={`mailto:${person.email}`}>{person.email}</a>
            {socials.map((s) => (
              <a
                key={s.id}
                className="icon-link"
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                title={s.label}
              >
                <SocialIcon id={s.id} />
              </a>
            ))}
          </nav>
        </div>

        <div className="footer-bar">
          {/* No year: the build stamp to the right already dates the page,
              and a hardcoded year is one more thing that can go stale. */}
          <span>
            (c) {person.name} ({person.handle})
          </span>
          {/* The log is the interface: real machine state, stamped at build,
              not a slogan. Both halves degrade independently if absent. */}
          {(builtAt || commit) && (
            <span className="build">
              {builtAt ? `build ${builtAt}` : null}
              {builtAt && commit ? " · " : null}
              {commit || null}
            </span>
          )}
        </div>
      </div>
    </footer>
  );
}
