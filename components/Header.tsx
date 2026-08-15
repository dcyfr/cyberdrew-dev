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
          {/* The mark rides in its own filled disc, and takes the LIMB rather
              than the theme toggle's --edge-control. The toggle is icon-only,
              so its disc is its whole affordance and that edge is a 3:1
              obligation; this one sits inside a link whose text is the target.
              Object, not control — so it gets lit instead of outlined. */}
          <span className="mark" data-limb>
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
