import { hero, person } from "@/lib/site";

export function Hero() {
  return (
    <header className="hero">
      <div className="hero-text">
        <p className="status">
          <i aria-hidden="true" />
          {hero.status}
        </p>

        <h1>
          {hero.headline.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </h1>

        <p className="hero-deck">{hero.deck}</p>

        <div className="hero-actions">
          <a className="btn btn-primary" href={hero.primary.href}>
            {hero.primary.label}
          </a>
          <a className="btn btn-ghost" href={hero.secondary.href}>
            {hero.secondary.label}
          </a>
        </div>

        <p className="hero-roles">
          {person.roles.map((r) => (
            <span key={r.org}>
              {r.role},{" "}
              {r.href ? (
                <a href={r.href} target="_blank" rel="noreferrer">
                  {r.org}
                </a>
              ) : (
                <b>{r.org}</b>
              )}
            </span>
          ))}
        </p>
      </div>

      {/* The one dramatic field: flat layers, hard edges, no gradient-as-depth. */}
      <div className="hero-field" aria-hidden="true">
        <div className="sun" />
        <div className="ridge" />
      </div>
    </header>
  );
}
