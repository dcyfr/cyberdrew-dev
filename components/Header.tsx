import { person } from "@/lib/site";
import { StarMark } from "./StarMark";
import { NavMenu } from "./NavMenu";

export function Header() {
  return (
    <header className="header">
      <div className="header-in">
        {/* aria-label survives the narrow breakpoint, where the text is
            display:none and would otherwise leave the link unnamed. */}
        <a className="wordmark" href="#top" aria-label={`${person.domain}, home`}>
          {/* The mark rides in its own filled disc, same treatment as the
              theme toggle, so the two ends of the dock rhyme. */}
          <span className="mark">
            <StarMark size={13} />
          </span>
          <span>{person.domain}</span>
        </a>

        <NavMenu />
      </div>
    </header>
  );
}
