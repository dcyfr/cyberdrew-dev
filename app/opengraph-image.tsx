import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Drew: agents that act, rails that hold";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const dir = join(process.cwd(), "app/og");
const serif = readFileSync(join(dir, "PTSerif-Regular.ttf"));
const serifItalic = readFileSync(join(dir, "PTSerif-Italic.ttf"));
const mono = readFileSync(join(dir, "PTMono-Regular.ttf"));

// Obsidian / bone. Satori resolves neither custom properties nor color-mix,
// so the two materials and their derived steps are inlined.
const OBSIDIAN = "#0b0b0d";
const BONE = "#dcdad5";
const INK = "#edece8";
const MUT = "#86868d";
const LINE = "#26262b";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 78px",
          backgroundColor: OBSIDIAN,
          color: INK,
          fontFamily: "PTSerif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontFamily: "PTMono",
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "lowercase",
            color: MUT,
          }}
        >
          {/* the mark is the material */}
          <div style={{ display: "flex", width: 14, height: 14, backgroundColor: BONE }} />
          <span style={{ display: "flex", color: BONE }}>cyberdrew.dev</span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 92,
            lineHeight: 1.04,
            letterSpacing: -3,
            color: INK,
          }}
        >
          <span style={{ display: "flex" }}>Agents that act.</span>
          <span style={{ display: "flex", color: MUT }}>Rails that hold.</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ display: "flex", height: 1, backgroundColor: LINE }} />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontFamily: "PTMono",
              fontSize: 20,
              color: MUT,
            }}
          >
            <span style={{ display: "flex" }}>Secure architecture for autonomous AI</span>
            <span style={{ display: "flex" }}>DCYFR Labs · GameShark Labs</span>
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
