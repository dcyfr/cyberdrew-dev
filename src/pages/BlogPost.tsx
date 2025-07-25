import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getBlogPost } from "@/lib/blog";
import { ThemeToggle } from "@/components/theme-toggle";
import { SEOHead } from "@/components/SEOHead";
import { ReadingProgress } from "@/components/ReadingProgress";
import { BlogPostSkeleton } from "@/components/BlogPostSkeleton";
import { BlogBreadcrumb } from "@/components/BlogBreadcrumb";
import { BackToTop } from "@/components/BackToTop";
import { RelatedPosts } from "@/components/RelatedPosts";
import { ShareButtons } from "@/components/ShareButtons";
import { PageTransition } from "@/components/PageTransition";
import { useState, useEffect } from "react";

const BlogPost = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  const post = getBlogPost(slug || "");

  useEffect(() => {
    // Simulate loading time for better UX
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, [slug]);

  if (isLoading) {
    return (
      <>
        <SEOHead
          title="Loading... - Drew's Lab"
          description="Loading blog post content..."
        />
        <main id="main-content" className="min-h-screen">
          <div className="container mx-auto px-6 py-16 max-w-4xl">
            <div className="flex justify-between items-start mb-8">
              <Button 
                variant="ghost" 
                onClick={() => navigate("/blog")}
                className="-ml-3"
                aria-label="Go back to blog"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <ThemeToggle />
            </div>
            <BlogPostSkeleton />
          </div>
        </main>
      </>
    );
  }

  if (!post) {
    return (
      <>
        <SEOHead
          title="Post Not Found - Drew's Lab"
          description="The blog post you're looking for doesn't exist."
        />
        <main id="main-content" className="min-h-screen">
          <div className="container mx-auto px-6 py-16 max-w-4xl">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/blog")}
              className="mb-8 -ml-3"
              aria-label="Go back to blog"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <BlogBreadcrumb />
            <h1 className="text-3xl font-semibold text-foreground mb-4">Post Not Found</h1>
            <p className="text-muted-foreground">The blog post you're looking for doesn't exist.</p>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <SEOHead
        title={`${post.title} - Drew's Lab`}
        description={post.excerpt}
        keywords={`${post.tags.join(', ')}, cybersecurity, security architecture`}
      />
      <ReadingProgress />
      <BackToTop />
      <PageTransition>
        <main id="main-content" className="min-h-screen">
          <div className="container mx-auto px-6 py-16 max-w-4xl">
            <div className="flex justify-between items-start mb-8">
              <Button 
                variant="ghost" 
                onClick={() => navigate("/blog")}
                className="-ml-3 hover:scale-105 transition-transform duration-200"
                aria-label="Go back to blog"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <ThemeToggle />
            </div>
            
            <BlogBreadcrumb postTitle={post.title} />
            
            <article className="max-w-3xl">
              <header className="mb-12">
                <h1 className="text-4xl font-bold text-foreground mb-6 leading-tight hover-glow">
                  {post.title}
                </h1>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <time dateTime={post.date} className="font-medium">{post.date}</time>
                    <span aria-hidden="true">•</span>
                    <span className="font-medium">{post.readTime}</span>
                  </div>
                  <ShareButtons 
                    title={post.title} 
                    excerpt={post.excerpt}
                  />
                </div>
                {post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-8">
                    {post.tags.map((tag) => (
                      <Badge 
                        key={tag} 
                        variant="secondary" 
                        className="text-sm px-3 py-1 hover-scale"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </header>
              
              <div 
                className="blog-content prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
              
              <RelatedPosts currentPost={post} />
            </article>
          </div>
        </main>
      </PageTransition>
    </>
  );
};

export default BlogPost;