import { credentials } from "@/lib/site";

/**
 * A second mono line under the roles, in the same band.
 *
 * The page claims "cyber architect" and then asks to be trusted on
 * guardrails. Two of these four are certifications in exactly those things,
 * and every one is third-party verifiable — which is the same argument the
 * guardrails section makes, so it belongs next to the roles claim rather than
 * in a trust-badge strip further down.
 *
 * The abbreviation carries the visible line, because four expanded
 * certification names is a paragraph, not a credential strip. `title` covers
 * a hovering cursor and .sr-only covers everything else — `abbr[title]` alone
 * is not reliably announced, and title never reaches a touch device at all.
 */
export function Credentials() {
  return (
    <p className="creds">
      {/* title and the .sr-only expansion carry the same string, so the hover
          text and the announced text read identically. */}
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
