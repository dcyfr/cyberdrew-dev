# GitHub Contribution Data Caching

This project includes a build-time script that fetches real GitHub contribution data and caches it for use in production, eliminating the need for runtime API calls or mock data.

## How It Works

1. **Build-time fetch**: During `npm run build`, the `fetch-github-data.mjs` script fetches your GitHub contribution history via the GitHub GraphQL API.

2. **Static caching**: The data is saved to `public/data/github-contributions.json` (gitignored).

3. **Priority order**: The API route checks for data in this order:
   - Build-time cached data (from `public/data/`)
   - GitHub GraphQL API (if `GITHUB_TOKEN` is set)
   - GitHub public profile scraping
   - Mock data (fallback)

## Setup for Real Data

### Local Development

Set the `GITHUB_TOKEN` environment variable:

\`\`\`bash
# In your .env.local file
GITHUB_TOKEN=ghp_your_personal_access_token_here
GITHUB_USERNAME=dcyfr
\`\`\`

### Vercel Deployment

1. Go to your Vercel project settings
2. Navigate to "Environment Variables"
3. Add these variables:
   - `GITHUB_TOKEN`: Your GitHub Personal Access Token
   - `GITHUB_USERNAME`: Your GitHub username (optional, defaults to `dcyfr`)

### Creating a GitHub Personal Access Token

1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Give it a descriptive name (e.g., "Portfolio Build")
4. Select scopes:
   - `read:user` - Read user profile data
5. Generate and copy the token
6. **Important**: Save it securely - you won't be able to see it again

**Note**: The token only needs `read:user` scope for public contribution data.

## Manual Data Fetch

You can manually fetch GitHub data anytime:

\`\`\`bash
npm run fetch:github
\`\`\`

This is useful for:
- Testing the setup locally
- Refreshing cached data without a full rebuild
- Debugging data issues

## Files

- **scripts/fetch-github-data.mjs** - Build-time data fetcher
- **src/lib/github-cache.ts** - Utility to load cached data
- **public/data/github-contributions.json** - Cached data (generated, gitignored)
- **src/app/api/github-contributions/route.ts** - API endpoint that serves the data

## Security Notes

- The `GITHUB_TOKEN` is only used at build time (in CI/CD) or in API routes (server-side)
- It is never exposed to the client
- The cached data in `public/data/` contains only public contribution counts
- No sensitive information is stored or transmitted

## Behavior Without Token

If no `GITHUB_TOKEN` is configured:
- Build will succeed (no errors)
- The script will skip the fetch
- The site will fall back to mock data
- You'll see warnings in the build logs

This ensures the site always builds successfully, even without real data.
