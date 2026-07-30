import { STAR_PATH } from "@/lib/mark";

/** Renders the shared identity mark. Fills with currentColor unless told
 *  otherwise, so it wears whichever material the context provides. */
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
      <path d={STAR_PATH} />
    </svg>
  );
}
