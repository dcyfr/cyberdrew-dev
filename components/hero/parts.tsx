import Image from "next/image";
import { hero, person } from "@/lib/site";
import portrait from "@/public/img/drew.webp";

/** The pieces the hero is assembled from. */
export function HeroEyebrow() {
  return <p className="eyebrow">{hero.eyebrow}</p>;
}

export function HeroPathways() {
  return (
    <nav className="hero-paths" aria-label="Explore the portfolio">
      {hero.paths.map((path, index) => (
        <a className="hero-path" href={path.href} key={path.href}>
          <span className="hero-path-index" aria-hidden="true">0{index + 1}</span>
          <span className="hero-path-copy">
            <span className="hero-path-label">{path.label}</span>
            <span className="hero-path-note">{path.note}</span>
          </span>
          <span className="hero-path-arrow" aria-hidden="true">↗</span>
        </a>
      ))}
    </nav>
  );
}

/** What I do. Three, in mono, because they are labels rather than prose. */
export function HeroRoles({ className }: { className?: string }) {
  return (
    <p className={`hero-roles${className ? ` ${className}` : ""}`}>
      {hero.roles.map((r) => (
        <span key={r.org}>
          {r.role},{" "}
          <a href={r.href} target="_blank" rel="noreferrer">
            {r.org}
          </a>
        </span>
      ))}
    </p>
  );
}

/**
 * The only photograph on the site.
 *
 * It takes the disc the wordmark's mark and the theme toggle already use, so it
 * reads as part of the system rather than as a new shape arriving. Greyscaled
 * in CSS rather than baked into the asset: the page has two materials and no
 * hue, and a full-colour face would be the single hue on it. Doing it here also
 * means one asset serves both grounds.
 *
 * `size` is the rendered box in px, and it drives the intrinsic request and the
 * `sizes` hint together. Passing it is not optional dressing: the hero sets the
 * face at byline scale, and a portrait component that hardcoded one size would
 * either ship a 112px source into a 56px box or a 56px source into a larger
 * one the next time the arrangement changes.
 */
export function HeroPortrait({
  size = 112,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <Image
      className={`portrait${className ? ` ${className}` : ""}`}
      src={portrait}
      alt={`${person.name}, ${person.callsign}`}
      width={size}
      height={size}
      sizes={`${size}px`}
      priority
    />
  );
}
