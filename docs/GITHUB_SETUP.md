# GitHub Activity Integration

The projects page now includes a real-time GitHub activity heatmap that fetches contribution data from your GitHub account.

## How it works

The GitHub heatmap component uses a tiered approach to fetch contribution data:

1. **GitHub GraphQL API** (Best quality) - Uses your GitHub token to fetch real contribution data
2. **Public GitHub Profile** (Good quality) - Scrapes public contribution data from GitHub
3. **Mock Data** (Demo quality) - Generates realistic demo data as fallback

## Setup

### Option 1: Use GitHub API Token (Recommended)

1. Create a Personal Access Token at https://github.com/settings/tokens
2. Select the `read:user` scope for public profile access
3. Add your token to your environment variables:

```bash
# In .env.local or .env
GITHUB_TOKEN=your_github_token_here
```

4. Restart your development server

### Option 2: Use Public Data (No Setup Required)

The component will automatically fall back to parsing public contribution data from GitHub's public profile page. This works without any configuration but may have limitations.

### Option 3: Demo Mode (No Setup Required)

If neither of the above methods work, the component will display realistic demo data.

## Features

- **Real-time data**: Fetches the latest contribution activity from GitHub
- **Intelligent fallback**: Gracefully handles API failures with multiple fallback strategies
- **Caching**: Caches API responses for 1 hour to improve performance and respect rate limits
- **Source indicator**: Shows whether data is from GitHub API, public profile, or demo mode
- **Responsive design**: Adapts to different screen sizes
- **Theme support**: Automatically adjusts colors for light/dark themes

## Data Sources

The heatmap will show different indicators based on the data source:

- **GitHub API**: Shows exact contribution count and "X contributions in the last year"
- **Public Profile**: Shows "Limited data • View on GitHub" 
- **Demo Mode**: Shows "Demo data • View on GitHub"

## Rate Limiting

The GitHub API has rate limits:
- **With token**: 5,000 requests per hour
- **Without token**: 60 requests per hour

The component includes caching to minimize API calls and respect these limits.