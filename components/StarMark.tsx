/**
 * The identity mark: a solid four-pointed star (the ✦ glyph's shape, U+2726),
 * drawn as SVG rather than typed as a character so it cannot fall back to
 * tofu on platforms whose system fonts lack the codepoint. Concave sides via
 * quadratic curves; fills with currentColor unless told otherwise, so it
 * wears whichever material the context provides.
 */
export function StarMark({
  size = 11,
  fill = "currentColor",
}: {
  size?: number;
  fill?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill}
      aria-hidden="true"
      focusable="false"
    >
      <path d="M12 0 Q13.8 10.2 24 12 Q13.8 13.8 12 24 Q10.2 13.8 0 12 Q10.2 10.2 12 0 Z" />
    </svg>
  );
}
