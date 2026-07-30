import { nav, person } from "@/lib/site";
import { StarMark } from "./StarMark";
import { ThemeToggle } from "./ThemeToggle";
import { WordmarkCycler } from "./WordmarkCycler";

export function Header() {
  return (
    <header className="header">
      <div className="wide header-in">
        {/* The visible text cycles and is aria-hidden; this aria-label is the
            link's stable accessible name. */}
        <a className="wordmark" href="#top" aria-label={`${person.callsign} — home`}>
          <StarMark />
          <WordmarkCycler />
        </a>

        <nav className="nav" aria-label="Primary">
          {nav.map((n) => (
            <a className="nav-link" key={n.href} href={n.href}>
              {n.label}
            </a>
          ))}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
