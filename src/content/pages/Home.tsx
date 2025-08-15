// CSS-based animations via tailwindcss-animate; remove framer-motion for faster first load
import { PageTransition } from '@/components/PageTransition';
import { FileBadge, FileText, Github, LibraryBig, Linkedin, Rss, HeartHandshake } from "lucide-react";
import { SEOHead } from "@/components/SEOHead";
import { PageLayout } from "@/components/PageLayout";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Avatar, 
  AvatarFallback, 
  AvatarImage 
} from "@/components/ui/avatar";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import DisplayPicture from "@/assets/logo.webp";
import { useNavigate } from 'react-router-dom';
import { FadeSlideIn } from "@/components/anim/FadeSlideIn";

const Home = () => {
  const navigate = useNavigate();

  const connectCards = [
    {
      title: "About",
      description: "Learn more about me and this site",
      link: "/about",
      internal: true,
      icon: FileText
    },
    {
      title: "Blog",
      description: "Insights on cybersecurity, tech, and more",
      link: "/blog",
      internal: true,
      icon: Rss
    },
    {
      title: "Resume",
      description: "Professional experience and skills",
      link: "/resume",
      internal: true,
      icon: FileText
    },
    {
      title: "Credentials",
      description: "Certifications and achievements",
      link: "https://www.credly.com/users/dcyfr",
      internal: false,
      icon: FileBadge
    },
    {
      title: "Publications",
      description: "Research papers and articles",
      link: "https://orcid.org/0009-0008-7570-6768",
      internal: false,
      icon: LibraryBig
    },
    {
      title: "Sponsorship",
      description: "Support my work on GitHub",
      link: "https://github.com/sponsors/dcyfr",
      internal: false,
      icon: HeartHandshake
    },
    {
      title: "GitHub",
      description: "Explore my projects and contributions",
      link: "https://github.com/dcyfr",
      internal: false,
      icon: Github
    },
    {
      title: "LinkedIn",
      description: "Connect with me on LinkedIn",
      link: "https://www.linkedin.com/in/dcyfr",
      internal: false,
      icon: Linkedin
    }
  ];

  const handleCardClick = (link: string, internal: boolean) => {
    if (internal) {
      navigate(link);
    } else {
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <>
      <SEOHead 
        title="Cyber Drew's Lab"
        description="Cybersecurity expert specializing in security architecture, threat analysis, and secure development practices."
        keywords="cybersecurity, security architecture, threat analysis, zero trust, MFA, enterprise security, security consultant"
      />
      <PageLayout showBackButton={false} maxWidth="2xl">
        <PageTransition>
          <div className="flex flex-col items-center">
            {/* Display Picture */}
            <FadeSlideIn className="will-change-transform transition-transform hover:scale-110 hover:rotate-[3deg]" durationMs={500} delayMs={200}>
              <Avatar className="w-32 h-32 mb-6 border-2 border-border">
                <AvatarImage src={DisplayPicture} alt="Drew's Display Picture" />
                <AvatarFallback>D</AvatarFallback>
              </Avatar>
            </FadeSlideIn>
            
            {/* Profile Name and Title */}
            <FadeSlideIn intensity={2} durationMs={400}>
              <h1 className="text-4xl font-bold text-primary mb-2 text-center">
                It's Drew &#10022;
              </h1>
              <p className="text-muted-foreground max-w-md mx-auto text-center">
                Cyber Architect, Developer, and Researcher
              </p>
            </FadeSlideIn>

            {/* Links Section */}
    <div className="w-full max-w-md space-y-4 mt-8">
              {connectCards.map((card, idx) => (
                <FadeSlideIn key={card.title} delayMs={150 + idx * 100}>
                  <Card 
                    className="hover:bg-accent/50 hover:scale-105 transition-all duration-200 ease-in-out cursor-pointer" 
                    onClick={() => handleCardClick(card.link, card.internal)}
                  >
                    <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                      <card.icon className="w-6 h-6 text-primary" />
                      <CardTitle>{card.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="mb-2">
                        {card.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </FadeSlideIn>
              ))}
            </div>
          </div>
        </PageTransition>
      </PageLayout>
    </>
  );
};

export default Home;
