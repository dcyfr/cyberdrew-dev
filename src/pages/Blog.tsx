import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";

const Blog = () => {
  const navigate = useNavigate();

  const blogPosts = [
    {
      title: "Implementing Multi-Factor Authentication: Security Best Practices",
      date: "April 16, 2025",
      readTime: "3 min read",
      excerpt: "Learn how to properly implement MFA across your organization to significantly reduce security breaches and protect against credential-based attacks.",
      tags: ["Authentication", "MFA", "Best Practices"],
      slug: "implementing-mfa-security-best-practices",
    },
    {
      title: "Securing Remote Work: An Enterprise Security Guide",
      date: "March 21, 2025",
      readTime: "6 min read",
      excerpt: "Learn how to implement comprehensive security controls for remote work environments while maintaining productivity and user experience.",
      tags: ["Remote Work", "Endpoint Security", "Zero Trust"],
      slug: "securing-remote-work-enterprise-guide",
    },
    {
      title: "Zero Trust Architecture: Fundamentals and Implementation",
      date: "February 11, 2025",
      readTime: "3 min read",
      excerpt: "Explore the core principles of Zero Trust architecture and learn how this security model is revolutionizing enterprise cybersecurity strategies.",
      tags: ["Zero Trust", "Network Security", "Architecture"],
      slug: "zero-trust-architecture-fundamentals",
    },
    {
      title: "Getting Started with Cybersecurity: A Beginner's Guide",
      date: "January 6, 2025",
      readTime: "8 min read",
      excerpt: "A comprehensive introduction to cybersecurity fundamentals for newcomers to the field, covering essential concepts and career pathways.",
      tags: ["Beginner", "Career", "Fundamentals"],
      slug: "getting-started-with-cybersecurity",
    },
    {
      title: "Cloud Security Best Practices for AWS, Azure, and GCP",
      date: "December 15, 2024",
      readTime: "10 min read",
      excerpt: "Master cloud security across major platforms with practical guidance on securing your cloud infrastructure and applications.",
      tags: ["Cloud Security", "AWS", "Azure", "GCP"],
      slug: "cloud-security-best-practices",
    },
    {
      title: "The Evolution of Incident Response in Modern Organizations",
      date: "November 28, 2024",
      readTime: "7 min read",
      excerpt: "How incident response has evolved with modern threats and the tools and processes needed for effective security incident management.",
      tags: ["Incident Response", "SOC", "Threat Hunting"],
      slug: "evolution-of-incident-response",
    },
  ];

  const handlePostClick = (slug: string) => {
    // In a real implementation, this would navigate to the individual blog post
    console.log(`Navigate to blog post: ${slug}`);
  };

  const handleTagClick = (tag: string) => {
    console.log(`Filter by tag: ${tag}`);
  };

  return (
    <div className="min-h-screen bg-background dark">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
            className="mb-6 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          
          <h1 className="text-4xl font-bold text-foreground mb-4">Blog</h1>
          <p className="text-muted-foreground">
            Thoughts on cybersecurity, technology, and industry insights
          </p>
        </div>

        {/* Blog Posts */}
        <div className="space-y-8">
          {blogPosts.map((post, index) => (
            <Card 
              key={index} 
              className="cursor-pointer hover:shadow-lg transition-all duration-200 bg-card border-border"
              onClick={() => handlePostClick(post.slug)}
            >
              <CardContent className="p-6">
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-card-foreground hover:text-accent transition-colors">
                    {post.title}
                  </h2>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{post.date}</span>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag, tagIndex) => (
                      <Badge 
                        key={tagIndex} 
                        variant="secondary"
                        className="cursor-pointer hover:bg-accent transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTagClick(tag);
                        }}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center text-accent hover:text-accent/80 transition-colors">
                    <span className="text-sm font-medium">Read More</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;