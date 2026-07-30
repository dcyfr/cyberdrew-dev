import { footer, person, socials } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wide">
        <div className="footer-in">
          <p className="footer-sign">{footer.signoff}</p>

          <nav className="footer-links" aria-label="Elsewhere">
            <a href={`mailto:${person.email}`}>{person.email}</a>
            {socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer">
                {s.label} ↗
              </a>
            ))}
          </nav>
        </div>

        <div className="footer-bar">
          <span>
            {person.domain} — {person.name}
          </span>
          <span>Built and largely maintained by the fleet.</span>
        </div>
      </div>
    </footer>
  );
}
