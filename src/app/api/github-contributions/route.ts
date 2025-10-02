import { NextRequest, NextResponse } from "next/server";
import { loadCachedGitHubData } from "@/lib/github-cache";

interface GitHubContribution {
  date: string;
  count: number;
}

interface GitHubContributionDay {
  date: string;
  contributionCount: number;
}

interface GitHubContributionWeek {
  contributionDays: GitHubContributionDay[];
}

interface GitHubContributionCalendar {
  totalContributions: number;
  weeks: GitHubContributionWeek[];
}

const GITHUB_GRAPHQL_ENDPOINT = "https://api.github.com/graphql";

// GitHub GraphQL query to fetch contribution calendar
const CONTRIBUTIONS_QUERY = `
  query($username: String!, $from: DateTime, $to: DateTime) {
    user(login: $username) {
      contributionsCollection(from: $from, to: $to) {
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

interface CacheEntry {
  data: {
    contributions: GitHubContribution[];
    source: string;
    totalContributions?: number;
    warning?: string;
  };
  timestamp: number;
}

// Simple in-memory cache to avoid excessive API calls
const cache = new Map<string, CacheEntry>();
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour in milliseconds

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");

  if (!username) {
    return NextResponse.json(
      { error: "Username parameter is required" },
      { status: 400 }
    );
  }

  // Check cache first
  const cacheKey = `contributions-${username}`;
  const cachedData = cache.get(cacheKey);
  
  if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION) {
    return NextResponse.json(cachedData.data);
  }

  try {
    // Try to load build-time cached data first (from public/data/)
    const buildCachedData = loadCachedGitHubData();
    if (buildCachedData && buildCachedData.username === username) {
      console.log('📦 Using build-time cached GitHub data');
      
      const result = {
        contributions: buildCachedData.contributions,
        source: 'build-cache',
        totalContributions: buildCachedData.totalContributions,
        fetchedAt: buildCachedData.fetchedAt,
      };

      // Cache in memory for subsequent requests
      cache.set(cacheKey, {
        data: result,
        timestamp: Date.now(),
      });

      return NextResponse.json(result);
    }

    // Calculate date range (1 year ago to now)
    const to = new Date();
    const from = new Date(to);
    from.setFullYear(from.getFullYear() - 1);

    // Second, try to fetch real data from GitHub's GraphQL API
    const githubToken = process.env.GITHUB_TOKEN;
    
    if (!githubToken) {
      console.warn('⚠️ GITHUB_TOKEN not configured. Set it in Vercel environment variables for real contribution data.');
    }
    
    if (githubToken) {
      try {
        const response = await fetch(GITHUB_GRAPHQL_ENDPOINT, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${githubToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: CONTRIBUTIONS_QUERY,
            variables: {
              username,
              from: from.toISOString(),
              to: to.toISOString(),
            },
          }),
        });

        if (response.ok) {
          const data = await response.json();
          
          if (data.data?.user?.contributionsCollection) {
            const calendar: GitHubContributionCalendar = data.data.user.contributionsCollection.contributionCalendar;
            const contributions: GitHubContribution[] = [];

            // Transform GraphQL response to our format
            calendar.weeks.forEach((week: GitHubContributionWeek) => {
              week.contributionDays.forEach((day: GitHubContributionDay) => {
                contributions.push({
                  date: day.date,
                  count: day.contributionCount,
                });
              });
            });

            const apiResult = { 
              contributions,
              source: 'github-api',
              totalContributions: calendar.totalContributions 
            };

            // Cache the successful API result
            cache.set(cacheKey, {
              data: apiResult,
              timestamp: Date.now(),
            });

            return NextResponse.json(apiResult);
          }
        }
      } catch (error) {
        console.warn("Failed to fetch from GitHub API, falling back to mock data:", error);
      }
    }

    // Fallback to public GitHub contributions (scraping approach)
    let result;
    try {
      const publicResponse = await fetch(`https://github.com/users/${username}/contributions`, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; Portfolio-Bot/1.0)',
        },
      });

      if (publicResponse.ok) {
        const html = await publicResponse.text();
        
        // Parse SVG contribution graph from GitHub's public profile
        const contributions = parseContributionsFromHTML(html);
        
        if (contributions.length > 0) {
          result = { 
            contributions,
            source: 'github-public' 
          };
        }
      }
    } catch (error) {
      console.warn("Failed to fetch public GitHub contributions:", error);
    }

    // Final fallback: generate realistic mock data
    if (!result) {
      console.warn('⚠️ Using mock data. Configure GITHUB_TOKEN in Vercel for real contribution data.');
      const contributions = generateMockContributions();
      result = { 
        contributions,
        source: 'mock-data',
        warning: 'Using demo data. Configure GITHUB_TOKEN for real contributions.'
      };
    }

    // Cache the result
    cache.set(cacheKey, {
      data: result,
      timestamp: Date.now(),
    });

    return NextResponse.json(result);

  } catch (error) {
    console.error("Error in GitHub contributions API:", error);
    return NextResponse.json(
      { error: "Failed to fetch contributions" },
      { status: 500 }
    );
  }
}

function parseContributionsFromHTML(html: string): GitHubContribution[] {
  const contributions: GitHubContribution[] = [];
  
  try {
    // Look for contribution data in the HTML
    // GitHub's contribution graph uses data attributes like data-date and data-count
    const datePattern = /data-date="([^"]+)"[^>]*data-count="(\d+)"/g;
    let match;
    
    while ((match = datePattern.exec(html)) !== null) {
      const [, date, count] = match;
      contributions.push({
        date,
        count: parseInt(count, 10),
      });
    }
  } catch (error) {
    console.error("Error parsing contributions HTML:", error);
  }
  
  return contributions;
}

function generateMockContributions(): GitHubContribution[] {
  const contributions: GitHubContribution[] = [];
  const endDate = new Date();
  const startDate = new Date(endDate);
  startDate.setFullYear(startDate.getFullYear() - 1);

  const currentDate = new Date(startDate);
  
  while (currentDate <= endDate) {
    // Create realistic contribution patterns
    const dayOfWeek = currentDate.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const baseChance = isWeekend ? 0.3 : 0.7;
    
    let count = 0;
    if (Math.random() < baseChance) {
      // More realistic distribution of contribution counts
      const rand = Math.random();
      if (rand < 0.4) count = 1;
      else if (rand < 0.7) count = Math.floor(Math.random() * 3) + 2;
      else if (rand < 0.9) count = Math.floor(Math.random() * 5) + 5;
      else count = Math.floor(Math.random() * 10) + 10;
    }

    contributions.push({
      date: currentDate.toISOString().split('T')[0],
      count,
    });
    
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return contributions;
}