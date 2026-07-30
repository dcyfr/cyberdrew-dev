import { footer, person, socials } from "@/lib/site";
import { SocialIcon } from "./SocialIcon";

export function SiteFooter() {
  // Static prerender: the year stamps at build time, which tracks deploys.
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="wide">
        <div className="footer-in">
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
          <span>
            © {year} {person.name} ({person.handle})
          </span>
        </div>
      </div>
    </footer>
  );
}
