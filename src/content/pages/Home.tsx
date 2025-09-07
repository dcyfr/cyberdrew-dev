// CSS-based animations via tailwindcss-animate; remove framer-motion for faster first load
import { PageTransition } from '@/components/PageTransition';
import { FileBadge, FileText, Github, Linkedin, Rss, HeartHandshake } from "lucide-react";
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
      description: "Insights on security and technology",
      link: "/blog",
      internal: true,
      icon: Rss
    },
    {
      title: "Resume",
      description: "My resume and professional skills",
      link: "/resume",
      internal: true,
      icon: FileText
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
            <FadeSlideIn className="transition-transform `motion-reduce:transform-none" durationMs={450} delayMs={80}>
              <Avatar className="transition-transform motion-reduce:transform-none hover:scale-105 w-28 h-28 mb-6 rounded-full ring-2 ring-border ring-offset-2 ring-offset-background shadow-sm">
                <AvatarImage src={DisplayPicture} alt="Drew's display picture" loading="eager" decoding="async" />
                <AvatarFallback>D</AvatarFallback>
              </Avatar>
            </FadeSlideIn>
            
            {/* Profile Name and Title */}
            <FadeSlideIn intensity={2} durationMs={350} delayMs={120}>
              <h1 className="text-4xl font-bold font-sans tracking-tight text-center text-primary mb-2">
                Hi, I'm Drew <span aria-hidden="true" className="font-sans ml-2">&#10022;</span>
              </h1>
              <p className="text-center text-muted-foreground max-w-md px-4 mb-12 font-sans">
                Cybersecurity Architect
              </p>
            </FadeSlideIn>

            {/* Social Links */}
            <FadeSlideIn className="transition-opacity" durationMs={350} delayMs={160}>
              <div className="flex justify-center space-x-4">
                <a href="https://github.com/dcyfr" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  <Github className="w-6 h-6" />
                </a>
                <a href="https://www.linkedin.com/in/dcyfr" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  <Linkedin className="w-6 h-6" />
                </a>
                <a href="https://www.credly.com/users/dcyfr" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  <FileBadge className="w-6 h-6" />
                </a>
              </div>
            </FadeSlideIn>

            {/* Links Section */}
            <nav aria-label="Primary links" className="w-full mt-8">
              <div className="mx-auto w-full max-w-2xl grid grid-cols-1 gap-4 sm:grid-cols-2 items-stretch px-4">
                {connectCards.map((card, idx) => {
                  const Icon = card.icon;
                  const content = (
                    <Card className="transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.99] group h-full flex flex-col">
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