import { 
  ExternalLink, 
  FileBadge, 
  FileText, 
  Github, 
  LibraryBig, 
  Linkedin, 
  Rss, 
  HeartHandshake 
} from "lucide-react";
import { SEOHead } from "@/components/SEOHead";
import { PageTransition } from "@/components/PageTransition";
import { PageLayout } from "@/components/PageLayout";
import { LinkCard } from "@/components/LinkCard";
import Profile from "@/assets/profile.png";

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
        title="Cyber Drew" 
        description="Cybersecurity expert specializing in security architecture, threat analysis, and secure development practices." 
        keywords="cybersecurity, security architecture, threat analysis, zero trust, MFA, enterprise security, security consultant" 
      />
      <PageTransition>
        <PageLayout showBackButton={false} showThemeToggle={false} maxWidth="6xl">
          {/* Hero Section */}
          <div className="space-y-4 mb-12">
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="modern-card-sm">
                <img 
                  src={Profile} 
                  alt="Drew's Profile" 
                  className="w-24 h-24 rounded-lg object-cover" 
                />
              </div>
              <div className="space-y-4">
                <h1 className="vercel-heading-2 mt-0">It's Drew ✨</h1>
                <p className="vercel-text-muted max-w-md">
                  Cyber Architect, Engineer, and Developer
                </p>
              </div>
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
                />
              ))}
            </div>
          </div>
        </PageLayout>
      </PageTransition>
    </>
  );
};

export default Home;