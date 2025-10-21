import { Badge } from "@/components/ui/badge";
import type { Post } from "@/data/posts";

interface PostBadgesProps {
  post: Post;
  size?: "default" | "sm";
  isLatestPost?: boolean;
  isHotPost?: boolean;
}

/**
 * Display status badges for a blog post (Draft, Archived, Hot, New, etc.)
 * Badges are displayed inline to the right of the title text
 */
export function PostBadges({ 
  post, 
  size = "default",
  isLatestPost,
  isHotPost,
}: PostBadgesProps) {
  const badges = [];

  // Draft badge (development only)
  if (process.env.NODE_ENV === "development" && post.draft) {
    badges.push(
      <Badge
        key="draft"
        variant="outline"
        className={`border-blue-500/50 text-blue-600 dark:text-blue-400 ${size === "sm" ? "text-xs" : ""}`}
      >
        Draft
      </Badge>
    );
  }

  // Archived badge
  if (post.archived) {
    badges.push(
      <Badge
        key="archived"
        variant="outline"
        className={`border-amber-500/50 text-amber-600 dark:text-amber-400 ${size === "sm" ? "text-xs" : ""}`}
      >
        Archived
      </Badge>
    );
  }

  // New badge - for the latest published post (not archived or draft)
  if (isLatestPost && !post.archived && !post.draft) {
    badges.push(
      <Badge
        key="new"
        variant="outline"
        className={`border-green-500/50 text-green-600 dark:text-green-400 ${size === "sm" ? "text-xs" : ""}`}
      >
        New
      </Badge>
    );
  }

  // Hot badge - for the post with the most views (not draft or archived)
  if (isHotPost && !post.archived && !post.draft) {
    badges.push(
      <Badge
        key="hot"
        variant="outline"
        className={`border-red-500/50 text-red-600 dark:text-red-400 ${size === "sm" ? "text-xs" : ""}`}
      >
        Hot
      </Badge>
    );
  }

  if (badges.length === 0) {
    return null;
  }

  return <>{badges}</>;
}
