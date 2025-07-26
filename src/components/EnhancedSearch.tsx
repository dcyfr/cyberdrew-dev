import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, X } from "lucide-react";
import { useState, useMemo } from "react";
import { getAllBlogPosts, getAllTags } from "@/lib/blog";
import { sanitizeSearchInput } from "@/lib/security";
import { searchRateLimiter } from "@/lib/rate-limiter";

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
    <div className="space-y-6 mb-8">
      {/* Vercel-style Search Input */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search posts..."
          value={searchQuery}
          onChange={(e) => {
            const sanitized = sanitizeSearchInput(e.target.value);
            
            // Apply rate limiting for security
            if (searchRateLimiter.isAllowed('search')) {
              onSearchChange(sanitized);
              setShowSuggestions(true);
            } else {
              console.warn('Search rate limit exceeded');
            }
          }}
          onFocus={() => setShowSuggestions(searchQuery.length >= 2)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          className="pl-10 pr-10 h-9 border-border bg-background hover:border-foreground transition-all duration-200 focus:border-foreground focus:ring-1 focus:ring-foreground/20"
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
        
        {/* Vercel-style Search Suggestions */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 bg-background border border-border rounded-md mt-1 shadow-md z-50 animate-fade-in">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="px-3 py-2 hover:bg-accent cursor-pointer transition-colors text-sm border-b border-border last:border-b-0 first:rounded-t-md last:rounded-b-md"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <span className={suggestion.type === 'tag' ? 'text-muted-foreground' : 'text-foreground'}>
                  {suggestion.text}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Vercel-style Tag Filter */}
      <div className="flex flex-wrap gap-2">
        <Badge 
          variant={selectedTag === "" ? "default" : "outline"}
          className="cursor-pointer hover:bg-accent hover:text-accent-foreground transition-all duration-200 text-xs font-medium"
          onClick={() => onTagChange("")}
        >
          All ({allPosts.length})
        </Badge>
        {allTags.map((tag) => (
          <Badge
            key={tag}
            variant={selectedTag === tag ? "default" : "outline"}
            className="cursor-pointer hover:bg-accent hover:text-accent-foreground transition-all duration-200 text-xs font-medium"
            onClick={() => onTagChange(selectedTag === tag ? "" : tag)}
          >
            {tag} ({tagCounts[tag]})
          </Badge>
        ))}
      </div>
    </div>
  );
};