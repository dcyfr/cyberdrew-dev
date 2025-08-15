import { FC } from "react";
import { PageLayout } from "@/components/PageLayout";
import { PageTransition } from "@/components/PageTransition";
import { SEOHead } from "@/components/SEOHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { Link } from "react-router-dom";
import { FadeSlideIn } from "@/components/anim/FadeSlideIn";

/**
 * About page for CyberDrew.
 * Provides information about the site and its creator.
 */
const About: FC = () => {
  const technologies = [
    { name: "TypeScript", link: "https://www.typescriptlang.org/" },
    { name: "React", link: "https://reactjs.org/" },
    { name: "Vite", link: "https://vitejs.dev/" },
    { name: "Tailwind CSS", link: "https://tailwindcss.com/" },
    { name: "shadcn/ui", link: "https://ui.shadcn.com/" }
  ];

  const interests = [
    "Cybersecurity Architecture",
    "Zero Trust Design",
    "AI & Machine Learning",
    "Cloud Security",
    "Software Development",
    "Threat Modeling"
  ];

  return (
    <>
      <SEOHead title="About" description="Learn more about this website and its creator." />
      <PageLayout>
        <PageTransition animated={false}>
          {/* Page Header */}
          <FadeSlideIn intensity={2} durationMs={360}>
            <div className="space-y-4 mb-8 sm:mb-12">
              <h1 className="theme-heading-1">About</h1>
              <p className="theme-text-muted text-lg">
                As a <Link to="/resume" className="text-primary font-semibold">Security Architect</Link>, I specialize in designing robust, cybersecurity frameworks that protect digital ecosystems. My passion lies in developing innovative solutions that anticipate and mitigate emerging cyber threats through strategic architectural design.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {interests.map((interest) => (
                  <Badge key={interest} variant="outline">{interest}</Badge>
                ))}
              </div>
            </div>
          </FadeSlideIn>

          {/* Page Content */}
          <FadeSlideIn delayMs={120}>
            <div className="space-y-4 mb-8 sm:mb-12">
              <h2 className="theme-heading-2">Technologies</h2>
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech, index) => (
                  <TooltipProvider key={tech.name}>
                    <Tooltip>
                      <TooltipTrigger>
                        <Badge
                          variant="outline"
                          className="cursor-pointer hover:bg-accent"
                          onClick={() => window.open(tech.link, '_blank', 'noopener,noreferrer')}
                        >
                          {tech.name}
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        Visit {tech.name} website
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </div>
            </div>
          </FadeSlideIn>
        </PageTransition>
      </PageLayout>
    </>
  );
};

export default About;
