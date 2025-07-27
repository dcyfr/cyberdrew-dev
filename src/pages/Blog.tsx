import { SEOHead } from "@/components/SEOHead";
import { PageTransition } from "@/components/PageTransition";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAllBlogPosts, getAllTags } from "@/lib/blog";
import { BlogBreadcrumb } from "@/components/BlogBreadcrumb";
import { BlogListSkeleton } from "@/components/BlogPostSkeleton";
import { BlogSidebar } from "@/components/BlogSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

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
        description="Insights on architecture, cybersecurity, and secure development practices."
        keywords="cybersecurity blog, security architecture, threat analysis, zero trust, MFA, enterprise security"
      />
      <PageTransition>
        <SidebarProvider>
          <div className="min-h-screen flex w-full">
            {/* Sidebar for desktop */}
            <BlogSidebar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedTag={selectedTag}
              onTagChange={handleTagClick}
            />

            <main className="flex-1 min-h-screen">
              <div className="container mx-auto px-6 py-16 max-w-4xl">
                {/* Mobile sidebar trigger */}
                <div className="lg:hidden mb-4">
                  <SidebarTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Menu className="w-4 h-4 mr-2" />
                      Filters & Search
                    </Button>
                  </SidebarTrigger>
                </div>
                
                {/* Page Header */}
                <div className="mb-16">
                  {/* Page Breadcrumbs */}
                  <BlogBreadcrumb currentPage="Blog" />
                  {/* Page Title */}
                  <div className="space-y-6">
                    <h1 className="vercel-heading-2 mt-0">Blog</h1>
                    <p className="vercel-text-muted max-w-2xl">
                      Insights on architecture, cybersecurity, and secure development practices. Explore articles on zero trust, threat analysis, and enterprise security solutions.
                    </p>
                  </div>
                </div>
                
                {/* Blog Posts */}
                <div className="space-y-4">
                  {isLoading ? (
                    <BlogListSkeleton />
                  ) : filteredPosts.length === 0 ? (
                    <div className="text-center py-16">
                      <p className="vercel-text-muted">
                        No posts found matching your criteria. Try adjusting your search or filters.
                      </p>
                    </div>
                  ) : (
                    filteredPosts.map((post, index) => (
                      <div 
                        key={index} 
                        className="modern-card group cursor-pointer"
                        onClick={() => handlePostClick(post.slug)}
                      >
                        <div className="space-y-3">
                          <h2 className="vercel-heading-3 mb-0 mt-0 group-hover:text-foreground transition-colors">
                            {post.title}
                          </h2>
                          
                          <div className="flex items-center gap-2 vercel-text-muted">
                            <span>{post.date}</span>
                            <span>&bull;</span>
                            <span>{post.readTime}</span>
                          </div>
                          
                          <p className="vercel-text text-muted-foreground line-clamp-2">
                            {post.excerpt}
                          </p>
                         
                          <div className="flex flex-wrap gap-2 pt-1">
                            {post.tags.map((tag, tagIndex) => (
                              <Badge 
                                key={tagIndex} 
                                variant="outline"
                                className="cursor-pointer hover:bg-accent hover:text-accent-foreground transition-all text-xs font-medium"
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
            </main>
          </div>
        </SidebarProvider>
      </PageTransition>
    </>
  );
};

export default Blog;