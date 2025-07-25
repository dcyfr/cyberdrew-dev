import { ThemeToggle } from "@/components/theme-toggle";
import { HeroSection } from "@/components/hero-section";
import { ConnectCards } from "@/components/connect-cards";
import { SponsorSection } from "@/components/sponsor-section";

const Home = () => {

  return (
    <div className="min-h-screen">
      {/* Theme Toggle */}
      <div className="container mx-auto px-6 py-4 max-w-4xl">
        <div className="flex justify-end">
          <ThemeToggle />
        </div>
      </div>
      
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <HeroSection />
        <ConnectCards />
        <SponsorSection />
      </div>
    </div>
  );
};

export default Home;