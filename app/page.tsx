import { Header } from "@/components/Header";
import { HeroStatement } from "@/components/hero/HeroStatement";
import { Eclipse } from "@/components/Eclipse";
import { Work } from "@/components/Work";
import { Loop } from "@/components/Loop";
import { Guardrails } from "@/components/Guardrails";
import { Trust } from "@/components/Trust";
import { Writing } from "@/components/Writing";
import { Contact } from "@/components/Contact";
import { SiteFooter } from "@/components/SiteFooter";
import { NavSpy } from "@/components/NavSpy";

export default function Page() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <NavSpy />
      <Header />

      <main id="main" tabIndex={-1}>
        <HeroStatement />
        <Eclipse />
        <Work />
        <Loop />
        <Guardrails />
        <Trust />
        <Writing />
        <Contact />
      </main>

      <SiteFooter />
    </>
  );
}
