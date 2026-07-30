import { footer, person, socials } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wide">
        <div className="footer-top">
          <div>
            <p className="footer-sign">{footer.signoff}</p>
          </div>

          <nav className="footer-col" aria-label="Sections">
            <h4>On this page</h4>
            <ul>
              {footer.nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href}>{n.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="footer-col" aria-label="Elsewhere">
            <h4>Elsewhere</h4>
            <ul>
              <li>
                <a href={`mailto:${person.email}`}>{person.email}</a>
              </li>
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noreferrer">
                    {s.label} ↗
                  </a>
                </li>
              ))}
            </ul>
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
