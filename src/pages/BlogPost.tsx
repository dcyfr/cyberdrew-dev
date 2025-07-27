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
import { PageLayout } from "@/components/PageLayout";
import { sanitizeHtml } from "@/lib/security";
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
          title="Loading..."
          description="Loading post content..."
        />
        <PageTransition>
          <PageLayout showBackButton={false}>
            <BlogPostSkeleton />
          </PageLayout>
        </PageTransition>
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
        <PageTransition>
          <PageLayout>
            <BlogBreadcrumb />
            <h1 className="text-3xl font-semibold text-foreground mb-4">Post Not Found</h1>
            <p className="text-muted-foreground">The blog post you're looking for doesn't exist or has moved.</p>
          </PageLayout>
        </PageTransition>
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
        <PageLayout>
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
                className="blog-content prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.content) }}
              />
            {/* Related Posts */}
            <RelatedPosts currentPost={post} />
          </article>
        </PageLayout>
      </PageTransition>
    </>
  );
};

export default BlogPost;