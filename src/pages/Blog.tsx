import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { getAllBlogPosts, getAllTags } from "@/lib/blog";
import { ThemeToggle } from "@/components/theme-toggle";
import { SEOHead } from "@/components/SEOHead";
import { BlogBreadcrumb } from "@/components/BlogBreadcrumb";
import { EnhancedSearch } from "@/components/EnhancedSearch";
import { ShareButtons } from "@/components/ShareButtons";
import { PageTransition } from "@/components/PageTransition";
import { BlogListSkeleton } from "@/components/BlogPostSkeleton";

const Blog = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Get all posts and tags from markdown files
  const allPosts = getAllBlogPosts();
  const allTags = getAllTags();

  useEffect(() => {
    // Simulate loading time for better UX
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  // Filter posts based on search and tag
  const filteredPosts = allPosts.filter(post => {
    const matchesSearch = searchQuery === "" || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesTag = selectedTag === "" || post.tags.includes(selectedTag);
    
    return matchesSearch && matchesTag;
  });

  const handlePostClick = (slug: string) => {
    navigate(`/blog/${slug}`);
  };

  const handleTagClick = (tag: string) => {
    setSelectedTag(selectedTag === tag ? "" : tag);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
  };

  return (
    <>
      <SEOHead
        title="Blog - Drew's Lab"
        description="Insights on cybersecurity, security architecture, threat analysis, and secure development practices from a cybersecurity expert."
        keywords="cybersecurity blog, security architecture, threat analysis, zero trust, MFA, enterprise security"
      />
      <PageTransition>
        <main id="main-content" className="min-h-screen">
          <div className="container mx-auto px-6 py-16 max-w-4xl">
            {/* Header */}
            <div className="mb-12">
              <div className="flex justify-between items-start mb-8">
                <Button 
                  variant="ghost" 
                  onClick={() => navigate("/")}
                  className="-ml-3 hover:scale-105 transition-transform duration-200"
                  aria-label="Go back to home page"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <div className="flex items-center gap-4">
                  <ShareButtons 
                    title="Drew's Lab Blog"
                    excerpt="Cybersecurity insights and technical expertise"
                    showRSS={true}
                  />
                  <ThemeToggle />
                </div>
              </div>
            
            <BlogBreadcrumb currentPage="Blog" />
            
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-foreground mb-4">Blog</h1>
              <p className="text-muted-foreground text-lg">
                Thoughts on cybersecurity, technology, and digital resilience.
              </p>
            </div>
          </div>

          <div className="space-y-8">
            {/* Enhanced Search and Filters */}
            <EnhancedSearch
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedTag={selectedTag}
              onTagChange={handleTagClick}
              onSuggestionClick={handleSuggestionClick}
            />

            {/* Blog Posts */}
            <div className="space-y-8">
              {isLoading ? (
                <BlogListSkeleton />
              ) : filteredPosts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No posts found matching your search.</p>
                </div>
              ) : (
                filteredPosts.map((post, index) => (
                <div 
                  key={index} 
                  className="cursor-pointer group rounded-xl border border-border/30 hover:border-border/60 p-6 hover:shadow-[0_4px_20px_rgb(0,0,0,0.05)] dark:hover:shadow-[0_4px_20px_rgb(0,0,0,0.2)] transition-all duration-300 hover:-translate-y-1 bg-card/40 backdrop-blur-sm"
                  onClick={() => handlePostClick(post.slug)}
                >
                  <div className="space-y-4">
                    <h2 className="text-xl font-medium text-foreground group-hover:text-primary transition-colors story-link">
                      {post.title}
                    </h2>
                    
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
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
                          variant="outline"
                          className="cursor-pointer hover-scale transition-all text-xs"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleTagClick(tag);
                          }}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                ))
              )}
            </div>
          </div>
          </div>
        </main>
      </PageTransition>
    </>
  );
};

export default Blog;