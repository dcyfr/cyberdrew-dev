import { createClient } from "redis";

const VIEW_KEY_PREFIX = "views:post:";
const VIEW_HISTORY_KEY_PREFIX = "views:history:post:";
const redisUrl = process.env.REDIS_URL;

type RedisClient = ReturnType<typeof createClient>;

declare global {
  var __redisClient: RedisClient | undefined;
}

const formatKey = (postId: string) => `${VIEW_KEY_PREFIX}${postId}`;
const formatHistoryKey = (postId: string) => `${VIEW_HISTORY_KEY_PREFIX}${postId}`;

async function getClient(): Promise<RedisClient | null> {
  if (!redisUrl) return null;

  if (!globalThis.__redisClient) {
    const client = createClient({ url: redisUrl });
    client.on("error", (error) => {
      if (process.env.NODE_ENV !== "production") {
        console.error("Redis error", error);
      }
    });
    globalThis.__redisClient = client;
  }

  const client = globalThis.__redisClient;
  if (!client) return null;

  if (!client.isOpen) {
    await client.connect();
  }

  return client;
}

/**
 * Increment view count for a post by its ID
 * Uses the permanent post ID (not the slug) so views survive post renames
 * Also records the view in a sorted set for 24-hour tracking
 * @param postId Permanent post identifier (from post.id field)
 * @returns Updated view count, or null if Redis unavailable
 */
export async function incrementPostViews(postId: string): Promise<number | null> {
  const client = await getClient();
  if (!client) return null;
  try {
    const count = await client.incr(formatKey(postId));
    
    // Record view in sorted set with timestamp for 24-hour tracking
    const now = Date.now();
    await client.zAdd(formatHistoryKey(postId), {
      score: now,
      value: `${now}`,
    });
    
    // Clean up views older than 24 hours (keep data for trending analysis)
    const twentyFourHoursAgo = now - 24 * 60 * 60 * 1000;
    await client.zRemRangeByScore(formatHistoryKey(postId), "-inf", twentyFourHoursAgo);
    
    return count;
  } catch {
    return null;
  }
}

/**
 * Get view count for a post by its ID
 * @param postId Permanent post identifier (from post.id field)
 * @returns View count, or null if Redis unavailable
 */
export async function getPostViews(postId: string): Promise<number | null> {
  const client = await getClient();
  if (!client) return null;
  try {
    const value = await client.get(formatKey(postId));
    const parsed = value === null ? null : Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

/**
 * Get view count for a post in the last 24 hours
 * @param postId Permanent post identifier (from post.id field)
 * @returns View count in last 24 hours, or null if Redis unavailable
 */
export async function getPostViews24h(postId: string): Promise<number | null> {
  const client = await getClient();
  if (!client) return null;
  try {
    const now = Date.now();
    const twentyFourHoursAgo = now - 24 * 60 * 60 * 1000;
    const count = await client.zCount(
      formatHistoryKey(postId),
      twentyFourHoursAgo,
      now
    );
    return count;
  } catch {
    return null;
  }
}

/**
 * Get view counts for multiple posts at once (by ID)
 * Uses post IDs instead of slugs for permanence
 * @param postIds Array of permanent post identifiers
 * @returns Map of postId -> view count
 */
export async function getMultiplePostViews(postIds: string[]): Promise<Map<string, number>> {
  const client = await getClient();
  const viewMap = new Map<string, number>();
  
  if (!client) return viewMap;
  
  try {
    const keys = postIds.map(formatKey);
    const values = await client.mGet(keys);
    
    postIds.forEach((postId, index) => {
      const value = values[index];
      const parsed = value === null ? 0 : Number(value);
      if (Number.isFinite(parsed)) {
        viewMap.set(postId, parsed);
      }
    });
  } catch {
    // Return empty map on error
  }
  
  return viewMap;
}

/**
 * Get view counts for multiple posts in the last 24 hours
 * @param postIds Array of permanent post identifiers
 * @returns Map of postId -> 24h view count
 */
export async function getMultiplePostViews24h(postIds: string[]): Promise<Map<string, number>> {
  const client = await getClient();
  const viewMap = new Map<string, number>();
  
  if (!client) return viewMap;
  
  try {
    const now = Date.now();
    const twentyFourHoursAgo = now - 24 * 60 * 60 * 1000;
    
    // Get counts for all posts in parallel
    const counts = await Promise.all(
      postIds.map(async (postId) => {
        try {
          const count = await client.zCount(
            formatHistoryKey(postId),
            twentyFourHoursAgo,
            now
          );
          return { postId, count };
        } catch {
          return { postId, count: 0 };
        }
      })
    );
    
    counts.forEach(({ postId, count }) => {
      if (Number.isFinite(count)) {
        viewMap.set(postId, count);
      }
    });
  } catch {
    // Return empty map on error
  }
  
  return viewMap;
}
