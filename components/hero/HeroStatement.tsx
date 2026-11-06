import { hero } from "@/lib/site";
import { HeroEyebrow, HeroPathways, HeroPortrait, HeroRoles } from "./parts";

export function HeroStatement() {
  return (
    <section className="hero hero-statement" id="top">
      <div className="wide">
        <HeroEyebrow />

        <h1>
          {hero.headline.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </h1>

        <p className="hero-deck">{hero.deck}</p>
        <HeroPathways />

        <div className="hero-byline">
          <HeroPortrait size={56} className="portrait-sm" />
          <div className="hero-byline-say">
            <HeroRoles />
          </div>
        </div>
      </div>
    </section>
  );
}
