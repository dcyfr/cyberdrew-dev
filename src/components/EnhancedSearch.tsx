import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, X } from "lucide-react";
import { useState, useMemo } from "react";
import { getAllBlogPosts, getAllTags } from "@/lib/blog";

interface EnhancedSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedTag: string;
  onTagChange: (tag: string) => void;
  onSuggestionClick: (suggestion: string) => void;
}

export const EnhancedSearch = ({
  searchQuery,
  onSearchChange,
  selectedTag,
  onTagChange,
  onSuggestionClick
}: EnhancedSearchProps) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const allPosts = getAllBlogPosts();
  const allTags = getAllTags();
  
  // Get tag counts
  const tagCounts = allTags.reduce((acc, tag) => {
    acc[tag] = allPosts.filter(post => post.tags.includes(tag)).length;
    return acc;
  }, {} as Record<string, number>);

  // Generate search suggestions
  const suggestions = useMemo(() => {
    if (!searchQuery || searchQuery.length < 2) return [];
    
    const titleSuggestions = allPosts
      .filter(post => post.title.toLowerCase().includes(searchQuery.toLowerCase()))
      .slice(0, 3)
      .map(post => ({ type: 'title', text: post.title, value: post.title }));
    
    const tagSuggestions = allTags
      .filter(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      .slice(0, 2)
      .map(tag => ({ type: 'tag', text: `Tag: ${tag}`, value: tag }));
    
    return [...titleSuggestions, ...tagSuggestions];
  }, [searchQuery, allPosts, allTags]);

  const handleSuggestionClick = (suggestion: any) => {
    if (suggestion.type === 'tag') {
      onTagChange(suggestion.value);
      onSearchChange('');
    } else {
      onSuggestionClick(suggestion.value);
    }
    setShowSuggestions(false);
  };

  const clearSearch = () => {
    onSearchChange('');
    onTagChange('');
    setShowSuggestions(false);
  };

  return (
    <div className="space-y-4">
      {/* Enhanced Search Input */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search posts, tags..."
          value={searchQuery}
          onChange={(e) => {
            onSearchChange(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(searchQuery.length >= 2)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          className="pl-10 pr-10 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
        />
        {(searchQuery || selectedTag) && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
        
        {/* Search Suggestions */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 bg-background border border-border rounded-md mt-1 shadow-lg z-50 animate-fade-in">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="px-3 py-2 hover:bg-muted cursor-pointer transition-colors border-b border-border last:border-b-0"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <span className={suggestion.type === 'tag' ? 'text-primary' : 'text-foreground'}>
                  {suggestion.text}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Enhanced Tag Filter */}
      <div className="flex flex-wrap gap-2">
        <Badge 
          variant={selectedTag === "" ? "default" : "outline"}
          className="cursor-pointer hover:scale-105 hover:shadow-md transition-all duration-200"
          onClick={() => onTagChange("")}
        >
          All ({allPosts.length})
        </Badge>
        {allTags.map((tag) => (
          <Badge
            key={tag}
            variant={selectedTag === tag ? "default" : "outline"}
            className="cursor-pointer hover:scale-105 hover:shadow-md transition-all duration-200 group"
            onClick={() => onTagChange(selectedTag === tag ? "" : tag)}
          >
            <span className="group-hover:text-primary transition-colors">
              {tag} ({tagCounts[tag]})
            </span>
          </Badge>
        ))}
      </div>
    </div>
  );
};