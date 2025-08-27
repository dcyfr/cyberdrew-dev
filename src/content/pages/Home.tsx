// CSS-based animations via tailwindcss-animate; remove framer-motion for faster first load
import { PageTransition } from '@/components/PageTransition';
import { FileBadge, FileText, Github, LibraryBig, Linkedin, Rss, HeartHandshake, Mail } from "lucide-react";
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
import DisplayPicture from "@/assets/logo.webp";
import { Link } from 'react-router-dom';
import { FadeSlideIn } from "@/components/anim/FadeSlideIn";
import { AnimatedBackground } from "@/components/AnimatedBackground";

const Home = () => {

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
    }
  ];

  // no-op: using semantic Link/anchor wrappers for accessibility instead of onClick

  return (
    <>
      <SEOHead 
        title="Cyber Drew's Lab"
        description="Cybersecurity expert specializing in security architecture, threat analysis, and secure development practices."
        keywords="cybersecurity, security architecture, threat analysis, zero trust, MFA, enterprise security, security consultant"
      />
      <PageLayout maxWidth="2xl">
        <AnimatedBackground />
        <PageTransition animated={false}>
          <div className="relative z-10 mt-14 sm:mt-16 lg:mt-20 flex flex-col items-center">
            {/* Display Picture */}
            <FadeSlideIn className="transition-transform hover:scale-105 motion-reduce:transform-none" durationMs={450} delayMs={80}>
              <Avatar className="w-32 h-32 mb-6 rounded-full ring-2 ring-border ring-offset-2 ring-offset-background shadow-sm">
                <AvatarImage src={DisplayPicture} alt="Drew's display picture" loading="eager" decoding="async" />
                <AvatarFallback>D</AvatarFallback>
              </Avatar>
            </FadeSlideIn>

            {/* Profile Name and Title */}
            <FadeSlideIn intensity={2} durationMs={350} delayMs={120}>
              <h1 className="theme-heading-1 text-center text-primary">
                It's Drew <span aria-hidden="true" className="font-sans not-italic ml-2">&#10022;</span>
              </h1>
            </FadeSlideIn>

            {/* Links Section */}
            <nav aria-label="Primary links" className="w-full mt-8">
              <div className="mx-auto w-full max-w-2xl grid grid-cols-1 gap-4 sm:grid-cols-2 items-stretch">
                {connectCards.map((card, idx) => {
                  const Icon = card.icon;
                  const content = (
                    <Card className="card-interactive group h-full flex flex-col">
                      <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                        <Icon aria-hidden className="w-6 h-6 text-primary" />
                        <CardTitle className="transition-colors group-hover:text-primary font-semibold">{card.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="mb-2">{card.description}</CardDescription>
                      </CardContent>
                    </Card>
                  );

                  return (
                    <FadeSlideIn key={card.title} delayMs={200 + idx * 80} durationMs={280} className="h-full">
                      {card.internal ? (
                        <Link to={card.link} aria-label={card.title} className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-lg">
                          {content}
                        </Link>
                      ) : (
                        <a href={card.link} aria-label={card.title} target="_blank" rel="noopener noreferrer" className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-lg">
                          {content}
                        </a>
                      )}
                    </FadeSlideIn>
                  );
                })}
              </div>
            </nav>
          </div>
        </PageTransition>
      </PageLayout>
    </>
  );
};

export default Home;
