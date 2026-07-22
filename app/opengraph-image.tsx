import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Drew — I build the systems that build";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const dir = join(process.cwd(), "app/og");
const serif = readFileSync(join(dir, "PTSerif-Regular.ttf"));
const serifItalic = readFileSync(join(dir, "PTSerif-Italic.ttf"));
const mono = readFileSync(join(dir, "PTMono-Regular.ttf"));

const BG = "#060911";
const INK = "#e9f1f9";
const INK2 = "#9db2c6";
const MUT = "#7d8ea3";
const CYAN = "#4ce3ff";

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
          padding: "74px 78px",
          backgroundColor: BG,
          color: INK,
          fontFamily: "PTSerif",
          position: "relative",
        }}
      >
        {/* ambient glow */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            backgroundImage:
              "radial-gradient(680px 520px at 20% 6%, rgba(76,227,255,0.18), transparent 60%), radial-gradient(560px 420px at 94% 2%, rgba(255,61,129,0.09), transparent 60%)",
          }}
        />

        {/* eyebrow */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontFamily: "PTMono",
            fontSize: 24,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: CYAN,
            zIndex: 1,
          }}
        >
          <div style={{ display: "flex", width: 12, height: 12, borderRadius: 6, backgroundColor: CYAN }} />
          <span style={{ display: "flex", color: INK }}>cyberdrew.dev</span>
          <span style={{ display: "flex", color: MUT }}>· building at the agentic frontier</span>
        </div>

        {/* headline */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "baseline",
            gap: "8px 26px",
            fontSize: 88,
            lineHeight: 1.02,
            letterSpacing: -1.5,
            maxWidth: 1010,
            zIndex: 1,
          }}
        >
          <span style={{ display: "flex" }}>I build the</span>
          <span style={{ display: "flex", fontStyle: "italic", color: CYAN }}>systems</span>
          <span style={{ display: "flex" }}>that build.</span>
        </div>

        {/* footer line */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontFamily: "PTMono",
            fontSize: 23,
            color: INK2,
            zIndex: 1,
          }}
        >
          <span style={{ display: "flex", color: INK }}>@cyberdrew</span>
          <span style={{ display: "flex", color: MUT }}>·</span>
          <span style={{ display: "flex" }}>Founder @ DCYFR Labs · Head of AI @ GameShark Labs</span>
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
    }
  );
}
