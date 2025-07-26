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
import { useState, useEffect, useRef } from "react";

const BlogPost = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);

  const post = getBlogPost(slug || "");

  useEffect(() => {
    // Simulate loading time for better UX
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, [slug]);

  useEffect(() => {
    // Fix markdown-style lists after content loads
    if (!isLoading && contentRef.current) {
      const processLists = () => {
        const paragraphs = contentRef.current?.querySelectorAll('p') || [];
        
        paragraphs.forEach(p => {
          const text = p.textContent || '';
          // Check for both "- " and "* " markdown list formats
          if (text.trim().startsWith('- ') || text.trim().startsWith('* ')) {
            // Remove the markdown list marker
            const cleanText = text.replace(/^[\s]*[-*]\s+/, '');
            p.innerHTML = cleanText;
            
            // Style as list item
            p.style.position = 'relative';
            p.style.marginLeft = '1.5rem';
            p.style.marginBottom = '0.5rem';
            p.style.paddingLeft = '0.5rem';
            
            // Add bullet point
            const bullet = document.createElement('span');
            bullet.textContent = '•';
            bullet.style.position = 'absolute';
            bullet.style.left = '-1rem';
            bullet.style.fontWeight = 'bold';
            bullet.style.color = 'currentColor';
            p.prepend(bullet);
            
            // Add list-item class for styling
            p.classList.add('blog-list-item');
          }
        });
      };
      
      // Process immediately and also after a small delay to catch any dynamic content
      processLists();
      setTimeout(processLists, 100);
    }
  }, [isLoading, post]);

  if (isLoading) {
    return (
      <>
        <SEOHead
          title="Loading..."
          description="Loading post content..."
        />
        <main id="main-content" className="min-h-screen">
          <div className="container mx-auto px-6 py-16 max-w-4xl">
            <div className="flex justify-between items-start mb-8">
              <Button 
                variant="vercel-ghost" 
                onClick={() => navigate("/blog")}
                className="text-sm"
                aria-label="Go back to blog"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
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
          description="The post you're looking for doesn't exist or has moved."
        />
        <main id="main-content" className="min-h-screen">
          <div className="container mx-auto px-6 py-16 max-w-4xl">
            <Button 
              variant="vercel-ghost" 
              onClick={() => navigate("/blog")}
              className="mb-8 text-sm"
              aria-label="Go back to blog"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back
            </Button>
            <BlogBreadcrumb />
            <h1 className="text-3xl font-semibold text-foreground mb-4">Post Not Found</h1>
            <p className="text-muted-foreground">The blog post you're looking for doesn't exist or has moved.</p>
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
        keywords={`${post.tags.join(', ')}`}
      />
      <ReadingProgress />
      <BackToTop />
      <PageTransition>
        <main id="main-content" className="min-h-screen">
          <div className="container mx-auto px-6 py-16 max-w-4xl">
            {/* Page Header */}
            <div className="flex justify-between items-start mb-8">
              {/* Back Button */}
              <Button 
                variant="vercel-ghost" 
                onClick={() => navigate("/blog")}
                className="text-sm"
                aria-label="Go back to blog"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back
              </Button>
              {/* Theme Toggle Button */}
              <ThemeToggle />
            </div>
            {/* Page Breadcrumb */}
            <BlogBreadcrumb postTitle={post.title} />
            {/* Post Content */}
            <article className="max-w-none mb-8">
              {/* Post Header */}
              <header className="mb-16">
                <h1 className="vercel-heading-1">
                  {post.title}
                </h1>
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-2 vercel-text-muted">
                    <time dateTime={post.date}>{post.date}</time>
                    <span aria-hidden="true">•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <ShareButtons 
                    title={post.title} 
                    excerpt={post.excerpt}
                  />
                </div>
                {post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-12">
                    {post.tags.map((tag) => (
                      <Badge 
                        key={tag} 
                        variant="secondary" 
                        className="text-xs px-3 py-1 font-medium rounded-full"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </header>
              {/* Blog Post Content */}
              <div 
                ref={contentRef}
                className="blog-content prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
              {/* Related Posts */}
              <RelatedPosts currentPost={post} />
            </article>
          </div>
        </main>
      </PageTransition>
    </>
  );
};

export default BlogPost;