import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Drew — agents that act, rails that hold";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const dir = join(process.cwd(), "app/og");
const serif = readFileSync(join(dir, "PTSerif-Regular.ttf"));
const serifItalic = readFileSync(join(dir, "PTSerif-Italic.ttf"));
const mono = readFileSync(join(dir, "PTMono-Regular.ttf"));

// PHOSPHOR, sRGB fallbacks — satori resolves neither oklch() nor custom
// properties, so the hex ladder from the token file is inlined here.
const SUMI = "#050505";
const INK = "#f2f1ef";
const BONE = "#d9dada";
const MUT = "#8e8e95";
const ACCENT = "#de3a22";
const ACCENT_400 = "#f0563a";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundColor: SUMI,
          color: INK,
          fontFamily: "PTSerif",
          position: "relative",
        }}
      >
        {/* The one dramatic field: a vermilion sun bleeding off the right edge.
            Flat layers, no gradient standing in for depth. */}
        <div
          style={{
            position: "absolute",
            display: "flex",
            right: -150,
            top: 150,
            width: 460,
            height: 460,
            borderRadius: 230,
            backgroundColor: ACCENT,
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "74px 78px",
            width: 880,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              fontFamily: "PTMono",
              fontSize: 23,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: MUT,
            }}
          >
            <div
              style={{
                display: "flex",
                width: 11,
                height: 11,
                borderRadius: 6,
                backgroundColor: ACCENT_400,
              }}
            />
            <span style={{ display: "flex", color: BONE }}>cyberdrew.dev</span>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 86,
              lineHeight: 1.04,
              letterSpacing: -2.5,
              color: INK,
            }}
          >
            <span style={{ display: "flex" }}>Agents that act.</span>
            <span style={{ display: "flex", color: BONE }}>Rails that hold.</span>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              fontFamily: "PTMono",
              fontSize: 21,
              color: MUT,
            }}
          >
            <div style={{ display: "flex", width: 90, height: 3, backgroundColor: ACCENT }} />
            <span style={{ display: "flex" }}>
              Security architecture for autonomous AI
            </span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "PTSerif", data: serif, style: "normal", weight: 400 },
        { name: "PTSerif", data: serifItalic, style: "italic", weight: 400 },
        { name: "PTMono", data: mono, style: "normal", weight: 400 },
      ],
    },
  );
}
