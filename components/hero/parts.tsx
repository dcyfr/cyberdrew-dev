import Image from "next/image";
import { credentials, hero, person } from "@/lib/site";
import { TextCycler } from "../TextCycler";
import portrait from "@/public/img/drew.webp";

/**
 * The pieces the hero is assembled from.
 *
 * Split out of HeroStatement rather than inlined, because each of these is a
 * self-contained thing with its own reason to exist and its own way of going
 * wrong — the eyebrow's hidden sizer, the abbreviation's three-way expansion,
 * the portrait's size-driven intrinsic request. Inlined, those notes would sit
 * inside a layout file that is about arrangement, and the arrangement is the
 * one part of the hero most likely to be rewritten again.
 */

const longestPhrase = [...hero.eyebrowCycle].sort((a, b) => b.length - a.length)[0];

/**
 * The cycling tail changes length, and at narrow widths the longer phrases wrap
 * to a second line while the shorter ones do not, which walked the whole hero
 * up and down. A hidden sizer holding the longest phrase shares one grid cell
 * with the live text, so the box is always the tallest state and nothing below
 * it moves.
 */
export function HeroEyebrow({ className }: { className?: string }) {
  return (
    <p className={`eyebrow eyebrow-cycle${className ? ` ${className}` : ""}`}>
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
  );
}

/** The two real actions, in the order the page wants them taken. */
export function HeroActions({ className }: { className?: string }) {
  return (
    <div className={`hero-actions${className ? ` ${className}` : ""}`}>
      <a className="btn btn-solid" href={hero.primary.href}>
        {hero.primary.label}
      </a>
      <a className="btn btn-ghost" href={hero.secondary.href}>
        {hero.secondary.label}
      </a>
    </div>
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
 * What backs it, one step quieter than the roles.
 *
 * The abbreviation carries the visible line, because four expanded
 * certification names is a paragraph, not a credential strip. `title` covers a
 * hovering cursor and .sr-only covers everything else — `abbr[title]` alone is
 * not reliably announced, and title never reaches a touch device at all.
 */
export function HeroCredentials({ className }: { className?: string }) {
  return (
    <p className={`creds${className ? ` ${className}` : ""}`}>
      {credentials.items.map((c) => (
        <abbr className="cred" key={c.abbr} title={`${c.name}, ${c.issuer}`}>
          {c.abbr}
          <span className="sr-only">{` (${c.name}, ${c.issuer})`}</span>
        </abbr>
      ))}
      <a className="cred-more" href={credentials.href} target="_blank" rel="noreferrer">
        {credentials.more}
      </a>
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
