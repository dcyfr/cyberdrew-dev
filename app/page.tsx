import AgentMesh from "@/components/AgentMesh";
import FleetStream from "@/components/FleetStream";
import Hero from "@/components/Hero";
import Hud from "@/components/Hud";
import Ornaments from "@/components/Ornaments";
import RevealController from "@/components/RevealController";
import {
  Connect,
  Footer,
  Now,
  Statement,
  Ventures,
  Work,
  Writing,
} from "@/components/Sections";

export default function Page() {
  return (
    <>
      <AgentMesh />
      <div className="grid-tex" aria-hidden="true" />
      <div className="glowfield" aria-hidden="true" />

      <Hud />

      <div className="wrap">
        <Hero />
        <FleetStream />
        <Statement />
        <Work />
        <Ventures />
        <Writing />
        <Now />
        <Connect />
        <Footer />
      </div>

      <Ornaments />
      <RevealController />
    </>
  );
}
