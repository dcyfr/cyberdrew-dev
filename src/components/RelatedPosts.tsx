import { getAllBlogPosts, type BlogPost } from "@/lib/blog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Clock, Calendar, ExternalLink } from "lucide-react";

interface RelatedPostsProps {
  currentPost: BlogPost;
  maxPosts?: number;
}

export const RelatedPosts = ({ currentPost, maxPosts = 3 }: RelatedPostsProps) => {
  const navigate = useNavigate();
  const allPosts = getAllBlogPosts();
  
  // Enhanced algorithm for finding related posts
  const relatedPosts = allPosts
    .filter(post => post.slug !== currentPost.slug)
    .map(post => {
      const sharedTags = post.tags.filter(tag => currentPost.tags.includes(tag)).length;
      const tagRelevanceScore = sharedTags / Math.max(currentPost.tags.length, post.tags.length);
      
      // Boost score for posts with exact tag matches
      const exactTagMatches = post.tags.filter(tag => currentPost.tags.includes(tag));
      const hasHighValueTags = exactTagMatches.some(tag => 
        ['cybersecurity', 'security', 'zero trust', 'architecture'].includes(tag.toLowerCase())
      );
      
      const finalScore = tagRelevanceScore + (hasHighValueTags ? 0.2 : 0);
      
      return {
        ...post,
        sharedTags,
        relevanceScore: finalScore
      };
    })
    .filter(post => post.sharedTags > 0) // Only show posts with at least one shared tag
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(0, maxPosts);

  const handlePostClick = (slug: string) => {
    navigate(`/blog/${slug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewAllPosts = () => {
    navigate('/blog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (relatedPosts.length === 0) {
    return (
      <section className="mt-20 pt-8 border-t border-border">
        <div className="text-center py-12">
          <h2 className="vercel-heading-2 mb-4">Explore More Posts</h2>
          <p className="vercel-text-muted mb-6 max-w-md mx-auto">
            No directly related posts found, but there's plenty more to discover in our blog.
          </p>
          <Button onClick={handleViewAllPosts} className="group">
            View All Posts
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="mt-20 pt-8 border-t border-border">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="vercel-heading-2 mb-2">Related Posts</h2>
          <p className="vercel-text-muted text-sm">
            Continue reading about {currentPost.tags.slice(0, 2).join(' and ')}
          </p>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleViewAllPosts}
          className="group hidden sm:flex"
        >
          View All
          <ExternalLink className="w-3 h-3 ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
        </Button>
      </div>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {relatedPosts.map((post) => (
          <Card 
            key={post.slug} 
            className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-primary/20 border-border/50 hover:border-primary/20 bg-card/80 backdrop-blur-sm hover:-translate-y-1 relative overflow-hidden"
            onClick={() => handlePostClick(post.slug)}
          >
            {/* Relevance indicator */}
            {post.sharedTags > 1 && (
              <div className="absolute top-3 right-3 z-10">
                <Badge 
                  variant="default" 
                  className="text-xs font-medium px-2 py-1 bg-primary/90 text-primary-foreground"
                >
                  {post.sharedTags} tags match
                </Badge>
              </div>
            )}

            <CardHeader className="pb-3 space-y-3">
              <CardTitle className="text-lg font-semibold leading-tight group-hover:text-primary transition-colors duration-200 line-clamp-2 pr-4">
                {post.title}
              </CardTitle>
              <div className="flex items-center gap-3 text-muted-foreground text-sm">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <time dateTime={post.date}>{post.date}</time>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-0 space-y-4">
              <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                {post.excerpt}
              </p>
              
              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.tags.slice(0, 3).map((tag) => {
                    const isShared = currentPost.tags.includes(tag);
                    return (
                      <Badge 
                        key={tag} 
                        variant={isShared ? "default" : "secondary"}
                        className={`text-xs font-medium px-2.5 py-1 rounded-full transition-all duration-200 ${
                          isShared 
                            ? "bg-primary/90 text-primary-foreground shadow-sm" 
                            : "bg-secondary/60 hover:bg-secondary/80"
                        }`}
                      >
                        {tag}
                      </Badge>
                    );
                  })}
                  {post.tags.length > 3 && (
                    <Badge 
                      variant="outline" 
                      className="text-xs font-medium px-2.5 py-1 rounded-full border-border/60 text-muted-foreground"
                    >
                      +{post.tags.length - 3}
                    </Badge>
                  )}
                </div>
              )}

              {/* Read more indicator */}
              <div className="flex items-center text-xs text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 pt-2">
                Read more
                <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Mobile "View All" button */}
      <div className="sm:hidden mt-6 text-center">
        <Button 
          variant="outline" 
          onClick={handleViewAllPosts}
          className="group w-full"
        >
          View All Posts
          <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
        </Button>
      </div>
    </section>
  );
};