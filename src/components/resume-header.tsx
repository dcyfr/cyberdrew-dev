import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export const ResumeHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="mb-16">
      <div className="flex justify-between items-start mb-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/")}
          className="-ml-3"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <ThemeToggle />
      </div>
      
      <div className="space-y-4">
        <h1 className="text-3xl font-semibold text-foreground">Drew</h1>
        <p className="text-lg text-foreground">Principal Cybersecurity Engineer</p>
        <p className="text-muted-foreground leading-relaxed">
          Skilled security professional with over 5 years of experience in developing security architecture, 
          zero-trust frameworks, and threat mitigation systems.
        </p>
      </div>
    </div>
  );
};