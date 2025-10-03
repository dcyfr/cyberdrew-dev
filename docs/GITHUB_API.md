# GitHub Contributions API

## Overview

The GitHub Contributions API endpoint fetches contribution calendar data for the portfolio owner (`dcyfr`). It uses GitHub's GraphQL API with comprehensive security measures and includes fallback functionality.

## Security Features

This endpoint includes multiple layers of protection against abuse:

### 1. Rate Limiting
- **10 requests per minute** per IP address
- Returns `429 Too Many Requests` when exceeded
- Includes `Retry-After` header with seconds until reset
- In-memory tracking with automatic cleanup

### 2. Username Restriction
- Only accepts username `dcyfr` (portfolio owner)
- Returns `403 Forbidden` for any other username
- Prevents abuse by querying arbitrary GitHub users

### 3. Input Validation
- Validates GitHub username format (alphanumeric + hyphens, max 39 chars)
- Returns `400 Bad Request` for invalid formats
- Prevents injection attacks and malformed requests

### 4. Server-Side Caching
- 5-minute cache duration on server
- Reduces load on GitHub API
- Returns cached responses instantly
- Separate short cache (1 min) for fallback data

### 5. Request Timeout
- 10-second timeout on GitHub API requests
- Prevents hanging connections
- Fails fast with fallback data

### 6. HTTP Headers
- `Cache-Control` for CDN/browser caching
- `X-Cache-Status` indicates cache hit/miss
- `X-RateLimit-Limit` shows request limits
- `Retry-After` for rate limited requests

## Endpoint

```
GET /api/github-contributions?username=dcyfr
```

### Parameters

- `username` (required): Must be `dcyfr` (portfolio owner only)

### Response Format

```typescript
{
  contributions: ContributionDay[];  // Array of daily contribution counts
  source: string;                     // "github-api" or "fallback"
  totalContributions: number;         // Total contributions in the past year
  warning?: string;                   // Optional warning message
}

interface ContributionDay {
  date: string;      // ISO date format (YYYY-MM-DD)
  count: number;     // Number of contributions on that day
}
```

## Authentication

The API supports an optional GitHub Personal Access Token for higher rate limits:

1. Create a GitHub Personal Access Token at https://github.com/settings/tokens
   - No special scopes are required for public profile data
   - Read-only access is sufficient

2. Add the token to your environment variables:
   ```bash
   # .env.local
   GITHUB_TOKEN=ghp_yourTokenHere
   ```

3. The API will automatically use the token if available

**Note**: Without a token, GitHub's API has a rate limit of 60 requests/hour per IP. With authentication, this increases to 5,000 requests/hour.

## Features

### 1. GitHub GraphQL API Integration

Fetches real contribution data using GitHub's GraphQL API:
- Last 365 days of contribution activity
- Daily contribution counts
- Total contributions
- 10-second request timeout

### 2. Server-Side Caching

Efficient caching reduces GitHub API calls:
- 5-minute cache for successful responses
- 1-minute cache for fallback data
- In-memory storage (serverless compatible)
- Cache status in response headers

### 3. Fallback Data

If the GitHub API is unavailable (rate limited, network error, etc.), the endpoint automatically returns realistic fallback data:
- Random contribution patterns
- Weekday/weekend variation
- Includes a warning message in the response
- Shorter cache duration for automatic retry

### 4. Error Handling

- Returns 400 if username parameter is missing or invalid
- Returns 403 if username is not the portfolio owner
- Returns 429 if rate limit exceeded (with retry info)
- Gracefully handles GitHub API errors
- Falls back to sample data instead of returning error responses

### 5. Security & Performance

- IP-based rate limiting (10 req/min)
- Username whitelist (dcyfr only)
- Input validation and sanitization
- Request timeouts
- HTTP caching headers
- Automatic cleanup of rate limit records

## Usage Example

### JavaScript/TypeScript

