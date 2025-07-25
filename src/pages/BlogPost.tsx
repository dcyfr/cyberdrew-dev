import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const BlogPost = () => {
  const navigate = useNavigate();
  const { slug } = useParams();

  // Blog post content based on slug
  const blogContent: Record<string, any> = {
    "implementing-mfa-security-best-practices": {
      title: "Implementing Multi-Factor Authentication: Security Best Practices",
      date: "April 16, 2025",
      readTime: "3 min read",
      content: `
        <p>Multi-Factor Authentication (MFA) has become a critical security control in today's threat landscape. With credential-based attacks accounting for over 80% of data breaches, implementing MFA properly can be the difference between a secure organization and a compromised one.</p>

        <h2>Understanding MFA Fundamentals</h2>
        <p>MFA works on three fundamental authentication factors:</p>
        <ul>
          <li><strong>Something you know</strong> (passwords, PINs)</li>
          <li><strong>Something you have</strong> (phones, tokens, smart cards)</li>
          <li><strong>Something you are</strong> (biometrics, behavioral patterns)</li>
        </ul>
        <p>The key to effective MFA is combining at least two of these factors to create a security barrier that's exponentially harder to breach than single-factor authentication.</p>

        <h2>Choosing the Right MFA Methods</h2>
        
        <h3>Hardware Security Keys</h3>
        <p>Hardware tokens like YubiKeys provide the highest security level. They're resistant to phishing attacks and don't rely on network connectivity. Consider these for:</p>
        <ul>
          <li>Administrative accounts</li>
          <li>High-privilege users</li>
          <li>Remote workers in high-risk environments</li>
        </ul>

        <h3>Authenticator Apps</h3>
        <p>Time-based One-Time Passwords (TOTP) through apps like Google Authenticator or Authy offer a good balance of security and usability. They work offline and are less susceptible to SIM swapping attacks than SMS.</p>

        <h2>Implementation Strategy</h2>
        
        <h3>Phase 1: Risk Assessment</h3>
        <p>Start by identifying your most critical assets and users. Prioritize MFA deployment for:</p>
        <ul>
          <li>Administrative accounts</li>
          <li>Financial systems access</li>
          <li>Customer data repositories</li>
          <li>Remote access solutions</li>
        </ul>

        <h3>Phase 2: Pilot Program</h3>
        <p>Begin with a small group of tech-savvy users to test the chosen MFA solution and develop support procedures.</p>

        <h3>Phase 3: Gradual Rollout</h3>
        <p>Deploy MFA in waves, starting with the highest-risk accounts and gradually expanding to all users.</p>
      `
    },
    "securing-remote-work-enterprise-guide": {
      title: "Securing Remote Work: An Enterprise Security Guide",
      date: "March 21, 2025",
      readTime: "6 min read",
      content: `
        <p>The shift to remote work has fundamentally changed the security landscape. Organizations must now protect distributed workforces while maintaining productivity and user experience.</p>

        <h2>Zero Trust for Remote Work</h2>
        <p>Implementing Zero Trust principles is essential for remote work security:</p>
        <ul>
          <li>Never trust, always verify</li>
          <li>Least privilege access</li>
          <li>Continuous monitoring</li>
        </ul>

        <h2>Endpoint Security</h2>
        <p>Securing remote endpoints requires:</p>
        <ul>
          <li>Endpoint Detection and Response (EDR)</li>
          <li>Device encryption</li>
          <li>Regular security updates</li>
          <li>VPN solutions</li>
        </ul>

        <h2>Best Practices</h2>
        <p>Key strategies for remote work security include comprehensive training, regular security assessments, and implementing proper access controls.</p>
      `
    },
    "zero-trust-architecture-fundamentals": {
      title: "Zero Trust Architecture: Fundamentals and Implementation",
      date: "February 11, 2025", 
      readTime: "3 min read",
      content: `
        <p>Zero Trust architecture represents a fundamental shift from traditional perimeter-based security to a model where trust is never assumed and verification is required from everyone trying to access resources.</p>

        <h2>Core Principles</h2>
        <p>Zero Trust is built on several key principles:</p>
        <ul>
          <li><strong>Never trust, always verify</strong> - Every user and device must be authenticated and authorized</li>
          <li><strong>Least privilege access</strong> - Users get only the minimum access needed</li>
          <li><strong>Assume breach</strong> - Design systems assuming attackers are already inside</li>
        </ul>

        <h2>Implementation Components</h2>
        <p>A successful Zero Trust implementation includes:</p>
        <ul>
          <li>Identity and Access Management (IAM)</li>
          <li>Multi-Factor Authentication (MFA)</li>
          <li>Network segmentation</li>
          <li>Continuous monitoring</li>
        </ul>

        <h2>Getting Started</h2>
        <p>Begin your Zero Trust journey by inventorying your assets, mapping data flows, and implementing strong identity controls.</p>
      `
    },
    "getting-started-with-cybersecurity": {
      title: "Getting Started with Cybersecurity: A Beginner's Guide",
      date: "January 6, 2025",
      readTime: "2 min read", 
      content: `
        <p>Cybersecurity is one of the fastest-growing fields in technology, offering diverse career paths and excellent job security. This guide will help you understand the fundamentals and start your journey.</p>

        <h2>What is Cybersecurity?</h2>
        <p>Cybersecurity involves protecting digital systems, networks, and data from cyber threats. It encompasses:</p>
        <ul>
          <li>Information security</li>
          <li>Network security</li>
          <li>Application security</li>
          <li>Operational security</li>
        </ul>

        <h2>Common Threats</h2>
        <p>Understanding common cyber threats is essential:</p>
        <ul>
          <li><strong>Malware</strong> - Viruses, ransomware, trojans</li>
          <li><strong>Phishing</strong> - Fraudulent emails and websites</li>
          <li><strong>Social engineering</strong> - Manipulating people to reveal information</li>
          <li><strong>Data breaches</strong> - Unauthorized access to sensitive data</li>
        </ul>

        <h2>Getting Started</h2>
        <p>To begin your cybersecurity journey:</p>
        <ol>
          <li>Learn the fundamentals</li>
          <li>Get hands-on experience</li>
          <li>Pursue relevant certifications</li>
          <li>Network with professionals</li>
        </ol>

        <h2>Career Paths</h2>
        <p>Cybersecurity offers diverse career opportunities including security analyst, penetration tester, security architect, and incident response specialist.</p>
      `
    }
  };

  const post = blogContent[slug || ""];

  if (!post) {
    return (
      <div className="min-h-screen cyber-bg dark">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/blog")}
            className="mb-6 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Button>
          <h1 className="text-4xl font-bold text-foreground">Post Not Found</h1>
          <p className="text-muted-foreground mt-4">The blog post you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen cyber-bg dark">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/blog")}
          className="mb-6 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blog
        </Button>
        
        <article className="prose prose-invert max-w-none">
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">{post.title}</h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>
          </header>
          
          <div 
            className="text-foreground leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </div>
    </div>
  );
};

export default BlogPost;