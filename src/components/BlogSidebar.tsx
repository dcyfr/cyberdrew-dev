import { Search, Tag, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarInput,
} from "@/components/ui/sidebar";
import { useSidebar } from "@/lib/sidebar-context";
import { getAllBlogPosts, getAllTags } from "@/lib/blog";
import { useNavigate } from "react-router-dom";

interface BlogSidebarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedTag: string;
  onTagChange: (tag: string) => void;
}

export function BlogSidebar({ 
  searchQuery, 
  onSearchChange, 
  selectedTag, 
  onTagChange 
}: BlogSidebarProps) {
  const { state, toggleSidebar } = useSidebar();
  const navigate = useNavigate();
  
  const allPosts = getAllBlogPosts();
  const allTags = getAllTags();
  const recentPosts = allPosts.slice(0, 5);
  const isCollapsed = state === "collapsed";

  const handlePostClick = (slug: string) => {
    navigate(`/blog/${slug}`);
  };

  const handleTagClick = (tag: string) => {
    onTagChange(selectedTag === tag ? "" : tag);
  };

  return (
    <Sidebar className={isCollapsed ? "w-14 hidden lg:flex" : "w-80 hidden lg:flex"} collapsible="icon">
      <SidebarContent className="px-4 py-6">
        {/* Search Section */}
        {!isCollapsed && (
          <SidebarGroup className="mb-8">
            <SidebarGroupLabel className="flex items-center gap-2 text-sm font-medium mb-3">
              <Search className="w-4 h-4" />
              Search
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarInput
                type="text"
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full"
              />
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* Recent Posts */}
        <SidebarGroup className="mb-8">
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

        {/* Categories/Tags */}
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center gap-2 text-sm font-medium mb-3">
            <Tag className="w-4 h-4" />
            {!isCollapsed && "Tags"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            {!isCollapsed ? (
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag, index) => (
                  <Badge
                    key={index}
                    variant={selectedTag === tag ? "default" : "outline"}
                    className="cursor-pointer hover:bg-accent hover:text-accent-foreground transition-all text-xs"
                    onClick={() => handleTagClick(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            ) : (
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={toggleSidebar}
                    className="justify-center"
                    aria-label="Tags"
                  >
                    <Tag className="w-4 h-4" />
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            )}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}