"use client";

import { person } from "@/lib/content";
import { useClock } from "@/lib/hooks";

export default function Hud() {
  const clock = useClock();
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
      <span className="stat">
        LOCAL <span className="v">{clock}</span>
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
