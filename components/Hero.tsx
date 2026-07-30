import { hero } from "@/lib/site";
import { TextCycler } from "./TextCycler";

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="wide">
        <p className="eyebrow">
          {hero.eyebrowPrefix}{" "}
          <TextCycler
            items={hero.eyebrowCycle}
            label={`${hero.eyebrowCycle[0]}, artificial intelligence, and agentic design`}
          />
        </p>

        <h1 data-glow>
          {hero.headline.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </h1>

        <p className="hero-deck">{hero.deck}</p>

        <div className="hero-actions">
          <a className="btn btn-solid" href={hero.primary.href}>
            {hero.primary.label}
          </a>
          <a className="btn btn-ghost" href={hero.secondary.href}>
            {hero.secondary.label}
          </a>
        </div>

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
      </div>
    </section>
  );
}
