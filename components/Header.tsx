import { nav, person } from "@/lib/site";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="header">
      <div className="wide header-in">
        {/* aria-label survives the narrow breakpoint, where the text is
            display:none and would otherwise leave the link unnamed. */}
        <a className="wordmark" href="#top" aria-label={`${person.callsign} — home`}>
          {/* The mark is the material itself — a bone square on obsidian,
              and the inverse in light. */}
          <i aria-hidden="true" />
          <span>{person.callsign}</span>
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
