import { Badge } from "@/components/ui/badge";
import { ShareButtons } from "@/components/ShareButtons";
import { getAllBlogPosts } from "@/lib/blog";
import { Link, useNavigate } from "react-router-dom";
import { FileText, Tags, Users, ArrowUpRight } from "lucide-react";
import { BlogPost } from "@/lib/blog";

interface BlogPostSidebarProps {
  currentPost: BlogPost;
}

export function BlogPostSidebar({ currentPost }: BlogPostSidebarProps) {
  const navigate = useNavigate();
  const allPosts = getAllBlogPosts();
  
  // Get related posts (same tags, excluding current post)
  const relatedPosts = allPosts
    .filter(post => 
      post.slug !== currentPost.slug && 
      post.tags.some(tag => currentPost.tags.includes(tag))
    )
    .slice(0, 4);

  // Get recent posts (excluding current post)
  const recentPosts = allPosts
    .filter(post => post.slug !== currentPost.slug)
    .slice(0, 5);

  const handlePostClick = (slug: string) => {
    navigate(`/blog/${slug}`);
  };

  return (
    <aside className="hidden lg:block w-80 border-r border-border bg-card">
      <div className="sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto px-6 py-8">
        {/* Tags Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm font-medium mb-4">
            <Tags className="w-4 h-4" />
            Tags
          </div>
          <div className="flex flex-wrap gap-2">
            {currentPost.tags.map((tag) => (
              <Badge 
                key={tag} 
                variant="secondary" 
                className="text-xs px-3 py-1 font-medium rounded-full"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Share Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm font-medium mb-4">
            <Users className="w-4 h-4" />
            Share this post
          </div>
          <ShareButtons 
            title={currentPost.title}
          />
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-2 text-sm font-medium mb-4">
              <ArrowUpRight className="w-4 h-4" />
              Related Posts
            </div>
            <div className="space-y-4">
              {relatedPosts.map((post, index) => (
                <Link
                  key={index}
                  to={`/blog/${post.slug}`}
                  className="block p-3 rounded-lg hover:bg-accent/50 transition-colors border border-border/50 focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <div className="font-medium text-sm line-clamp-2 text-left mb-2">
                    {post.title}
                  </div>
                  <div className="text-xs text-muted-foreground mb-2">
                    {post.date} • {post.readTime}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {post.tags.slice(0, 2).map((tag) => (
                      <Badge 
                        key={tag} 
                        variant="outline" 
                        className="text-xs px-2 py-0.5"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Recent Posts */}
        <div>
          <div className="flex items-center gap-2 text-sm font-medium mb-4">
            <FileText className="w-4 h-4" />
            Recent Posts
          </div>
          <div className="space-y-3">
            {recentPosts.map((post, index) => (
              <Link
                key={index}
                to={`/blog/${post.slug}`}
                className="block p-3 rounded-lg hover:bg-accent/50 transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <div className="font-medium text-sm line-clamp-2 text-left mb-1">
                  {post.title}
                </div>
                <div className="text-xs text-muted-foreground">
                  {post.date}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}