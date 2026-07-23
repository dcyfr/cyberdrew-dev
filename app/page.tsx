import AgentMesh from "@/components/AgentMesh";
import FleetStream from "@/components/FleetStream";
import Hero from "@/components/Hero";
import Hud from "@/components/Hud";
import Ornaments from "@/components/Ornaments";
import RevealController from "@/components/RevealController";
import {
  CaseStudies,
  Connect,
  Footer,
  Now,
  Offer,
  Statement,
  Ventures,
  Work,
  Writing,
} from "@/components/Sections";

export default function Page() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <AgentMesh />
      <div className="grid-tex" aria-hidden="true" />
      <div className="glowfield" aria-hidden="true" />

      <Hud />

      <main id="main" tabIndex={-1} className="wrap">
        <Hero />
        <FleetStream />
        <Statement />
        <Work />
        <CaseStudies />
        <Ventures />
        <Writing />
        <Now />
        <Offer />
        <Connect />
      </main>

      <Footer />

      <Ornaments />
      <RevealController />
    </>
  );
}
