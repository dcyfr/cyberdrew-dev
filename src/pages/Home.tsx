import {  
  FileBadge, 
  FileText, 
  Github, 
  LibraryBig, 
  Linkedin, 
  Rss, 
  HeartHandshake, 
  BookOpen
} from "lucide-react";
import { SEOHead } from "@/components/SEOHead";
import { PageTransition } from "@/components/PageTransition";
import { LinkCard } from "@/components/LinkCard";
import { Button } from "@/components/ui/button";
import Profile from "@/assets/profile.png";
import { Logo } from "@/components/Logo";

const Home = () => {
  const connectCards = [
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

  return (
    <>
      <SEOHead 
        title="Cyber Drew's Lab"
        description="Cybersecurity expert specializing in security architecture, threat analysis, and secure development practices."
        keywords="cybersecurity, security architecture, threat analysis, zero trust, MFA, enterprise security, security consultant"
      />
      <PageTransition>
        {/* <AppHeader showBackButton={true} showThemeToggle={true} /> */}
        <div className="min-h-screen pt-20">
          <div className="container mx-auto px-6 py-16 max-w-4xl">
            {/* Hero Section */}
            <div className="flex flex-col items-center text-center mb-12">
              {/* Profile Image */}
              <img src={Profile} alt="Profile" className="rounded-2xl border border-border w-28 h-28 p-2 md:w-32 md:h-32 mb-8 bg-accent/50 hover:bg-accent/65 hover:scale-105 transition-all duration-200" />
              {/* Profile Name and Title */}
              <h1 className="text-4xl font-bold space-x-2 text-primary mb-2">
                <span>It's Drew</span>
                <span className="inline-block">&#10022;</span>
              </h1>
              <p className="text-muted-foreground max-w-2xl leading-relaxed pb-4">
                Cyber Architect, Developer, and Researcher
              </p>
              {/* Call to Action */}
              <div className="flex space-x-4 mt-4">
                <Button 
                  asChild 
                  variant="default" 
                  className="bg-primary text-primary-foreground"
                >
                  <a href="/resume">
                    <FileText className="mr-2" />
                    View Resume
                  </a>
                </Button>
                <Button 
                  asChild 
                  variant="outline" 
                  className="bg-background hover:bg-accent hover:text-accent-foreground text-primary border border-border"
                >
                  <a href="/blog">
                    <BookOpen className="mr-2" />
                    Read My Blog
                  </a>
                </Button>
              </div>
            </div>
            {/* Links Section */}
            <div className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {connectCards.map((card, index) => (
                  <LinkCard
                    key={index}
                    title={card.title}
                    description={card.description}
                    link={card.link}
                    internal={card.internal}
                    icon={card.icon}
                    className="hover:bg-accent/50 hover:scale-105 transition-all duration-200"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </PageTransition>
    </>
  );
};

export default Home;