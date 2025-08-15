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

interface Suggestion {
  type: 'title' | 'tag';
  text: string;
  value: string;
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
      .map(post => ({ type: 'title' as const, text: post.title, value: post.title }));
    
    const tagSuggestions = allTags
      .filter(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      .slice(0, 2)
      .map(tag => ({ type: 'tag' as const, text: `Tag: ${tag}`, value: tag }));
    
    return [...titleSuggestions, ...tagSuggestions];
  }, [searchQuery, allPosts, allTags]);

  const handleSuggestionClick = (suggestion: Suggestion) => {
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
      {/* Search Input */}
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
        
        {/* Search Suggestions */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 bg-background border border-border rounded-md mt-1 shadow-md z-50 animate-fade-in">
            {suggestions.map((suggestion, index) => (
              <button
                type="button"
                key={index}
                className="w-full text-left px-3 py-2 hover:bg-accent transition-colors text-sm border-b border-border last:border-b-0 first:rounded-t-md last:rounded-b-md focus:outline-none focus:ring-2 focus:ring-ring"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <span className={suggestion.type === 'tag' ? 'text-muted-foreground' : 'text-foreground'}>
                  {suggestion.text}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Tag Filter */}
      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={() => onTagChange("")}
          className="inline-flex items-center rounded-md border px-2 py-1 text-xs font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          aria-pressed={selectedTag === ""}
        >
          All ({allPosts.length})
        </button>
        {allTags.map((tag) => (
          <button type="button"
            key={tag}
            onClick={() => onTagChange(selectedTag === tag ? "" : tag)}
            className="inline-flex items-center rounded-md border px-2 py-1 text-xs font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            aria-pressed={selectedTag === tag}
          >
            {tag} ({tagCounts[tag]})
          </button>
        ))}
      </div>
    </div>
  );
};
