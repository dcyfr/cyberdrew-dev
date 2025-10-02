#!/usr/bin/env node

/**
 * Fetch GitHub contribution data at build time
 * This script fetches real GitHub contribution data and caches it in public/data/
 * to be used during deployment instead of relying on API calls or mock data.
 */

import { writeFile, mkdir } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const GITHUB_GRAPHQL_ENDPOINT = 'https://api.github.com/graphql';
const GITHUB_USERNAME = process.env.GITHUB_USERNAME || 'dcyfr';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

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

async function fetchGitHubContributions() {
  console.log('🔍 Fetching GitHub contribution data...');
  console.log(`   Username: ${GITHUB_USERNAME}`);
  
  if (!GITHUB_TOKEN) {
    console.warn('⚠️  GITHUB_TOKEN not set. Skipping real data fetch.');
    console.warn('   Set GITHUB_TOKEN environment variable for real contribution data.');
    return null;
  }

  try {
    // Calculate date range (1 year ago to now)
    const to = new Date();
    const from = new Date(to);
    from.setFullYear(from.getFullYear() - 1);

    const response = await fetch(GITHUB_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: CONTRIBUTIONS_QUERY,
        variables: {
          username: GITHUB_USERNAME,
          from: from.toISOString(),
          to: to.toISOString(),
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`GitHub API returned ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    if (data.errors) {
      throw new Error(`GraphQL errors: ${JSON.stringify(data.errors)}`);
    }

    if (!data.data?.user?.contributionsCollection) {
      throw new Error('Invalid response structure from GitHub API');
    }

    const calendar = data.data.user.contributionsCollection.contributionCalendar;
    const contributions = [];

    // Transform GraphQL response to our format
    calendar.weeks.forEach((week) => {
      week.contributionDays.forEach((day) => {
        contributions.push({
          date: day.date,
          count: day.contributionCount,
        });
      });
    });

    console.log(`✅ Successfully fetched ${contributions.length} days of contribution data`);
    console.log(`   Total contributions: ${calendar.totalContributions}`);

    return {
      contributions,
      totalContributions: calendar.totalContributions,
      username: GITHUB_USERNAME,
      source: 'github-api',
      fetchedAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error('❌ Failed to fetch GitHub contributions:', error.message);
    return null;
  }
}

async function saveCachedData(data) {
  const outputDir = join(__dirname, '..', 'public', 'data');
  const outputPath = join(outputDir, 'github-contributions.json');

  try {
    // Ensure the directory exists
    await mkdir(outputDir, { recursive: true });

    // Write the data
    await writeFile(outputPath, JSON.stringify(data, null, 2), 'utf-8');

    console.log(`💾 Cached data saved to: public/data/github-contributions.json`);
    return true;
  } catch (error) {
    console.error('❌ Failed to save cached data:', error.message);
    return false;
  }
}

async function main() {
  console.log('🚀 Starting GitHub data fetch for build...\n');

  const data = await fetchGitHubContributions();

  if (data) {
    await saveCachedData(data);
    console.log('\n✅ GitHub data fetch completed successfully!');
  } else {
    console.log('\n⚠️  No data fetched. Build will fall back to API or mock data.');
    // Don't fail the build if we can't fetch data
    process.exit(0);
  }
}

main().catch((error) => {
  console.error('❌ Fatal error:', error);
  // Don't fail the build, just warn
  process.exit(0);
});
