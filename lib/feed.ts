// ---------------------------------------------------------------------------
// dcyfr.ai blog feed client.
//
// The writing section used to be four titles typed out by hand, which drifts
// the moment a post is retitled or republished and nothing here would notice.
// dcyfr.ai already publishes a JSON feed, so read that instead and let the
// `featured:` flag in each post's frontmatter decide what surfaces here.
// ---------------------------------------------------------------------------

import { writing } from "@/lib/site";
import type { Post } from "@/lib/site";

/**
 * `featured=true` filters server-side, so the response is the shortlist rather
 * than the whole blog. Every format describes the same set; JSON is the one
 * that carries the `_dcyfr` extension we need for the category label.
 */
const FEED_URL = "https://www.dcyfr.ai/blog/feed?format=json&featured=true";

/**
 * How long a build serves the previous shortlist before refetching. The feed
 * sends s-maxage=3600, so anything shorter just re-reads the same CDN copy.
 */
const REVALIDATE_SECONDS = 3600;

/** Only the fields this page reads; the feed sends a good deal more. */
type JsonFeedItem = {
  id?: string;
  url?: string;
  title?: string;
  date_published?: string;
  tags?: string[];
  _dcyfr?: {
    featured?: boolean;
    category?: string;
    category_label?: string;
  };
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

/** "2026-06-22T12:00:00.000Z" -> "Jun 2026". UTC-pinned so the build host's
 *  timezone cannot walk a date back into the previous month. */
function formatDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

function toPost(item: JsonFeedItem, index: number): Post | null {
  const href = item.url || item.id;
  if (!href || !item.title || !item.date_published) return null;

  const date = formatDate(item.date_published);
  if (!date) return null;

  return {
    num: String(index + 1).padStart(2, "0"),
    title: item.title,
    // The category is the closest thing the feed has to the hand-written
    // kind line; the first tag is a reasonable stand-in when it is absent.
    kind: item._dcyfr?.category_label || item.tags?.[0] || "Writing",
    date,
    href,
  };
}

/**
 * Featured posts from dcyfr.ai, newest first.
 *
 * Falls back to the checked-in list in `lib/site.ts` whenever the feed cannot
 * be trusted: network failure, non-200, malformed body, or a response with no
 * items carrying `_dcyfr.featured`. That last case is the one that matters
 * during a deploy — an older dcyfr.ai does not know the `featured` parameter
 * and would answer with the whole blog, so requiring the flag on each item
 * means we show the curated four rather than whatever shipped most recently.
 */
export async function getFeaturedPosts(limit = 4): Promise<Post[]> {
  try {
    const res = await fetch(FEED_URL, {
      headers: { accept: "application/feed+json, application/json" },
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) return [...writing.posts];

    const body: unknown = await res.json();
    if (!isRecord(body) || !Array.isArray(body.items)) return [...writing.posts];

    const posts = (body.items as JsonFeedItem[])
      .filter((item) => item?._dcyfr?.featured === true)
      .slice(0, limit)
      .map(toPost)
      .filter((post): post is Post => post !== null);

    return posts.length > 0 ? posts : [...writing.posts];
  } catch {
    // A build must not fail because the sister site was briefly unreachable.
    return [...writing.posts];
  }
}
