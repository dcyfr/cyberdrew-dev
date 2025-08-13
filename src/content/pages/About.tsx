import { FC } from "react";
import { PageLayout } from "@/components/PageLayout";
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
        <main className="space-y-8 max-w-4xl mx-auto px-4 py-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl">About Me</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                As a <Link to="/resume" className="text-primary font-semibold">Security Architect</Link>, I specialize in designing robust, cybersecurity frameworks that protect digital ecosystems. My passion lies in developing innovative solutions that anticipate and mitigate emerging cyber threats through strategic architectural design.
              </p>
              <div className="flex flex-wrap gap-2">
                {interests.map((interest) => (
                  <Badge key={interest} variant="outline">{interest}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-3xl">About This Site</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                This site is built using cutting-edge web technologies, following best practices for accessibility, performance, and security.
              </p>
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech) => (
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
            </CardContent>
          </Card>
        </main>
      </PageLayout>
    </>
  );
};

export default About;
