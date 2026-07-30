import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Work } from "@/components/Work";
import { Writing } from "@/components/Writing";
import { Contact } from "@/components/Contact";
import { SiteFooter } from "@/components/SiteFooter";
import { Reveal } from "@/components/Reveal";

export default function Page() {
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Reveal />

      {/* Scroll readout: CSS scroll-driven, no listener on the main thread. */}
      <div className="progress" aria-hidden="true" />

      <Header />

      <main id="main">
        <Hero />
        <Work />
        <Writing />
        <Contact />
      </main>

      <SiteFooter />
    </>
  );
}
