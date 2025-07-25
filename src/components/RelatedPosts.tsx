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
    <div className="mt-16 pt-8 border-t border-border">
      <h2 className="text-2xl font-semibold text-foreground mb-6">Related Posts</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {relatedPosts.map((post) => (
          <Card 
            key={post.slug} 
            className="cursor-pointer group rounded-xl border border-border/50 hover:border-border hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.3)] transition-all duration-300 hover:-translate-y-2 bg-card/80 backdrop-blur-sm"
            onClick={() => {
              navigate(`/blog/${post.slug}`);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <CardHeader className="pb-3">
              <CardTitle className="text-lg leading-tight hover:text-primary transition-colors">
                {post.title}
              </CardTitle>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <time dateTime={post.date}>{post.date}</time>
                <span aria-hidden="true">•</span>
                <span>{post.readTime}</span>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-muted-foreground text-sm mb-3 line-clamp-3">
                {post.excerpt}
              </p>
              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {post.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {post.tags.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{post.tags.length - 2}
                    </Badge>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};