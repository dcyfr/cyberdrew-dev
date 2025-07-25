import { Button } from "@/components/ui/button";

export const SponsorSection = () => {
  return (
    <div className="text-center mt-16">
      <Button 
        variant="default" 
        onClick={() => window.open("https://github.com/sponsors/dcyfr", "_blank")}
      >
        Sponsor on GitHub
      </Button>
    </div>
  );
};