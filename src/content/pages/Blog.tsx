import { SEOHead } from "@/components/SEOHead";
import { PageTransition } from "@/components/PageTransition";
// Removed framer-motion; using CSS-based transitions
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAllBlogPosts, getAllTags } from "@/lib/blog";
import { BlogListSkeleton } from "@/components/BlogPostSkeleton";
import { Input } from "@/components/ui/input";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { FadeSlideIn } from "@/components/anim/FadeSlideIn";
import { useTheme } from "next-themes";
import { PageLayout } from "@/components/PageLayout";
import { BlogSidebar } from "@/components/BlogSidebar";
import { BlogBreadcrumb } from "@/components/BlogBreadcrumb";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const Blog = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { resolvedTheme: theme } = useTheme();

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
        title="Blog - Cyber Drew's Lab"
        description="Insights on architecture, cybersecurity, and secure development practices."
        keywords="cybersecurity blog, security architecture, threat analysis, zero trust, MFA, enterprise security"
      />
  <PageTransition animated={false}>
        <SidebarProvider>
          <BlogSidebar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedTag={selectedTag}
            onTagChange={setSelectedTag}
          />
          <SidebarInset>
            <PageLayout maxWidth="4xl">
              {/* Page Header */}
              <FadeSlideIn className="mb-4 sm:mb-8" intensity={2} durationMs={350}>
                <div className="mb-4">
                  <h1 className="theme-heading-1">Blog</h1>
                  <p className="theme-text-muted text-lg">
                    Insights on architecture, cybersecurity, and secure development practices. Explore articles on zero trust, threat analysis, and enterprise security solutions.
                  </p>
                </div>

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
              </FadeSlideIn>

              {/* Mobile: sidebar trigger + breadcrumbs in one line */}
              <div className="md:hidden mb-4 flex items-center gap-2">
                <SidebarTrigger aria-label="Toggle sidebar" className="h-6 w-6 p-0 shrink-0" />
                <div className="min-w-0 flex-1">
                  <BlogBreadcrumb currentPage="Blog" className="mb-0 truncate h-6 flex items-center" />
                </div>
              </div>

              {/* Blog Posts */}
              <div className="space-y-8 sm:space-y-8 mb-8">
                {isLoading ? (
                  <BlogListSkeleton />
                ) : filteredPosts.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="theme-text-muted text-lg">
                      No posts found matching your criteria. Try adjusting your search or filters.
                    </p>
                  </div>
                ) : (
                  filteredPosts.map((post, index) => (
                    <FadeSlideIn key={`${post.slug}-${post.date}`} delayMs={120 + index * 80} durationMs={280}>
                      <a
                        href={`/blog/${post.slug}`}
                        className="block p-4 sm:p-6 rounded-lg modern-card card-interactive group"
                        onClick={(e) => {
                          e.preventDefault();
                          handlePostClick(post.slug);
                        }}
                      >
                        <div className="flex flex-col sm:flex-row">
                          {post.featureImage && (
                            <div className="w-full sm:w-1/3 lg:w-1/4 mb-6 sm:mb-0 mr-0 sm:mr-6">
                              <AspectRatio ratio={16 / 9}>
                                <img
                                  src={post.featureImage || (theme === "dark" ? "/placeholder_dark.webp" : "/placeholder_light.webp")}
                                  alt={post.title}
                                  className="w-full h-full object-cover rounded-lg"
                                />
                              </AspectRatio>
                            </div>
                          )}
                          <div className="flex-1 sm:w-2/3 lg:w-3/4 space-y-2">
                            <h2 className="theme-heading-3 flex items-center gap-2 transition-colors group-hover:text-primary">
                              {post.title}
                              {post.draft &&
                                (import.meta.env?.MODE === "development" ||
                                  process.env.NODE_ENV === "development") && (
                                  <Badge
                                    variant="destructive"
                                    className="ml-2 text-xs font-semibold uppercase tracking-wide"
                                  >
                                    Draft
                                  </Badge>
                                )}
                            </h2>

                            <div className="theme-text-muted text-sm flex items-center gap-1">
                              <span>{post.date}</span>
                              <span>&bull;</span>
                              <span>{post.readTime}</span>
                            </div>

                            <p className="theme-text-muted text-sm my-2 line-clamp-3">
                              {post.excerpt}
                            </p>

                            <div className="flex flex-wrap gap-2 pt-1">
                              {post.tags.map((tag, tagIndex) => (
                                <Badge
                                  key={tagIndex}
                                  variant="outline"
                                  className="cursor-pointer hover:bg-accent hover:text-accent-foreground transition-all text-xs"
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
                      </a>
                    </FadeSlideIn>
                  ))
                )}
              </div>
            </PageLayout>
          </SidebarInset>
        </SidebarProvider>
      </PageTransition>
    </>
  );
};

export default Blog;
