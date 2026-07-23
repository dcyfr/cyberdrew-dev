import { person } from "@/lib/content";

export default function Hud() {
  return (
    <nav>
      <span className="logo">
        <span className="dot" />
        <b>cyber</b>drew<span style={{ color: "var(--ink-mut)" }}>.dev</span>
      </span>
      <span className="spacer" />
      <span className="stat hide-sm">
        FLEET <span className="v" style={{ color: "var(--accent)" }}>30+ AGENTS</span>
      </span>
      <span className="nav-links">
        <a href="#work">Work</a>
        <a href="#writing">Writing</a>
        <a href="#connect">Connect</a>
      </span>
      <a className="pill" href={person.cal} target="_blank" rel="noopener noreferrer">
        Book a 1:1
      </a>
    </nav>
  );
}
