import React, { useEffect, useState } from "react";
import { 
  Github, 
  Linkedin, 
  Mail, 
  MapPin, 
  Clock,
  Shield,
  Code2,
  BookOpen,
  Award,
  ExternalLink,
  FileText,
  Rss,
  Star,
  Users,
  TrendingUp,
  Calendar,
  Coffee,
  ArrowUpRight
} from "lucide-react";
import { SEOHead } from "@/components/SEOHead";
import { PageTransition } from "@/components/PageTransition";
import { QuickAction, StatItem, SkillBadge } from "@/components/HomeComponents";
import { getAllBlogPosts } from "@/lib/blog";
import Profile from "@/assets/profile.png";

const Home = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [blogPosts, setBlogPosts] = useState<any[]>([]);

  useEffect(() => {
    // Update time every minute
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    
    // Load recent blog posts
    const loadBlogPosts = async () => {
      const posts = await getAllBlogPosts();
      setBlogPosts(posts.slice(0, 2)); // Get latest 2 posts
    };
    
    loadBlogPosts();
    return () => clearInterval(timer);
  }, []);

  const timeInEST = currentTime.toLocaleTimeString('en-US', { 
    timeZone: 'America/New_York',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  const quickActions = [
    {
      icon: Rss,
      label: "Read My Blog",
      href: "/blog",
      variant: "primary" as const
    },
    {
      icon: FileText,
      label: "View Resume",
      href: "/resume"
    },
    {
      icon: Github,
      label: "GitHub Projects",
      href: "https://github.com/dcyfr",
      external: true
    },
    {
      icon: Linkedin,
      label: "Connect on LinkedIn",
      href: "https://www.linkedin.com/in/dcyfr",
      external: true
    },
    {
      icon: Award,
      label: "View Credentials",
      href: "https://www.credly.com/users/dcyfr",
      external: true
    },
    {
      icon: Mail,
      label: "Send an Email",
      href: "mailto:contact@cyberdrew-dev.com",
      external: true
    }
  ];

  const stats = [
    { number: "8+", label: "Years Experience" },
    { number: "25+", label: "Certifications" },
    { number: "50+", label: "Projects" },
    { number: "5+", label: "Publications" }
  ];

  const expertise = [
    { skill: "Zero Trust Architecture", level: "expert" as const },
    { skill: "Cloud Security", level: "expert" as const },
    { skill: "Threat Analysis", level: "expert" as const },
    { skill: "Penetration Testing", level: "advanced" as const },
    { skill: "Incident Response", level: "advanced" as const },
    { skill: "Secure Development", level: "advanced" as const },
    { skill: "Risk Assessment", level: "expert" as const },
    { skill: "Compliance", level: "advanced" as const }
  ];

  return (
    <>
      <SEOHead 
        title="Drew - Cybersecurity Architect & Engineer" 
        description="Cybersecurity expert specializing in security architecture, threat analysis, and secure development practices. Connect with Drew for insights on zero trust, enterprise security, and more." 
        keywords="cybersecurity, security architect, threat analysis, zero trust, Drew, cyber engineer, security consultant" 
      />
      
      <PageTransition>
        <main className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
          <div className="container mx-auto px-6 py-12 max-w-4xl">
            
            {/* Hero Section */}
            <div className="text-center mb-16 animate-fade-in">
              <div className="relative inline-block mb-6">
                <div className="w-32 h-32 rounded-2xl overflow-hidden border-4 border-border shadow-2xl shadow-primary/20 mx-auto">
                  <img 
                    src={Profile} 
                    alt="Drew's Profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-2 border-background animate-pulse"></div>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
                Hey, I'm <span className="text-primary">Drew</span> ✨
              </h1>
              
              <p className="text-xl text-muted-foreground mb-6 max-w-2xl mx-auto leading-relaxed">
                Cybersecurity Architect & Engineer crafting secure digital experiences through 
                <span className="text-primary font-medium"> zero trust architecture</span>, 
                <span className="text-primary font-medium"> threat analysis</span>, and 
                <span className="text-primary font-medium"> secure development</span>.
              </p>
              
              <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground mb-8">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>Washington, DC</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{timeInEST} EST</span>
                </div>
                <div className="flex items-center gap-2">
                  <Coffee className="w-4 h-4" />
                  <span>Available for consulting</span>
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 animate-fade-in">
              {stats.map((stat, index) => (
                <div key={index} style={{ animationDelay: `${index * 100}ms` }}>
                  <StatItem number={stat.number} label={stat.label} />
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="mb-16 animate-fade-in" style={{ animationDelay: '400ms' }}>
              <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
                Connect & Explore
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quickActions.map((action, index) => (
                  <div key={index} style={{ animationDelay: `${(index + 5) * 100}ms` }}>
                    <QuickAction
                      icon={action.icon}
                      label={action.label}
                      href={action.href}
                      variant={action.variant}
                      external={action.external}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Expertise Section */}
            <div className="mb-16 animate-fade-in" style={{ animationDelay: '800ms' }}>
              <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
                Core Expertise
              </h2>
              <div className="flex flex-wrap gap-3 justify-center">
                {expertise.map((item, index) => (
                  <div key={index} style={{ animationDelay: `${(index + 10) * 50}ms` }}>
                    <SkillBadge skill={item.skill} level={item.level} />
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            {blogPosts.length > 0 && (
              <div className="animate-fade-in" style={{ animationDelay: '1000ms' }}>
                <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
                  Latest Insights
                </h2>
                <div className="grid gap-6 md:grid-cols-2">
                  {blogPosts.map((post, index) => (
                    <div 
                      key={index}
                      className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover-scale cursor-pointer"
                      onClick={() => window.location.href = `/blog/${post.slug}`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <span className="text-xs text-muted-foreground font-mono">
                          {post.date}
                        </span>
                        <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-2 line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="w-3 h-3 mr-1" />
                        {post.readTime}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="text-center mt-16 pt-8 border-t border-border animate-fade-in" style={{ animationDelay: '1200ms' }}>
              <p className="text-muted-foreground text-sm mb-4">
                Building secure digital futures, one architecture at a time
              </p>
              <div className="flex justify-center gap-4">
                <a 
                  href="https://github.com/dcyfr" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-muted/50 hover:bg-primary/10 transition-colors hover-scale"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
                </a>
                <a 
                  href="https://www.linkedin.com/in/dcyfr" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-muted/50 hover:bg-primary/10 transition-colors hover-scale"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
                </a>
                <a 
                  href="mailto:contact@cyberdrew-dev.com"
                  className="p-2 rounded-lg bg-muted/50 hover:bg-primary/10 transition-colors hover-scale"
                  aria-label="Send Email"
                >
                  <Mail className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
                </a>
              </div>
            </div>
          </div>
        </main>
      </PageTransition>
    </>
  );
};

export default Home;