/**
 * Utility to load cached GitHub contribution data from build-time fetch
 * Falls back to null if no cached data is available
 */

import { readFileSync } from 'fs';
import { join } from 'path';

export interface GitHubContribution {
  date: string;
  count: number;
}

export interface CachedGitHubData {
  contributions: GitHubContribution[];
  totalContributions: number;
  username: string;
  source: string;
  fetchedAt: string;
}

/**
 * Load cached GitHub contribution data from public/data/github-contributions.json
 * Returns null if file doesn't exist or is invalid
 */
export function loadCachedGitHubData(): CachedGitHubData | null {
  try {
    // In production, this file should be in public/data/
    const dataPath = join(process.cwd(), 'public', 'data', 'github-contributions.json');
    const data = readFileSync(dataPath, 'utf-8');
    const parsed = JSON.parse(data);

    // Validate the structure
    if (
      !parsed.contributions ||
      !Array.isArray(parsed.contributions) ||
      typeof parsed.totalContributions !== 'number'
    ) {
      console.warn('Invalid cached GitHub data structure');
      return null;
    }

    return parsed;
  } catch {
    // File doesn't exist or couldn't be read - this is OK
    // It means the build-time fetch didn't run or didn't succeed
    return null;
  }
}

/**
 * Check if cached data is stale (older than specified days)
 */
export function isCachedDataStale(data: CachedGitHubData, maxAgeDays = 1): boolean {
  try {
    const fetchedAt = new Date(data.fetchedAt);
    const now = new Date();
    const ageInMs = now.getTime() - fetchedAt.getTime();
    const ageInDays = ageInMs / (1000 * 60 * 60 * 24);
    
    return ageInDays > maxAgeDays;
  } catch {
    return true; // If we can't parse the date, consider it stale
  }
}
