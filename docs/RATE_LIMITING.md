# Rate Limiting Implementation

## Overview

Rate limiting has been implemented for the contact form API to prevent abuse and protect against spam/DoS attacks.

## Current Implementation

### Configuration

- **Endpoint**: `/api/contact`
- **Limit**: 3 requests per 60 seconds per IP address
- **Storage**: In-memory (suitable for Vercel serverless functions)
- **Headers**: Standard rate limit headers included in responses

### Rate Limit Headers

All responses include the following headers:

```
X-RateLimit-Limit: 3          # Maximum requests allowed
X-RateLimit-Remaining: 2      # Requests remaining in window
X-RateLimit-Reset: 1696512000 # Unix timestamp when limit resets
```

When rate limit is exceeded, the response also includes:

```
Retry-After: 45               # Seconds to wait before retrying
```

### Response Format

#### Success (200 OK)
```json
{
  "success": true,
  "message": "Message received successfully"
}
```

#### Rate Limited (429 Too Many Requests)
```json
{
  "error": "Too many requests. Please try again later.",
  "retryAfter": 45
}
```

## Technical Details

### In-Memory Storage

The current implementation uses an in-memory Map for tracking request counts. This approach:

✅ **Pros:**
- Zero external dependencies
- No setup required
- Works perfectly with Vercel's serverless architecture
- Automatic cleanup of expired entries
- Low latency

⚠️ **Limitations:**
- Each serverless function instance has its own memory
- Not shared across multiple regions or instances
- Resets on cold starts (which is acceptable for this use case)

### IP Address Detection

The implementation correctly handles Vercel's proxy headers:
1. `x-forwarded-for` (primary, contains client IP)
2. `x-real-ip` (fallback)

## Upgrading to Distributed Rate Limiting

For high-traffic sites or stricter rate limiting requirements, upgrade to a distributed solution:

### Option 1: Vercel KV (Recommended)

Vercel KV is a Redis-compatible database optimized for serverless:

1. **Install dependency:**
   ```bash
   npm install @vercel/kv
   ```

2. **Set up Vercel KV:**
   - Go to Vercel Dashboard → Storage → Create KV Database
   - Link it to your project

3. **Update `src/lib/rate-limit.ts`:**
   ```typescript
   import { kv } from "@vercel/kv";
   
   export async function rateLimit(
     identifier: string,
     config: RateLimitConfig
   ): Promise<RateLimitResult> {
     const key = `rate_limit:${identifier}`;
     const now = Date.now();
     const windowMs = config.windowInSeconds * 1000;
     
     // Use Redis pipeline for atomic operations
     const pipeline = kv.pipeline();
     pipeline.incr(key);
     pipeline.pexpire(key, windowMs);
     
     const [count] = await pipeline.exec();
     
     const remaining = Math.max(0, config.limit - (count as number));
     const success = (count as number) <= config.limit;
     
     return {
       success,
       limit: config.limit,
       remaining,
       reset: now + windowMs,
     };
   }
   ```

### Option 2: Upstash Redis

Upstash offers a serverless Redis solution with a generous free tier:

1. **Install dependency:**
   ```bash
   npm install @upstash/redis
   ```

2. **Set up Upstash:**
   - Create account at https://upstash.com
   - Create a Redis database
   - Get `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`

3. **Add to `.env.local`:**
   ```
   UPSTASH_REDIS_REST_URL=https://your-db.upstash.io
   UPSTASH_REDIS_REST_TOKEN=your-token
   ```

4. **Update `src/lib/rate-limit.ts`:**
   ```typescript
   import { Redis } from "@upstash/redis";
   
   const redis = new Redis({
     url: process.env.UPSTASH_REDIS_REST_URL!,
     token: process.env.UPSTASH_REDIS_REST_TOKEN!,
   });
   
   export async function rateLimit(
     identifier: string,
     config: RateLimitConfig
   ): Promise<RateLimitResult> {
     const key = `rate_limit:${identifier}`;
     const now = Date.now();
     const windowMs = config.windowInSeconds * 1000;
     
     const count = await redis.incr(key);
     
     if (count === 1) {
       await redis.expire(key, config.windowInSeconds);
     }
     
     const remaining = Math.max(0, config.limit - count);
     const success = count <= config.limit;
     
     return {
       success,
       limit: config.limit,
       remaining,
       reset: now + windowMs,
     };
   }
   ```

## Testing

### Manual Testing

1. **Normal request:**
   ```bash
   curl -X POST http://localhost:3000/api/contact \
     -H "Content-Type: application/json" \
     -d '{"name":"Test","email":"test@example.com","message":"Test message"}'
   ```

2. **Trigger rate limit:**
   ```bash
   # Run this 4 times quickly
   for i in {1..4}; do
     curl -X POST http://localhost:3000/api/contact \
       -H "Content-Type: application/json" \
       -d '{"name":"Test","email":"test@example.com","message":"Test message"}' \
       -i
   done
   ```

3. **Check headers:**
   Look for `X-RateLimit-*` and `Retry-After` headers in the response.

### Automated Testing

Consider adding tests with Playwright or Vitest:

```typescript
// Example test
test("rate limits contact form after 3 requests", async () => {
  const payload = {
    name: "Test User",
    email: "test@example.com",
    message: "Test message",
  };

  // First 3 requests should succeed
  for (let i = 0; i < 3; i++) {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    expect(response.status).toBe(200);
  }

  // 4th request should be rate limited
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  expect(response.status).toBe(429);
});
```

## Monitoring

Consider logging rate limit violations for monitoring:

```typescript
// In src/app/api/contact/route.ts
if (!rateLimitResult.success) {
  console.warn("Rate limit exceeded:", {
    ip: clientIp,
    timestamp: new Date().toISOString(),
    remaining: rateLimitResult.remaining,
    reset: new Date(rateLimitResult.reset).toISOString(),
  });
  // ... return 429 response
}
```

## Future Enhancements

- [ ] Add rate limiting to other API routes (if added)
- [ ] Implement different rate limits for authenticated users
- [ ] Add allowlist for trusted IPs
- [ ] Set up alerts for excessive rate limit violations
- [ ] Consider CAPTCHA for repeated violations

## References

- [MDN: 429 Too Many Requests](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/429)
- [IETF Draft: RateLimit Header Fields](https://datatracker.ietf.org/doc/html/draft-ietf-httpapi-ratelimit-headers)
- [Vercel KV Documentation](https://vercel.com/docs/storage/vercel-kv)
- [Upstash Documentation](https://docs.upstash.com/redis)
