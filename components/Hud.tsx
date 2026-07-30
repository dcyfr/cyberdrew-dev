import { person } from "@/lib/content";

// Floating glass nav pill — inset from the viewport edge so the hero field
// reads as full-bleed behind and around it.
export default function Hud() {
  return (
    <nav className="nav">
      <span className="brand">
        <span className="mark" aria-hidden="true" />
        cyberdrew<span className="tld">.dev</span>
      </span>

      <span className="spacer" />

      <span className="links">
        <a href="#fleet">Fleet</a>
        <a href="#work">Work</a>
        <a href="#writing">Writing</a>
        <a href="#work-with-me">Work with me</a>
      </span>

      <span className="status">
        <span className="pulse" aria-hidden="true" />
        <b>30+</b> agents live
      </span>

      <a className="btn primary" href={person.cal} target="_blank" rel="noopener noreferrer">
        Book a 1:1
      </a>
    </nav>
  );
}
