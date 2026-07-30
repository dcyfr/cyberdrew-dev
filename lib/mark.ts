/**
 * The identity mark: a solid four-pointed star (the shape of U+2726), drawn
 * rather than typed so it cannot fall back to tofu on platforms whose system
 * fonts lack the codepoint. Concave sides via quadratic curves.
 *
 * Single definition, shared by the header mark, the work status bullets, the
 * generated favicon and the OG card. Change it here and every surface moves
 * together.
 */
export const STAR_PATH =
  "M12 0 Q13.8 10.2 24 12 Q13.8 13.8 12 24 Q10.2 13.8 0 12 Q10.2 10.2 12 0 Z";
