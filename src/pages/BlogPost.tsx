import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getBlogPost } from "@/lib/blog";
import { ThemeToggle } from "@/components/theme-toggle";
import { SEOHead } from "@/components/SEOHead";
import { ReadingProgress } from "@/components/ReadingProgress";
import { BlogPostSkeleton } from "@/components/BlogPostSkeleton";
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
          <div className="container mx-auto px-6 py-16 max-w-2xl">
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
          <div className="container mx-auto px-6 py-16 max-w-2xl">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/blog")}
              className="mb-8 -ml-3"
              aria-label="Go back to blog"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
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
      <main id="main-content" className="min-h-screen">
        <div className="container mx-auto px-6 py-16 max-w-2xl">
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
          
          <article>
            <header className="mb-12">
              <h1 className="text-3xl font-semibold text-foreground mb-4 leading-tight">{post.title}</h1>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <time dateTime={post.date}>{post.date}</time>
                <span aria-hidden="true">•</span>
                <span>{post.readTime}</span>
              </div>
              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </header>
            
            <div 
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>
        </div>
      </main>
    </>
  );
};

export default BlogPost;