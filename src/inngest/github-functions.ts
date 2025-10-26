import { inngest } from "./client";
import { createClient } from "redis";

// GitHub configuration
const GITHUB_USERNAME = "dcyfr";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

// Redis configuration
const redisUrl = process.env.REDIS_URL;
type RedisClient = ReturnType<typeof createClient>;

declare global {
  var __githubCacheRedisClient: RedisClient | undefined;
}

async function getRedisClient(): Promise<RedisClient | null> {
  if (!redisUrl) return null;

  if (!globalThis.__githubCacheRedisClient) {
    const client = createClient({ url: redisUrl });
    client.on("error", (error) => {
      console.error("GitHub cache Redis error:", error);
    });
    globalThis.__githubCacheRedisClient = client;
  }

  const client = globalThis.__githubCacheRedisClient;
  if (!client) return null;

  if (!client.isOpen) {
    await client.connect();
  }

  return client;
}

const CACHE_KEY = "github:contributions:dcyfr";
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

interface ContributionDay {
  date: string;
  count: number;
}

interface ContributionResponse {
  contributions: ContributionDay[];
  source: string;
  totalContributions: number;
  lastUpdated: string;
}

/**
 * Fetch GitHub contribution data from GraphQL API
 */
async function fetchGitHubContributions(): Promise<ContributionResponse | null> {
  const query = `
    query($username: String!) {
      user(login: $username) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
              }
            }
          }
        }
      }
    }
  `;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  // Only add Authorization header if GITHUB_TOKEN is configured
  if (GITHUB_TOKEN) {
    headers["Authorization"] = `Bearer ${GITHUB_TOKEN}`;
  }

  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers,
      body: JSON.stringify({
        query,
        variables: { username: GITHUB_USERNAME },
      }),
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const data = await response.json();

    if (data.errors) {
      throw new Error(`GraphQL error: ${JSON.stringify(data.errors)}`);
    }

    const calendar = data.data?.user?.contributionsCollection?.contributionCalendar;
    
    if (!calendar) {
      throw new Error("Invalid response structure from GitHub API");
    }

    const contributions: ContributionDay[] = calendar.weeks.flatMap(
      (week: { contributionDays: { date: string; contributionCount: number }[] }) =>
        week.contributionDays.map((day) => ({
          date: day.date,
          count: day.contributionCount,
        }))
    );

    return {
      contributions,
      source: "github-api",
      totalContributions: calendar.totalContributions,
      lastUpdated: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Failed to fetch GitHub contributions:", error);
    return null;
  }
}

/**
 * Scheduled GitHub data refresh function
 * 
 * Runs every 5 minutes to keep contribution data fresh.
 * Fetches latest data from GitHub GraphQL API and updates Redis cache.
 * 
 * Benefits:
 * - Pre-populated cache for instant page loads
 * - Reduced load on GitHub API
 * - Better handling of rate limits
 * - Proactive error detection
 * 
 * Cron schedule: every 5 minutes
 */
export const refreshGitHubData = inngest.createFunction(
  { 
    id: "refresh-github-data",
    retries: 2,
  },
  { cron: "*/5 * * * *" }, // Every 5 minutes
  async ({ step }) => {
    // Step 1: Fetch fresh data from GitHub
    const freshData = await step.run("fetch-github-data", async () => {
      console.log("Fetching GitHub contributions for:", GITHUB_USERNAME);
      return await fetchGitHubContributions();
    });

    if (!freshData) {
      console.warn("Failed to fetch GitHub data, keeping existing cache");
      return { success: false, reason: "fetch-failed" };
    }

    // Step 2: Update Redis cache
    const cacheResult = await step.run("update-cache", async () => {
      const redis = await getRedisClient();
      
      if (!redis) {
        console.warn("Redis not configured, skipping cache update");
        return { success: false, reason: "redis-not-configured" };
      }

      try {
        await redis.setEx(
          CACHE_KEY,
          Math.floor(CACHE_DURATION / 1000),
          JSON.stringify(freshData)
        );

        console.log("GitHub data cached successfully:", {
          totalContributions: freshData.totalContributions,
          lastUpdated: freshData.lastUpdated,
        });

        return { success: true };
      } catch (error) {
        console.error("Failed to update Redis cache:", error);
        return { success: false, error: String(error) };
      }
    });

    return {
      success: true,
      totalContributions: freshData.totalContributions,
      cached: cacheResult.success,
      lastUpdated: freshData.lastUpdated,
    };
  },
);

/**
 * Manual GitHub data refresh function
 * 
 * @remarks
 * Triggered by event for manual/forced refresh:
 * - On-demand refresh from admin panel
 * - Force refresh after profile updates
 * - Immediate refresh after deployment
 * 
 * Use cases:
 * - Testing after GitHub profile changes
 * - Warming up cache after deployment
 * - Manual override when scheduled job fails
 */
export const manualRefreshGitHubData = inngest.createFunction(
  { 
    id: "manual-refresh-github-data",
    retries: 1,
  },
  { event: "github/data.refresh" },
  async ({ event, step }) => {
    const { force } = event.data;

    // If not forced, check if cache is still fresh
    const redis = await getRedisClient();
    
    if (!force && redis) {
      const cached = await step.run("check-cache", async () => {
        try {
          const cachedStr = await redis.get(CACHE_KEY);
          if (cachedStr) {
            const cached = JSON.parse(cachedStr as string) as ContributionResponse;
            const age = Date.now() - new Date(cached.lastUpdated).getTime();
            
            if (age < CACHE_DURATION) {
              console.log("Cache is still fresh, skipping refresh");
              return { fresh: true, age };
            }
          }
        } catch (error) {
          console.error("Error checking cache:", error);
        }
        return { fresh: false };
      });

      if (cached.fresh) {
        return { success: true, reason: "cache-fresh", skipped: true };
      }
    }

    // Reuse the same logic as scheduled refresh
    const freshData = await step.run("fetch-github-data", async () => {
      return await fetchGitHubContributions();
    });

    if (!freshData) {
      return { success: false, reason: "fetch-failed" };
    }

    await step.run("update-cache", async () => {
      if (redis) {
        await redis.setEx(
          CACHE_KEY,
          Math.floor(CACHE_DURATION / 1000),
          JSON.stringify(freshData)
        );
      }
    });

    return {
      success: true,
      totalContributions: freshData.totalContributions,
      lastUpdated: freshData.lastUpdated,
      manual: true,
    };
  },
);
