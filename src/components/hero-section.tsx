import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import drewProfile from "@/assets/drew-profile.png";

export const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center text-center mb-24">
      <div className="mb-8">
        <img
          src={drewProfile}
          alt="Drew"
          className="w-24 h-24 rounded-full object-cover"
        />
      </div>
      
      <h1 className="text-4xl font-semibold text-foreground mb-4 leading-tight">
        Hi, I'm Drew
      </h1>
      
      <p className="text-lg text-muted-foreground mb-8 max-w-md">
        Cybersecurity Architect & Independent Researcher
      </p>
      
      <div className="flex gap-3">
        <Button 
          variant="outline" 
          onClick={() => navigate("/blog")}
        >
          Blog
        </Button>
        <Button 
          variant="outline" 
          onClick={() => navigate("/resume")}
        >
          Resume
        </Button>
      </div>
    </div>
  );
};