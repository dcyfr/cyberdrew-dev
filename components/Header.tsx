import { person } from "@/lib/site";
import { StarMark } from "./StarMark";
import { NavMenu } from "./NavMenu";

/**
 * Three slots on one grid: identity, links, controls. The links sit in the
 * middle track so the dock stays balanced as it widens instead of throwing
 * everything to one end — at 992px the pill is mostly void under
 * space-between. The outer tracks are 1fr each, so the rail is genuinely
 * centred while there is room and drifts, rather than breaks, once there
 * is not.
 */
export function Header() {
  return (
    <header className="header">
      <div className="header-in">
        {/* aria-label survives the condensed tier, where the domain is
            display:none and would otherwise leave the link unnamed. */}
        <a className="wordmark" href="#top" aria-label={`${person.domain}, home`}>
          {/* The mark rides in its own filled disc, same treatment as the
              theme toggle, so the two ends of the dock rhyme. */}
          <span className="mark">
            <StarMark size={13} />
          </span>
          {/* First thing to go when the dock tightens: the ~112px it costs is
              exactly what buys the full link row for another tier. */}
          <span className="wordmark-text">{person.domain}</span>
        </a>

        <NavMenu />
      </div>
    </header>
  );
}
