import { Badge } from "@/components/ui/badge";
import { useNavigate, useParams } from "react-router-dom";
import { getBlogPost } from "@/lib/blog";
import { SEOHead } from "@/components/SEOHead";
import { ReadingProgress } from "@/components/ReadingProgress";
import { BlogPostSkeleton } from "@/components/BlogPostSkeleton";
import { BlogBreadcrumb } from "@/components/BlogBreadcrumb";
import { BackToTop } from "@/components/BackToTop";
import { RelatedPosts } from "@/components/RelatedPosts";
import { ShareButtons } from "@/components/ShareButtons";
import { PageTransition } from "@/components/PageTransition";
import { AppHeader } from "@/components/AppHeader";
import { BlogPostSidebar } from "@/components/BlogPostSidebar";
import { sanitizeHtml } from "@/lib/security";
import { useState, useEffect } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { motion } from "framer-motion";
import { itemVariants } from "@/lib/animations";

const BlogPost = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  const post = getBlogPost(slug || "");

  // Simulate loading time for better UX
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, [slug]);

  // Redirect to NotFound page for invalid slugs after loading
  useEffect(() => {
    if (!isLoading && !post) {
      navigate("/notfound", { replace: true });
    }
  }, [isLoading, post, navigate]);

  if (isLoading) {
    return (
      <>
        <SEOHead
          title="Loading..."
          description="Loading post content..."
        />
        <PageTransition>
          <AppHeader showHomeButton={true} />
          <div className="min-h-screen pt-24">
            <div className="container mx-auto max-w-4xl">
              <BlogPostSkeleton />
            </div>
          </div>
        </PageTransition>
      </>
    );
  }

  if (!post && !isLoading) {
    return null;
  }

  return (
    <>
      <SEOHead
        title={`${post.title} - Cyber Drew's Lab`}
        description={post.excerpt}
        keywords={`${post.tags.join(', ')}`}
      />
      <ReadingProgress />
      <BackToTop />
      <PageTransition>
        <AppHeader showHomeButton={true} />
        <div className="min-h-screen pt-24">
          <div className="flex w-full">
            {/* Sidebar on the left */}
            <BlogPostSidebar currentPost={post} />

            {/* Main content */}
            <main className="flex-1">
              <div className="container mx-auto max-w-4xl">
                {/* Post Content */}
                <motion.article
                  className="max-w-none mb-8"
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                >
                    {/* Feature Image */}
                    {post.featureImage && (
                      <div className="mb-4">
                        <AspectRatio ratio={16/9} className="rounded-lg overflow-hidden">
                          <img 
                            src={post.featureImage} 
                            alt={post.title} 
                            className="w-full h-full object-cover rounded-lg" 
                          />
                        </AspectRatio>
                      </div>
                    )}
                    {/* Post Header */}
                    <header className="mb-8 sm:mb-16">
                      <BlogBreadcrumb currentPage={post.title} />
                      <h1 className="vercel-heading-1 mt-4 flex items-center gap-2">
                        {post.title}
                        {(post.draft && (import.meta.env?.MODE === "development" || process.env.NODE_ENV === "development")) && (
                          <Badge variant="destructive" className="ml-2 text-xs font-semibold uppercase tracking-wide">
                            Draft
                          </Badge>
                        )}
                      </h1>
                      <div className="flex items-center gap-2 vercel-text-muted mb-8">
                        <time dateTime={post.date}>{post.date}</time>
                        <span aria-hidden="true">•</span>
                        <span>{post.readTime}</span>
                      </div>
                    </header>
                    {/* Blog Post Content */}
                    <div 
                      className="blog-content prose prose-lg max-w-none"
                      dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.content) }}
                    />
                  {/* Share Buttons */}
                  <div className="mt-8">
                    <ShareButtons title={post.title} url={`/blog/${post.slug}`} excerpt={post.excerpt} />
                  </div>
                  {/* Related Posts */}
                  <RelatedPosts currentPost={post} />
                </motion.article>
              </div>
            </main>
          </div>
        </div>
      </PageTransition>
    </>
  );
};

export default BlogPost;
