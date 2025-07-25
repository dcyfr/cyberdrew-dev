import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { connectCards } from "@/data/connect-cards";

export const ConnectCards = () => {
  const navigate = useNavigate();

  const handleCardClick = (link: string, internal: boolean) => {
    if (internal) {
      navigate(link);
    } else {
      window.open(link, "_blank");
    }
  };

  const accentColors = [
    "bg-accent-blue/5 hover:bg-accent-blue/10 border-accent-blue/20",
    "bg-accent-green/5 hover:bg-accent-green/10 border-accent-green/20", 
    "bg-accent-yellow/5 hover:bg-accent-yellow/10 border-accent-yellow/20",
    "bg-accent-red/5 hover:bg-accent-red/10 border-accent-red/20",
    "bg-accent-blue/5 hover:bg-accent-blue/10 border-accent-blue/20",
    "bg-accent-green/5 hover:bg-accent-green/10 border-accent-green/20"
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold text-foreground mb-8 text-center">
        Connect & Explore
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {connectCards.map((card, index) => {
          const IconComponent = card.icon;
          
          return (
            <Card 
              key={index} 
              className={`cursor-pointer transition-colors ${accentColors[index]}`}
              onClick={() => handleCardClick(card.link, card.internal)}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <IconComponent className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-medium text-foreground">
                        {card.title}
                      </h3>
                      {!card.internal && (
                        <ExternalLink className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};