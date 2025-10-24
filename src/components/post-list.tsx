import Link from "next/link";
import type { Post } from "@/data/posts";
import { PostBadges } from "@/components/post-badges";

/**
 * Props for the PostList component
 * @typedef {Object} PostListProps
 * @property {Post[]} posts - Array of blog posts to display
 * @property {string} [latestSlug] - Slug of the most recent post (for "New" badge)
 * @property {string} [hottestSlug] - Slug of the hottest/trending post (for "Hot" badge)
 * @property {"h2" | "h3"} [titleLevel="h2"] - HTML heading level for post titles
 * @property {string} [emptyMessage="No posts found."] - Message to show when posts array is empty
 */
interface PostListProps {
  posts: Post[];
  latestSlug?: string;
  hottestSlug?: string;
  titleLevel?: "h2" | "h3";
  emptyMessage?: string;
}

/**
 * PostList Component
 *
 * Reusable component for displaying blog posts in a consistent list format.
 * Used across the site: homepage hero section, /blog page, search results, tag filters.
 *
 * Features:
 * - Responsive list with hover effects
 * - Post badges (Draft, Archived, New, Hot)
 * - Post title with dynamic heading level
 * - Summary with metadata (date, reading time)
 * - Empty state with customizable message
 * - Integration with post filtering and search
 *
 * @component
 * @param {PostListProps} props - Component props
 * @param {Post[]} props.posts - Array of posts to display
 * @param {string} [props.latestSlug] - Identifies most recent post for "New" badge
 * @param {string} [props.hottestSlug] - Identifies hottest post for "Hot" badge
 * @param {"h2" | "h3"} [props.titleLevel="h2"] - Semantic heading level (h2 for main content, h3 for secondary)
 * @param {string} [props.emptyMessage="No posts found."] - Text shown when no posts to display
 *
 * @returns {React.ReactElement} List of post articles or empty state message
 *
 * @example
 * // Display all posts on blog page
 * <PostList posts={filteredPosts} />
 *
 * @example
 * // Display posts with badges on homepage
 * <PostList 
 *   posts={featuredPosts} 
 *   latestSlug={latestPost.slug}
 *   hottestSlug={trendingPost.slug}
 *   emptyMessage="No featured posts yet."
 * />
 *
 * @example
 * // Display search results with h3 headings
 * <PostList 
 *   posts={searchResults}
 *   titleLevel="h3"
 *   emptyMessage={`No posts found for "${query}"`}
 * />
 *
 * @styling
 * - Article cards with rounded borders and transition effects
 * - Hover state changes background to muted/50
 * - Flexbox layout for responsive text wrapping
 * - Post badges with color-coded styles
 * - Empty state with dashed border and center alignment
 * - Consistent padding and spacing using Tailwind utilities
 *
 * @accessibility
 * - Semantic article elements for screen readers
 * - Time element with dateTime attribute for machine-readable dates
 * - Heading hierarchy respects titleLevel prop
 * - Post badges announce post status (draft, archived, new, hot)
 * - Links are keyboard navigable
 *
 * @performance
 * - Maps over posts array with slug as key for React reconciliation
 * - No fetching - uses pre-computed posts data
 * - Lightweight component with minimal state
 * - Early exit (null) for empty array not rendered as empty container
 *
 * @usage
 * Shared across:
 * - src/app/page.tsx (homepage)
 * - src/app/blog/page.tsx (blog listing)
 * - Search/filter results
 *
 * @see src/components/post-badges.tsx for badge implementation
 * @see src/data/posts.ts for Post type definition
 */
export function PostList({ 
  posts, 
  latestSlug,
  hottestSlug,
  titleLevel = "h2",
  emptyMessage = "No posts found."
}: PostListProps) {
  if (posts.length === 0) {
    return (
      <div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
        {emptyMessage}
      </div>
    );
  }

  const TitleTag = titleLevel;

  return (
    <>
      {posts.map((p) => (
        <article key={p.slug} className="group rounded-lg border p-4 transition-colors hover:bg-muted/50">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <PostBadges 
              post={p} 
              size="sm"
              isLatestPost={latestSlug === p.slug}
              isHotPost={hottestSlug === p.slug}
            />
            <time dateTime={p.publishedAt}>
              {new Date(p.publishedAt).toLocaleDateString(undefined, { 
                year: "numeric", 
                month: "short", 
                day: "numeric" 
              })}
            </time>
            <span className="hidden md:inline-block">•</span>
            <span>{p.readingTime.text}</span>
            <span className="hidden md:inline-block">•</span>
            <span className="hidden md:inline-block">{p.tags.join(" · ")}</span>
          </div>
          <div className="mt-1">
            <TitleTag className={`font-medium ${titleLevel === "h2" ? "text-lg md:text-xl" : "text-lg"}`}>
              <Link href={`/blog/${p.slug}`}>
                {p.title}
              </Link>
            </TitleTag>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">{p.summary}</p>
        </article>
      ))}
    </>
  );
}
