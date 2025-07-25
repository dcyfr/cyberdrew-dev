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
import { BlogListSkeleton } from "@/components/BlogPostSkeleton";

const Blog = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Get all posts and tags from markdown files
  const allPosts = getAllBlogPosts();
  const allTags = getAllTags();
  
  // Get tag counts
  const tagCounts = allTags.reduce((acc, tag) => {
    acc[tag] = allPosts.filter(post => post.tags.includes(tag)).length;
    return acc;
  }, {} as Record<string, number>);

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

  console.log("Blog Debug:", {
    totalPosts: allPosts.length,
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
    setSelectedTag(selectedTag === tag ? "" : tag);
  };

  return (
    <>
      <SEOHead
        title="Blog - Drew's Lab"
        description="Insights on cybersecurity, security architecture, threat analysis, and secure development practices from a cybersecurity expert."
        keywords="cybersecurity blog, security architecture, threat analysis, zero trust, MFA, enterprise security"
      />
      <main id="main-content" className="min-h-screen">
        <div className="container mx-auto px-6 py-16 max-w-4xl">
          {/* Header */}
          <div className="mb-12">
            <div className="flex justify-between items-start mb-8">
              <Button 
                variant="ghost" 
                onClick={() => navigate("/")}
                className="-ml-3"
                aria-label="Go back to home page"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <ThemeToggle />
            </div>
          
          <BlogBreadcrumb currentPage="Blog" />
          
          <h1 className="text-4xl font-bold text-foreground mb-4">Blog</h1>
          <p className="text-muted-foreground text-lg">
            Thoughts on cybersecurity, technology, and digital resilience.
          </p>
        </div>

        <div className="space-y-8">
          {/* Search and Filters */}
          <div className="flex flex-col gap-4 mb-8">
            <div className="relative max-w-md">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              <Badge 
                variant={selectedTag === "" ? "default" : "outline"}
                className="cursor-pointer hover:bg-primary/90 transition-colors"
                onClick={() => handleTagClick("")}
              >
                All ({allPosts.length})
              </Badge>
              {allTags.map((tag) => (
                <Badge
                  key={tag}
                  variant={selectedTag === tag ? "default" : "outline"}
                  className="cursor-pointer hover:bg-primary/90 transition-colors"
                  onClick={(e) => handleTagClick(tag, e)}
                >
                  {tag} ({tagCounts[tag]})
                </Badge>
              ))}
            </div>
          </div>

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
                className="cursor-pointer group border-b border-border pb-8 last:border-b-0"
                onClick={() => handlePostClick(post.slug)}
              >
                <div className="space-y-3">
                  <h2 className="text-xl font-medium text-foreground group-hover:text-muted-foreground transition-colors">
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
                        className="cursor-pointer hover:bg-accent transition-colors text-xs"
                        onClick={(e) => handleTagClick(tag, e)}
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
    </>
  );
};

export default Blog;