import { getAllBlogPosts, type BlogPost } from "@/lib/blog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

interface RelatedPostsProps {
  currentPost: BlogPost;
  maxPosts?: number;
}

export const RelatedPosts = ({ currentPost, maxPosts = 3 }: RelatedPostsProps) => {
  const navigate = useNavigate();
  const allPosts = getAllBlogPosts();
  
  // Find related posts based on shared tags
  const relatedPosts = allPosts
    .filter(post => post.slug !== currentPost.slug)
    .map(post => ({
      ...post,
      sharedTags: post.tags.filter(tag => currentPost.tags.includes(tag)).length
    }))
    .sort((a, b) => b.sharedTags - a.sharedTags)
    .slice(0, maxPosts);

  if (relatedPosts.length === 0) return null;

  return (
    <section className="mt-16 pt-8 border-t border-border">
      <h2 className="vercel-heading-2 mb-8">Related Posts</h2>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {relatedPosts.map((post) => (
          <Card 
            key={post.slug} 
            className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 border-border/50 hover:border-border bg-card/50 backdrop-blur-sm"
            onClick={() => {
              navigate(`/blog/${post.slug}`);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <CardHeader className="pb-3 space-y-3">
              <CardTitle className="vercel-text-lg font-semibold leading-tight group-hover:text-primary transition-colors duration-200 line-clamp-2">
                {post.title}
              </CardTitle>
              <div className="flex items-center gap-2 vercel-text-muted text-sm">
                <time dateTime={post.date}>{post.date}</time>
                <span aria-hidden="true">•</span>
                <span>{post.readTime}</span>
              </div>
            </CardHeader>
            <CardContent className="pt-0 space-y-4">
              <p className="vercel-text-muted text-sm leading-relaxed line-clamp-3">
                {post.excerpt}
              </p>
              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.tags.slice(0, 2).map((tag) => (
                    <Badge 
                      key={tag} 
                      variant="secondary" 
                      className="text-xs font-medium px-2.5 py-1 rounded-full bg-secondary/60 hover:bg-secondary/80 transition-colors"
                    >
                      {tag}
                    </Badge>
                  ))}
                  {post.tags.length > 2 && (
                    <Badge 
                      variant="outline" 
                      className="text-xs font-medium px-2.5 py-1 rounded-full border-border/60 text-muted-foreground"
                    >
                      +{post.tags.length - 2}
                    </Badge>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};