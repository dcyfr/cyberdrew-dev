import { ImageResponse } from "next/og";
import { STAR_PATH } from "@/lib/mark";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/**
 * Generated from the same STAR_PATH as the header mark, the status bullets
 * and the OG card, so the identity has exactly one definition. The committed
 * favicon.ico predated the rebuild and still carried the previous identity.
 */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0b0b0d",
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="#dcdad5">
          <path d={STAR_PATH} />
        </svg>
      </div>
    ),
    size,
  );
}
