import { Header } from "@/components/Header";
import { HeroStatement } from "@/components/hero/HeroStatement";
import { Work } from "@/components/Work";
import { Loop } from "@/components/Loop";
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
      <NavSpy />
      <ScrollReveal />
      <CursorGlow />

      <Header />

      <main id="main">
        {/* Work answers "agents that act", Guardrails answers "rails that
            hold" — the two halves of the headline, in the headline's order.
            The loop sits between them: it is how the acting happens, and each
            of its states names the guard that the next section then measures. */}
        {/* The eclipse used to sit here as a section of its own, between the
            claim and the evidence. It is inside the hero now — it was a screen
            of scroll spent on a mostly-empty letterbox, and as the hero's own
            light source it says the same thing without asking for the room. */}
        <HeroStatement />
        <Work />
        <Loop />
        <Guardrails />
        <Writing />
        <Contact />
      </main>

      <SiteFooter />
    </>
  );
}
