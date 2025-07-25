import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Clock, Search, Tag } from "lucide-react";
import { useState } from "react";

const Blog = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("All Posts");

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
      readTime: "2 min read",
      excerpt: "Learn the fundamental concepts of cybersecurity and discover essential practices to protect yourself and your organization from digital threats.",
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

  // Get all unique tags
  const allTags = ["All Posts", ...Array.from(new Set(blogPosts.flatMap(post => post.tags)))];

  // Filter posts based on search and tag
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesTag = selectedTag === "All Posts" || post.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  console.log("Blog Debug:", {
    totalPosts: blogPosts.length,
    filteredPosts: filteredPosts.length,
    selectedTag,
    searchQuery,
    allTags
  });

  const handlePostClick = (slug: string) => {
    navigate(`/blog/${slug}`);
  };

  const handleTagClick = (tag: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedTag(tag);
  };

  return (
    <div className="min-h-screen cyber-bg dark">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
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
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <span>Home</span>
            <ArrowRight className="w-3 h-3" />
            <span className="text-foreground">Blog</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Search */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Search</h3>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-card border-border"
                />
                <kbd className="absolute right-3 top-1/2 transform -translate-y-1/2 px-2 py-0.5 text-xs text-muted-foreground bg-muted rounded border">
                  ⌘K
                </kbd>
              </div>
            </div>

            {/* Filter by Topic */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Tag className="w-4 h-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold text-foreground">Filter by Topic</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant={selectedTag === tag ? "default" : "secondary"}
                    className="cursor-pointer hover:bg-accent transition-colors"
                    onClick={() => handleTagClick(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Blog Posts */}
          <div className="lg:col-span-3 space-y-6">
            {filteredPosts.map((post, index) => (
              <Card 
                key={index} 
                className="cursor-pointer hover:shadow-lg transition-all duration-200 bg-card border-border group"
                onClick={() => handlePostClick(post.slug)}
              >
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold text-card-foreground group-hover:text-accent transition-colors">
                      {post.title}
                    </h2>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
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
                          onClick={(e) => handleTagClick(tag, e)}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-end text-accent group-hover:text-accent/80 transition-colors">
                      <span className="text-sm font-medium">Read More</span>
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {filteredPosts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No posts found matching your search.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;