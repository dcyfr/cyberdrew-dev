import { SEOHead } from "@/components/SEOHead";
import { PageTransition } from "@/components/PageTransition";
// Removed framer-motion; using CSS-based transitions
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from '@/components/ui/card';
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
            <PageLayout maxWidth="2xl">
              {/* Page Header */}
              <FadeSlideIn className="mb-4 sm:mb-8" intensity={2} durationMs={350}>
                <div className="mb-4">
                  <h1 className="text-4xl font-bold font-sans tracking-tight mb-8">Blog</h1>
                  <p className="text-lg text-muted-foreground font-sans">
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
                        role="button"
                        tabIndex={0}
                        aria-pressed={selectedTag === tag}
                        variant={selectedTag === tag ? "default" : "outline"}
                        className="cursor-pointer hover:bg-accent hover:text-accent-foreground transition-all text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        onClick={() => handleTagClick(tag)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            handleTagClick(tag);
                          }
                        }}
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
                    <p className="text-lg text-muted-foreground">
                      No posts found matching your criteria. Try adjusting your search or filters.
                    </p>
                  </div>
                ) : (
                  filteredPosts.map((post, index) => (
                    <FadeSlideIn key={`${post.slug}-${post.date}`} delayMs={120 + index * 80} durationMs={280}>
                      <Card 
                        className={`group cursor-pointer transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 
                                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
                                  active:scale-[0.99] overflow-hidden relative ${post.featureImage ? 'min-h-[200px]' : 'min-h-[160px]'}`}
                        style={post.featureImage ? {
                          backgroundImage: `url(${post.featureImage})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                        } : {}}
                        onClick={(e) => {
                          e.preventDefault();
                          handlePostClick(post.slug);
                        }}
                      >
                        {post.featureImage && (
                          <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/85 to-background/95 backdrop-blur-[1px]"></div>
                        )}
                        <CardContent className={`p-4 sm:p-5 relative z-10 h-full flex flex-col justify-between ${post.featureImage ? 'text-white' : ''}`}>
                          <div className="space-y-3">
                            <div className="flex flex-wrap gap-2">
                              {post.tags.map((tag, tagIndex) => (
                                <Badge
                                  key={tagIndex}
                                  role="button"
                                  tabIndex={0}
                                  aria-pressed={selectedTag === tag}
                                  variant={selectedTag === tag ? "default" : "outline"}
                                  className="cursor-pointer hover:bg-accent hover:text-accent-foreground transition-all text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleTagClick(tag);
                                  }}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                      e.preventDefault();
                                      handleTagClick(tag);
                                    }
                                  }}
                                >
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                            
                            <h2 className={`text-xl sm:text-2xl font-semibold font-sans tracking-tight flex items-center gap-2 transition-colors group-hover:text-primary leading-tight ${
                              post.featureImage ? 'text-foreground' : ''
                            }`}>
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

                            <p className={`text-sm line-clamp-3 font-sans leading-relaxed ${
                              post.featureImage ? 'text-foreground/90' : 'text-muted-foreground'
                            }`}>
                              {post.excerpt}
                            </p>
                          </div>
                          
                          <div className={`text-sm flex items-center gap-1 mt-3 ${
                            post.featureImage ? 'text-foreground/80' : 'text-muted-foreground'
                          }`}>
                            <span>{post.date}</span>
                            <span>&bull;</span>
                            <span>{post.readTime}</span>
                          </div>
                        </CardContent>
                      </Card>
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
