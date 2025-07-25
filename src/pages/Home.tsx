import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import drewProfile from "@/assets/drew-profile.png";
import { ExternalLink, FileText, Github, Linkedin, Award, BookOpen } from "lucide-react";

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
    <div className="min-h-screen cyber-bg dark">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="flex flex-col items-center text-center mb-16 pt-16">
          <div className="mb-8">
            <img
              src={drewProfile}
              alt="Drew"
              className="w-32 h-32 rounded-full border-4 border-border object-cover"
            />
          </div>
          
          <h1 className="text-5xl font-bold text-foreground mb-4">
            Hi, I'm Drew
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8">
            Cybersecurity Architect & Independent Researcher
          </p>
          
          <div className="flex gap-4">
            <Button 
              variant="nav" 
              onClick={() => navigate("/blog")}
              className="px-6"
            >
              Blog
            </Button>
            <Button 
              variant="nav" 
              onClick={() => navigate("/resume")}
              className="px-6"
            >
              Resume
            </Button>
          </div>
        </div>

        {/* Connect & Explore Section */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-4 text-center">
            Connect & Explore
          </h2>
          <p className="text-muted-foreground text-center mb-12">
            Discover my work and connect across the web
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {connectCards.map((card, index) => {
              const IconComponent = card.icon;
              return (
                <Card 
                  key={index} 
                  className="cursor-pointer hover:shadow-lg transition-all duration-200 bg-card border-border hover:scale-105"
                  onClick={() => handleCardClick(card.link, card.internal)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3">
                      <IconComponent className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-semibold text-card-foreground">
                            {card.title}
                          </h3>
                          {!card.internal && (
                            <ExternalLink className="w-4 h-4 text-muted-foreground" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">
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
            variant="cyber" 
            onClick={() => window.open("https://github.com/sponsors/dcyfr", "_blank")}
            className="px-8"
          >
            Sponsor on GitHub
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;