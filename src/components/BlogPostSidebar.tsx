import { Badge } from "@/components/ui/badge";
import { ShareButtons } from "@/components/ShareButtons";
import { getAllBlogPosts, BlogPost } from "@/lib/blog";
import { Link, useNavigate } from "react-router-dom";
import { FileText, Tags, Users, ArrowUpRight } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useSidebar } from "@/lib/sidebar-context";

interface BlogPostSidebarProps {
  currentPost: BlogPost;
}

export function BlogPostSidebar({ currentPost }: BlogPostSidebarProps) {
  const navigate = useNavigate();
  const { state, toggleSidebar } = useSidebar();
  const isCollapsed = state === "collapsed";
  const allPosts = getAllBlogPosts();

  // Related posts (same tags, excluding current)
  const relatedPosts = allPosts
    .filter(
      (post) =>
        post.slug !== currentPost.slug &&
        post.tags.some((tag) => currentPost.tags.includes(tag))
    )
    .slice(0, 4);

  // Recent posts (excluding current)
  const recentPosts = allPosts
    .filter((post) => post.slug !== currentPost.slug)
    .slice(0, 5);

  const handlePostClick = (slug: string) => {
    navigate(`/blog/${slug}`);
  };

  return (
    <Sidebar className={isCollapsed ? "w-14 hidden lg:flex" : "w-80 hidden lg:flex"} collapsible="icon">
      <SidebarContent className="px-4 py-6">
        {/* Tags Section */}
        <SidebarGroup className="mb-8">
          <SidebarGroupLabel className="flex items-center gap-2 text-sm font-medium mb-3">
            <Tags className="w-4 h-4" />
            {!isCollapsed && "Tags"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            {!isCollapsed ? (
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
            ) : (
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton className="justify-center" onClick={toggleSidebar} aria-label="Tags">
                    <Tags className="w-4 h-4" />
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            )}
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Share Section */}
        <SidebarGroup className="mb-8">
          <SidebarGroupLabel className="flex items-center gap-2 text-sm font-medium mb-3">
            <Users className="w-4 h-4" />
            {!isCollapsed && "Share this post"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            {!isCollapsed ? (
              <ShareButtons title={currentPost.title} />
            ) : (
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton className="justify-center" aria-label="Share">
                    <Users className="w-4 h-4" />
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            )}
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <SidebarGroup className="mb-8">
            <SidebarGroupLabel className="flex items-center gap-2 text-sm font-medium mb-3">
              <ArrowUpRight className="w-4 h-4" />
              {!isCollapsed && "Related Posts"}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {relatedPosts.map((post, index) => (
                  <SidebarMenuItem key={index}>
                    <SidebarMenuButton
                      onClick={() => handlePostClick(post.slug)}
                      className="flex flex-col items-start p-3 h-auto hover:bg-accent/50 cursor-pointer"
                    >
                      {!isCollapsed ? (
                        <>
                          <span className="font-medium text-sm line-clamp-2 text-left">
                            {post.title}
                          </span>
                          <span className="text-xs text-muted-foreground mt-1">
                            {post.date} • {post.readTime}
                          </span>
                          <span className="flex gap-1 mt-1">
                            {post.tags.slice(0, 2).map((tag) => (
                              <Badge key={tag} variant="outline" className="text-[10px] px-1.5 py-0">
                                {tag}
                              </Badge>
                            ))}
                          </span>
                        </>
                      ) : (
                        <ArrowUpRight className="w-4 h-4" />
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* Recent Posts */}
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center gap-2 text-sm font-medium mb-3">
            <FileText className="w-4 h-4" />
            {!isCollapsed && "Recent Posts"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {recentPosts.map((post, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton
                    onClick={() => handlePostClick(post.slug)}
                    className="flex flex-col items-start p-3 h-auto hover:bg-accent/50 cursor-pointer"
                  >
                    {!isCollapsed ? (
                      <>
                        <span className="font-medium text-sm line-clamp-2 text-left">
                          {post.title}
                        </span>
                        <span className="text-xs text-muted-foreground mt-1">
                          {post.date}
                        </span>
                      </>
                    ) : (
                      <FileText className="w-4 h-4" />
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}