import Image from "next/image";
import { hero, person } from "@/lib/site";
import { TextCycler } from "./TextCycler";
import { Ledger } from "./Ledger";
import { Credentials } from "./Credentials";
import portrait from "@/public/img/drew.webp";

const longestPhrase = [...hero.eyebrowCycle].sort((a, b) => b.length - a.length)[0];

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="wide">
        {/* The cycling tail changes length, and at narrow widths the longer
            phrases wrap to a second line while the shorter ones do not, which
            walked the whole hero up and down. A hidden sizer holding the
            longest phrase shares one grid cell with the live text, so the box
            is always the tallest state and nothing below it moves. */}
        <p className="eyebrow eyebrow-cycle">
          <span className="sizer" aria-hidden="true">
            {hero.eyebrowPrefix} {longestPhrase}
          </span>
          <span className="live">
            {hero.eyebrowPrefix}{" "}
            <TextCycler
              items={hero.eyebrowCycle}
              label={`${hero.eyebrowCycle[0]}, artificial intelligence, and agentic design`}
            />
          </span>
        </p>

        <h1 data-glow>
          {hero.headline.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </h1>

        {/* Deck and ledger share a row: the headline stays full-bleed above
            them, and the figures fill the right half that the deck's measure
            leaves empty. Below the stacking point the ledger drops under the
            actions, where it reads as a footer to the hero rather than a
            column with nothing beside it. */}
        <div className="hero-body">
          <div className="hero-say">
            <p className="hero-deck">{hero.deck}</p>

            <div className="hero-actions">
              <a className="btn btn-solid" href={hero.primary.href}>
                {hero.primary.label}
              </a>
              <a className="btn btn-ghost" href={hero.secondary.href}>
                {hero.secondary.label}
              </a>
            </div>
          </div>

          {/* Right column: who, then what backs it. The portrait is the only
              photograph on the site, so it takes the same disc treatment as
              the wordmark's mark and the theme toggle rather than arriving as
              a new shape. Greyscaled in CSS, not in the asset, so it follows
              the theme instead of fighting whichever ground it lands on. */}
          <div className="hero-aside">
            <Image
              className="portrait"
              src={portrait}
              alt={`${person.name}, ${person.callsign}`}
              width={112}
              height={112}
              sizes="112px"
              priority
            />
            <Ledger />
          </div>
        </div>

        {/* Who I am, in two mono lines: what I do, and what backs it. */}
        <p className="hero-roles">
          {hero.roles.map((r) => (
            <span key={r.org}>
              {r.role},{" "}
              <a href={r.href} target="_blank" rel="noreferrer">
                {r.org}
              </a>
            </span>
          ))}
        </p>
        <Credentials />
      </div>
    </section>
  );
}
