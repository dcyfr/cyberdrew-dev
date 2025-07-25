import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Clock, Search, Tag } from "lucide-react";
import { useState } from "react";
import { getAllBlogPosts, getAllTags } from "@/lib/blog";

const Blog = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("All Posts");

  // Get all posts and tags from markdown files
  const allPosts = getAllBlogPosts();
  const allTags = ["All Posts", ...getAllTags()];

  // Filter posts based on search and tag
  const filteredPosts = allPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesTag = selectedTag === "All Posts" || post.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  console.log("Blog Debug:", {
    totalPosts: allPosts.length,
    filteredPosts: filteredPosts.length,
    selectedTag,
    searchQuery,
    allTags
  });

  const handlePostClick = (slug: string) => {
    navigate(`/blog/${slug}`);
  };

  const handleTagClick = (tag: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedTag(tag);
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-6 py-16 max-w-4xl">
        {/* Header */}
        <div className="mb-12">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
            className="mb-8 -ml-3"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          
          <h1 className="text-3xl font-semibold text-foreground mb-4">Blog</h1>
          <p className="text-muted-foreground">Thoughts on technology, cybersecurity, and more.</p>
        </div>

        <div className="space-y-8">
          {/* Search and Filters */}
          <div className="flex flex-col gap-4 mb-8">
            <div className="relative max-w-md">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {allTags.map((tag) => (
                <Badge
                  key={tag}
                  variant={selectedTag === tag ? "default" : "outline"}
                  className="cursor-pointer hover:bg-accent transition-colors"
                  onClick={() => handleTagClick(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Blog Posts */}
          <div className="space-y-8">
            {filteredPosts.map((post, index) => (
              <div 
                key={index} 
                className="cursor-pointer group border-b border-border pb-8 last:border-b-0"
                onClick={() => handlePostClick(post.slug)}
              >
                <div className="space-y-3">
                  <h2 className="text-xl font-medium text-foreground group-hover:text-muted-foreground transition-colors">
                    {post.title}
                  </h2>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag, tagIndex) => (
                      <Badge 
                        key={tagIndex} 
                        variant="outline"
                        className="cursor-pointer hover:bg-accent transition-colors text-xs"
                        onClick={(e) => handleTagClick(tag, e)}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            
            {filteredPosts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No posts found matching your search.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;