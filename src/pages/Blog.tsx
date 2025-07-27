import { SEOHead } from "@/components/SEOHead";
import { PageTransition } from "@/components/PageTransition";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAllBlogPosts, getAllTags } from "@/lib/blog";
import { BlogBreadcrumb } from "@/components/BlogBreadcrumb";
import { BlogListSkeleton } from "@/components/BlogPostSkeleton";
import { Input } from "@/components/ui/input";
import { AppHeader } from "@/components/AppHeader";
import { Search, FileText, Tag } from "lucide-react";

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
        <AppHeader />
        <div className="flex w-full min-h-screen">
          {/* Desktop Sidebar - Fixed width, takes up space */}
          <aside className="hidden lg:block w-80 border-r border-border bg-card pt-20">
            <div className="sticky top-0 h-screen overflow-y-auto px-4 py-6">
              {/* Search Section */}
              <div className="mb-8">
                <div className="flex items-center gap-2 text-sm font-medium mb-3">
                  <Search className="w-4 h-4" />
                  Search
                </div>
                <Input
                  type="text"
                  placeholder="Search posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </div>

              {/* Recent Posts */}
              <div className="mb-8">
                <div className="flex items-center gap-2 text-sm font-medium mb-3">
                  <FileText className="w-4 h-4" />
                  Recent Posts
                </div>
                <div className="space-y-3">
                  {allPosts.slice(0, 5).map((post, index) => (
                    <div
                      key={index}
                      onClick={() => handlePostClick(post.slug)}
                      className="p-3 rounded-lg hover:bg-accent/50 cursor-pointer transition-colors"
                    >
                      <div className="font-medium text-sm line-clamp-2 text-left mb-1">
                        {post.title}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {post.date}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Categories/Tags */}
              <div>
                <div className="flex items-center gap-2 text-sm font-medium mb-3">
                  <Tag className="w-4 h-4" />
                  Categories
                </div>
                <div className="flex flex-wrap gap-2">
                  {allTags.map((tag, index) => (
                    <Badge
                      key={index}
                      variant={selectedTag === tag ? "default" : "outline"}
                      className="cursor-pointer hover:bg-accent hover:text-accent-foreground transition-all text-xs"
                      onClick={() => handleTagClick(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <main className="flex-1 min-h-screen pt-20">
            <div className="container mx-auto px-6 py-16 max-w-4xl">
              {/* Mobile search and filters */}
              <div className="lg:hidden mb-8 space-y-4">
                <Input
                  type="text"
                  placeholder="Search posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
                <div className="flex flex-wrap gap-2">
                  {allTags.map((tag, index) => (
                    <Badge
                      key={index}
                      variant={selectedTag === tag ? "default" : "outline"}
                      className="cursor-pointer hover:bg-accent hover:text-accent-foreground transition-all text-xs"
                      onClick={() => handleTagClick(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
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
      </PageTransition>
    </>
  );
};

export default Blog;