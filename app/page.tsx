import { Header } from "@/components/Header";
// The hero is one of four arrangements under components/hero/ — swap this
// import and the tag below to try another. /lab/hero renders all four for
// comparison. See the header comment on each variant for what it argues.
import { HeroStatement } from "@/components/hero/HeroStatement";
import { Eclipse } from "@/components/Eclipse";
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
      {/* Scroll readout: CSS scroll-driven, no listener on the main thread. */}
      <div className="progress" aria-hidden="true" />
      <NavSpy />
      <ScrollReveal />
      <CursorGlow />

      <Header />

      <main id="main">
        {/* Work answers "agents that act", Guardrails answers "rails that
            hold" — the two halves of the headline, in the headline's order.
            The loop sits between them: it is how the acting happens, and each
            of its states names the guard that the next section then measures. */}
        <HeroStatement />
        {/* Between the claim and the evidence, buying the page a breath before
            the lists start. */}
        <Eclipse />
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
