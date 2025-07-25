import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";

const Index = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-accent/20 to-background"></div>
      
      {/* Floating elements for visual interest */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-accent-blue/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-accent-green/10 rounded-full blur-xl animate-pulse" style={{animationDelay: '1s'}}></div>
      
      <div className="relative flex items-center justify-center min-h-screen">
        <div className="text-center max-w-4xl mx-auto px-6">
          {/* Main hero content */}
          <div className={`transition-all duration-1000 ease-out ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-foreground via-accent-blue to-foreground bg-clip-text text-transparent">
                Drew Cybersecurity
              </span>
            </h1>
          </div>
          
          <div className={`transition-all duration-1000 ease-out delay-300 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              Cybersecurity Architect & Independent Researcher
            </p>
            <p className="text-lg text-muted-foreground/80 mb-12 max-w-2xl mx-auto">
              Exploring the intersection of security, technology, and human behavior through research, writing, and innovation.
            </p>
          </div>
          
          {/* CTA Buttons */}
          <div className={`transition-all duration-1000 ease-out delay-500 flex flex-col sm:flex-row gap-4 justify-center mb-16 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <Button size="lg" className="group bg-accent-blue text-white hover:bg-accent-blue/90 transition-all duration-300 hover:scale-105">
              View My Work
              <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg" className="hover:bg-accent/50 transition-all duration-300 hover:scale-105">
              Read Blog
            </Button>
          </div>
          
          {/* Social Links */}
          <div className={`transition-all duration-1000 ease-out delay-700 flex justify-center gap-6 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <a 
              href="https://github.com/dcyfr" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-card border border-border hover:bg-accent transition-all duration-300 hover:scale-110 group"
            >
              <Github className="h-6 w-6 group-hover:text-accent-blue transition-colors" />
            </a>
            <a 
              href="https://linkedin.com/in/dcyfr" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-card border border-border hover:bg-accent transition-all duration-300 hover:scale-110 group"
            >
              <Linkedin className="h-6 w-6 group-hover:text-accent-blue transition-colors" />
            </a>
            <a 
              href="mailto:contact@drewcyber.com" 
              className="p-3 rounded-full bg-card border border-border hover:bg-accent transition-all duration-300 hover:scale-110 group"
            >
              <Mail className="h-6 w-6 group-hover:text-accent-blue transition-colors" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
