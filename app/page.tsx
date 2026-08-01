import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Work } from "@/components/Work";
import { Guardrails } from "@/components/Guardrails";
import { Writing } from "@/components/Writing";
import { Contact } from "@/components/Contact";
import { SiteFooter } from "@/components/SiteFooter";
import { NavSpy } from "@/components/NavSpy";
import { ScrollReveal } from "@/components/ScrollReveal";
import { CursorGlow } from "@/components/CursorGlow";

export default function Page() {
  return (
    <>
      {/* Content fades into the ground before meeting the dock. */}
      <div className="top-fade" aria-hidden="true" />
      {/* Scroll readout: CSS scroll-driven, no listener on the main thread. */}
      <div className="progress" aria-hidden="true" />
      <NavSpy />
      <ScrollReveal />
      <CursorGlow />

      <Header />

      <main id="main">
        {/* Work answers "agents that act", Guardrails answers "rails that
            hold" — the two halves of the headline, in the headline's order. */}
        <Hero />
        <Work />
        <Guardrails />
        <Writing />
        <Contact />
      </main>

      <SiteFooter />
    </>
  );
}
