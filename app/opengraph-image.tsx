import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { STAR_PATH } from "@/lib/mark";

export const alt = "Drew Gowan, Cyber Architect";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Same Archivo the page uses, so the share card and the site are one face.
// Satori parses TTF/OTF only (it rejects woff2 with "Unsupported OpenType
// signature wOF2"), so the card gets static TTF cuts while the page gets the
// variable woff2.
const dir = join(process.cwd(), "app/og");
const displayBold = readFileSync(join(dir, "Archivo_700Bold.ttf"));
const displayRegular = readFileSync(join(dir, "Archivo_400Regular.ttf"));
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
          fontFamily: "Archivo",
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
          {/* the mark is the material: a solid four-pointed star */}
          <svg width="18" height="18" viewBox="0 0 24 24" fill={BONE}>
            <path d={STAR_PATH} />
          </svg>
          <span style={{ display: "flex", color: BONE }}>cyberdrew.dev</span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 92,
            fontWeight: 700,
            lineHeight: 1.04,
            letterSpacing: -3.5,
            color: INK,
          }}
        >
          <span style={{ display: "flex" }}>Agents that act</span>
          <span style={{ display: "flex", color: MUT }}>Rails that hold</span>
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
            <span style={{ display: "flex" }}>Secure architecture for autonomous systems</span>
            <span style={{ display: "flex" }}>DCYFR Labs · GameShark Labs</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Archivo", data: displayRegular, style: "normal", weight: 400 },
        { name: "Archivo", data: displayBold, style: "normal", weight: 700 },
        { name: "PTMono", data: mono, style: "normal", weight: 400 },
      ],
    },
  );
}
