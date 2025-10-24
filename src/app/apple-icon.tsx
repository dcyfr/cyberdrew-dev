import { ImageResponse } from "next/og";
import { LOGO_PATH, LOGO_VIEWBOX } from "@/lib/logo-config";

export const runtime = "edge";
export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "transparent",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(135deg, #020617 0%, #111827 100%)",
            borderRadius: "50%",
          }}
        >
          <svg
            width="110"
            height="110"
            viewBox={LOGO_VIEWBOX}
            fill="#f9fafb"
          >
            <path d={LOGO_PATH} />
          </svg>
        </div>
      </div>
    ),
    size
  );
}
