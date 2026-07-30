/**
 * Outbound-link arrow. An SVG rather than the ↗ glyph: the character renders
 * at wildly different weights and baselines across platforms (and is missing
 * from some Android fonts), where this stays crisp at 12px and inherits
 * currentColor.
 *
 * Render it immediately after a non-breaking space so it can never be left
 * stranded on a line of its own when the title wraps.
 */
export function ArrowIcon({ size = 12 }: { size?: number }) {
  return (
    <svg
      className="arrow"
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M5 11L11 5" />
      <path d="M5.5 4.5H11.5V10.5" />
    </svg>
  );
}
