import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import drewProfile from "@/assets/drew-profile.png";
import { ExternalLink, FileText, Github, Linkedin, Award, BookOpen } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { SEOHead } from "@/components/SEOHead";
import { PageTransition } from "@/components/PageTransition";

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
    <>
      <SEOHead
        title="Drew's Lab - Cybersecurity Expert & Developer"
        description="Cybersecurity expert specializing in security architecture, threat analysis, and secure development practices. Explore insights on zero-trust, MFA, and enterprise security."
        keywords="cybersecurity, security architecture, threat analysis, zero trust, MFA, enterprise security, security consultant"
      />
      <PageTransition>
        <main id="main-content" className="min-h-screen">
          <div className="container mx-auto px-6 py-16 max-w-4xl">
            {/* Theme Toggle */}
            <div className="flex justify-end mb-8">
              <ThemeToggle />
            </div>
          
            {/* Hero Section */}
            <div className="flex flex-col items-center text-center mb-20">
              <div className="mb-8 rounded-xl border border-border/30 hover:border-border/60 p-2 hover:shadow-[0_4px_20px_rgb(0,0,0,0.05)] dark:hover:shadow-[0_4px_20px_rgb(0,0,0,0.2)] transition-all duration-300 hover:-translate-y-1 bg-card/40 backdrop-blur-sm">
                <img
                  src={drewProfile}
                  alt="Drew"
                  className="w-24 h-24 rounded-lg object-cover"
                />
              </div>
              
              <h1 className="text-4xl font-bold text-foreground mb-4 leading-tight">
                Hi, I'm Drew
              </h1>
              
              <p className="text-lg text-muted-foreground mb-8 max-w-md leading-relaxed">
                Cybersecurity Architect & Independent Researcher
              </p>
              
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => navigate("/blog")}
                  className="hover:scale-105 transition-transform duration-200"
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  Blog
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => navigate("/resume")}
                  className="hover:scale-105 transition-transform duration-200"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Resume
                </Button>
              </div>
            </div>

            {/* Connect & Explore Section */}
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-medium text-foreground mb-12 text-center">
                Connect & Explore
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {connectCards.map((card, index) => {
                  const IconComponent = card.icon;
                  
                  return (
                    <div
                      key={index} 
                      className="cursor-pointer group rounded-xl border border-border/30 hover:border-border/60 p-6 hover:shadow-[0_4px_20px_rgb(0,0,0,0.05)] dark:hover:shadow-[0_4px_20px_rgb(0,0,0,0.2)] transition-all duration-300 hover:-translate-y-1 bg-card/40 backdrop-blur-sm"
                      onClick={() => handleCardClick(card.link, card.internal)}
                    >
                      <div className="flex items-start gap-4">
                        <div className="rounded-lg bg-muted/50 p-2">
                          <IconComponent className="w-5 h-5 text-foreground" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-medium text-foreground group-hover:text-primary transition-colors">
                              {card.title}
                            </h3>
                            {!card.internal && (
                              <ExternalLink className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                            )}
                          </div>
                          <p className="text-muted-foreground leading-relaxed">
                            {card.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Sponsor Section */}
            <div className="text-center mt-20">
              <Button 
                variant="default" 
                onClick={() => window.open("https://github.com/sponsors/dcyfr", "_blank")}
                className="hover:scale-105 transition-transform duration-200"
              >
                <Github className="w-4 h-4 mr-2" />
                Sponsor on GitHub
              </Button>
            </div>
          </div>
        </main>
      </PageTransition>
    </>
  );
};

export default Home;