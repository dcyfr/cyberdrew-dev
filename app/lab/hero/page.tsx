import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { CursorGlow } from "@/components/CursorGlow";
import { ScrollReveal } from "@/components/ScrollReveal";
import { HeroStatement } from "@/components/hero/HeroStatement";
import { HeroConsole } from "@/components/hero/HeroConsole";
import { HeroManifest } from "@/components/hero/HeroManifest";
import { HeroSplit } from "@/components/hero/HeroSplit";

/**
 * The comparison surface for the four hero variants. Not part of the site.
 *
 * Each variant is a full-height hero, so scrolling this page steps through them
 * one screen at a time on the real ground, under the real dock, with the real
 * travelling light. That matters: three of the four differences are about how
 * an arrangement sits in a viewport rather than how it reads in isolation, and
 * none of them can be judged from a static crop.
 *
 * Every hero owns `id="top"` on the live page, which is legal exactly once —
 * hence the `id` prop, so this page can address them a/b/c/d instead of
 * shipping four elements claiming the same anchor.
 *
 * DELETE THIS ROUTE once a variant is chosen, along with the three components
 * that lost and their blocks in globals.css.
 */
export const metadata: Metadata = {
  title: "Hero variants · lab",
  robots: { index: false, follow: false },
};

const VARIANTS = [
  {
    key: "A",
    name: "Statement",
    note: "One column at full rail width. Proof as a ruled band, and the light runs on that rule.",
    render: () => <HeroStatement id="v-a" />,
  },
  {
    key: "B",
    name: "Console",
    note: "The hero inside the page's own glass, wearing the border ring. Figures as a readout.",
    render: () => <HeroConsole id="v-b" />,
  },
  {
    key: "C",
    name: "Manifest",
    note: "A mono spec sheet on the left, the claim on the right. Two lit edges, one pointer.",
    render: () => <HeroManifest id="v-c" />,
  },
  {
    key: "D",
    name: "Split",
    note: "One hard vertical rule. A face at subject scale, figures against the rule beneath it.",
    render: () => <HeroSplit id="v-d" />,
  },
];

export default function HeroLab() {
  return (
    <>
      <ScrollReveal />
      <CursorGlow />
      <Header />

      <main id="main">
        {VARIANTS.map((v) => (
          <div className="lab-case" key={v.key}>
            <p className="lab-tag">
              <span className="lab-key">{v.key}</span>
              <span className="lab-name">{v.name}</span>
              <span className="lab-note">{v.note}</span>
            </p>
            {v.render()}
          </div>
        ))}
      </main>
    </>
  );
}
