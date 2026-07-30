import { nav, person } from "@/lib/site";
import { StarMark } from "./StarMark";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="header">
      <div className="wide header-in">
        {/* aria-label survives the narrow breakpoint, where the text is
            display:none and would otherwise leave the link unnamed. */}
        <a className="wordmark" href="#top" aria-label={`${person.domain}, home`}>
          <StarMark />
          <span>{person.domain}</span>
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