```typescript
const response = await fetch('/api/github-contributions?username=dcyfr');
const data = await response.json();

console.log(`Total contributions: ${data.totalContributions}`);
console.log(`Data source: ${data.source}`);
console.log(`Number of days: ${data.contributions.length}`);
```

### cURL

```bash
curl http://localhost:3000/api/github-contributions?username=dcyfr
```

## Component Integration

The `GitHubHeatmap` component (`src/components/github-heatmap.tsx`) uses this API:

1. Checks localStorage cache first (24-hour TTL)
2. Fetches from API if cache is stale
3. Caches successful responses
4. Falls back to expired cache if API fails
5. Displays appropriate UI states (loading, error, success)

## Deployment Considerations

### Vercel Deployment

When deploying to Vercel:

1. Add `GITHUB_TOKEN` to your Vercel project environment variables:
   - Go to Project Settings → Environment Variables
   - Add `GITHUB_TOKEN` with your token value
   - Apply to Production, Preview, and Development environments

2. The API route will automatically use the token in serverless functions

### Rate Limiting

Without authentication:
- 60 requests/hour per IP
- Shared across all GitHub API calls from that IP

With authentication:
- 5,000 requests/hour per token
- Dedicated to your application

### Caching Strategy

The component implements client-side caching:
- 24-hour cache duration
- localStorage-based
- Falls back to expired cache if API fails
- Reduces API calls and improves performance

## Troubleshooting

### "Unable to load contribution data"

**Causes**:
- Rate limit exceeded (GitHub or endpoint)
- Network error
- GitHub API downtime

**Solutions**:
1. Add a `GITHUB_TOKEN` environment variable
2. Check browser console for specific errors
3. Try again after rate limit resets (1 hour for GitHub, 1 minute for endpoint)

### "Unauthorized: This endpoint only serves data for the portfolio owner"

**Cause**: Attempting to query a username other than `dcyfr`

**Solution**: This is expected behavior. The endpoint is restricted to the portfolio owner for security.

### "Rate limit exceeded. Please try again later."

**Cause**: More than 10 requests per minute from your IP

**Solution**: 
- Wait 1 minute and try again
- Check the `Retry-After` header for exact wait time
- Reduce request frequency

### "Invalid username format"

**Cause**: Username contains invalid characters or is too long

**Solution**: Verify the username parameter follows GitHub username rules (alphanumeric + hyphens, max 39 chars)

### Fallback Data Displayed

If you see "Displaying sample data" or a warning banner:
- The GitHub API is currently unavailable
- The endpoint is using generated fallback data
- No action required; it will retry on next fetch

### API Returns 400

- Verify the `username` query parameter is included in the request
- Check that the username value is not empty
- Ensure username contains only valid characters (alphanumeric + hyphens)
- Maximum length is 39 characters

### API Returns 403

- You're attempting to query a username other than `dcyfr`
- This endpoint is restricted to the portfolio owner only
- This is a security feature to prevent abuse

### API Returns 429

- You've exceeded the rate limit (10 requests/minute)
- Check the `Retry-After` header for wait time
- Reduce request frequency or wait for the window to reset

## Security

- **Username Restricted**: Only serves data for `dcyfr` (portfolio owner)
- **Rate Limited**: 10 requests/minute per IP address
- **Input Validated**: Prevents injection attacks and malformed requests
- **Request Timeout**: 10-second max to prevent hanging
- **Server-Side Cache**: Reduces load on GitHub API
- **Token Optional**: API token stored server-side only, never exposed to client
- **Token Permissions**: Requires no special permissions for public profiles
- **Read-Only Access**: Token only needs read access to public data
- **Automatic Cleanup**: Rate limit records automatically purged
- **Cache Headers**: Proper HTTP caching to reduce unnecessary requests

## File Location

```
src/app/api/github-contributions/route.ts
```

## Related Files

- `src/components/github-heatmap.tsx` - Client component that consumes this API
- `docs/GITHUB_REFACTOR.md` - Historical context on architecture changes
