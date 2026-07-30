import { Hero } from "@/components/Hero";
import { Ledger } from "@/components/Ledger";
import { Loop } from "@/components/Loop";
import { Envelope } from "@/components/Envelope";
import { Work } from "@/components/Work";
import { Offer } from "@/components/Offer";
import { Writing } from "@/components/Writing";
import { SiteFooter } from "@/components/SiteFooter";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Reveal } from "@/components/Reveal";

export default function Page() {
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <ThemeToggle />
      <Reveal />

      <Hero />

      <main id="main">
        <Ledger />
        <Loop />
        <Envelope />
        <Work />
        <Offer />
        <Writing />
      </main>

      <SiteFooter />
    </>
  );
}
