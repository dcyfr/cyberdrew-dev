import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import drewProfile from "@/assets/drew-profile.png";
import { ExternalLink, FileText, Github, Linkedin, Award, BookOpen } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

const Home = () => {
  const navigate = useNavigate();

  const connectCards = [
    {
      title: "Blog",
      description: "Musings on technology, cybersecurity, and life",
      link: "/blog",
      internal: true,
      icon: BookOpen,
    },
    {
      title: "Resume",
      description: "Security architecture and cyber threat mitigation",
      link: "/resume",
      internal: true,
      icon: FileText,
    },
    {
      title: "Publications",
      description: "Research contributions and academic publications",
      link: "https://orcid.org/0009-0008-7570-6768",
      internal: false,
      icon: Award,
    },
    {
      title: "Credentials",
      description: "Digital badges and professional certifications",
      link: "https://www.credly.com/users/dcyfr",
      internal: false,
      icon: Award,
    },
    {
      title: "GitHub",
      description: "Projects, tools, and open source contributions",
      link: "https://github.com/dcyfr",
      internal: false,
      icon: Github,
    },
    {
      title: "LinkedIn",
      description: "Professional insights and industry connections",
      link: "https://www.linkedin.com/in/dcyfr",
      internal: false,
      icon: Linkedin,
    },
  ];

  const handleCardClick = (link: string, internal: boolean) => {
    if (internal) {
      navigate(link);
    } else {
      window.open(link, "_blank");
    }
  };

  return (
    <div className="min-h-screen">
      {/* Theme Toggle */}
      <div className="container mx-auto px-6 py-4 max-w-4xl">
        <div className="flex justify-end">
          <ThemeToggle />
        </div>
      </div>
      
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        {/* Hero Section */}
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

        {/* Connect & Explore Section */}
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-semibold text-foreground mb-8 text-center">
            Connect & Explore
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {connectCards.map((card, index) => {
              const IconComponent = card.icon;
              const accentColors = [
                "bg-accent-blue/5 hover:bg-accent-blue/10 border-accent-blue/20",
                "bg-accent-green/5 hover:bg-accent-green/10 border-accent-green/20", 
                "bg-accent-yellow/5 hover:bg-accent-yellow/10 border-accent-yellow/20",
                "bg-accent-red/5 hover:bg-accent-red/10 border-accent-red/20",
                "bg-accent-blue/5 hover:bg-accent-blue/10 border-accent-blue/20",
                "bg-accent-green/5 hover:bg-accent-green/10 border-accent-green/20"
              ];
              
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

        {/* Sponsor Section */}
        <div className="text-center mt-16">
          <Button 
            variant="default" 
            onClick={() => window.open("https://github.com/sponsors/dcyfr", "_blank")}
          >
            Sponsor on GitHub
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;