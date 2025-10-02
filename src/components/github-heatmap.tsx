"use client";

import { useEffect, useState } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import { Card } from "@/components/ui/card";
import "react-calendar-heatmap/dist/styles.css";

interface ContributionDay {
  date: string;
  count: number;
}

interface ContributionResponse {
  contributions: ContributionDay[];
  source?: string;
  totalContributions?: number;
  timestamp?: number;
}

interface GitHubHeatmapProps {
  username: string;
}

// Cache key for localStorage
const getCacheKey = (username: string) => `github-contributions-${username}`;
const CACHE_DURATION = 1000 * 60 * 60 * 24; // 24 hours in milliseconds

export function GitHubHeatmap({ username }: GitHubHeatmapProps) {
  const [contributions, setContributions] = useState<ContributionDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dataSource, setDataSource] = useState<string>('');
  const [totalContributions, setTotalContributions] = useState<number>(0);

  useEffect(() => {
    const fetchContributions = async (): Promise<ContributionResponse> => {
      try {
        // Check for cached data first
        const cacheKey = getCacheKey(username);
        const cached = localStorage.getItem(cacheKey);
        
        if (cached) {
          try {
            const cachedData = JSON.parse(cached);
            const isExpired = cachedData.timestamp && (Date.now() - cachedData.timestamp > CACHE_DURATION);
            
            // If we have fresh cached data, use it
            if (!isExpired) {
              return {
                ...cachedData,
                source: 'cached'
              };
            }
          } catch {
            // Invalid cache, clear it
            localStorage.removeItem(cacheKey);
          }
        }

        // Try to fetch fresh data
        const response = await fetch(`/api/github-contributions?username=${username}`);
        
        if (response.ok) {
          const data: ContributionResponse = await response.json();
          // Cache successful response with timestamp
          const cacheData = {
            ...data,
            timestamp: Date.now()
          };
          localStorage.setItem(cacheKey, JSON.stringify(cacheData));
          return data;
        } else {
          throw new Error(`API error: ${response.status}`);
        }
      } catch (error) {
        console.error('Error fetching contributions:', error);
        
        // Check if we have any cached data (even if expired) before falling back to mock data
        const cacheKey = getCacheKey(username);
        const cached = localStorage.getItem(cacheKey);
        
        if (cached) {
          try {
            const cachedData = JSON.parse(cached);
            const isExpired = cachedData.timestamp && (Date.now() - cachedData.timestamp > CACHE_DURATION);
            
            setError(`Using ${isExpired ? 'expired cached' : 'cached'} data - API unavailable`);
            return {
              ...cachedData,
              source: `cached ${isExpired ? '(expired)' : ''}`
            };
          } catch {
            // Invalid cache, remove it and fall through to mock data
            localStorage.removeItem(cacheKey);
          }
        }
        
        // Final fallback to mock data
        throw error; // Let the useEffect handle the mock data generation
      }
    };

    const loadData = async () => {
      try {
        const data = await fetchContributions();
        setContributions(data.contributions || []);
        setDataSource(data.source || 'unknown');
        setTotalContributions(data.totalContributions || data.contributions?.length || 0);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load contributions");
        // Fallback: generate mock data for demonstration
        generateMockData();
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [username]);

  const generateMockData = () => {
    const endDate = new Date();
    const startDate = new Date(endDate);
    startDate.setFullYear(startDate.getFullYear() - 1);

    const mockData: ContributionDay[] = [];
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      const count = Math.random() > 0.7 ? Math.floor(Math.random() * 10) : 0;
      mockData.push({
        date: currentDate.toISOString().split('T')[0],
        count,
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }

    setContributions(mockData);
  };

  const endDate = new Date();
  const startDate = new Date(endDate);
  startDate.setFullYear(startDate.getFullYear() - 1);

  if (loading) {
    return (
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">GitHub Activity</h3>
          </div>
          <div className="flex items-center justify-center py-8">
            <div className="text-sm text-muted-foreground">Loading contributions...</div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Contribution Activity</h3>
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
          >
            @{username}
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z" clipRule="evenodd" />
              <path fillRule="evenodd" d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
        
        {(error || dataSource === 'mock-data') && (
          <div className="text-sm text-muted-foreground mb-2">
            {dataSource === 'mock-data' ? 'Demo data' : 'Limited data'} • <a
              href={`https://github.com/${username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-foreground"
            >
              View on GitHub
            </a>
          </div>
        )}

        <div className="overflow-x-auto">
          <CalendarHeatmap
            startDate={startDate}
            endDate={endDate}
            values={contributions}
            classForValue={(value) => {
              if (!value || value.count === 0) {
                return 'color-empty';
              }
              if (value.count < 3) {
                return 'color-scale-1';
              }
              if (value.count < 6) {
                return 'color-scale-2';
              }
              if (value.count < 9) {
                return 'color-scale-3';
              }
              return 'color-scale-4';
            }}
            showWeekdayLabels={false}
            showMonthLabels={false}
            showOutOfRangeDays={true}
            gutterSize={4}
            />
            {dataSource === 'github-api' && totalContributions > 0 && (
                <div className="text-sm text-muted-foreground mt-6 text-center">
                    {totalContributions} contributions in the last year
                </div>
            )}
        </div>

        <div className="flex items-center justify-center text-xs text-muted-foreground">
          <span>Less</span>
          <div className="flex items-center space-x-1 mx-4">
            <div className="w-2.5 h-2.5 bg-muted rounded-sm" />
            <div className="w-2.5 h-2.5 bg-green-200 dark:bg-green-900 rounded-sm" />
            <div className="w-2.5 h-2.5 bg-green-400 dark:bg-green-700 rounded-sm" />
            <div className="w-2.5 h-2.5 bg-green-600 dark:bg-green-500 rounded-sm" />
            <div className="w-2.5 h-2.5 bg-green-800 dark:bg-green-300 rounded-sm" />
          </div>
          <span>More</span>
        </div>
      </div>
    </Card>
  );
}