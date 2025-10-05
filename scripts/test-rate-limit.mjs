#!/usr/bin/env node

/**
 * Test script for rate limiting implementation
 * 
 * This script tests the contact form rate limiting by:
 * 1. Making 3 successful requests (should all succeed)
 * 2. Making a 4th request (should be rate limited)
 * 3. Verifying rate limit headers are present
 * 
 * Usage:
 *   node scripts/test-rate-limit.mjs
 * 
 * Note: Requires the dev server to be running (npm run dev)
 */

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
const API_ENDPOINT = `${BASE_URL}/api/contact`;

const testPayload = {
  name: "Rate Limit Test",
  email: "test@example.com",
  message: "This is a test message for rate limiting validation.",
};

async function makeRequest(requestNumber) {
  console.log(`\n🔄 Request ${requestNumber}...`);
  
  try {
    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testPayload),
    });

    const data = await response.json();
    
    // Extract rate limit headers
    const rateLimitHeaders = {
      limit: response.headers.get("x-ratelimit-limit"),
      remaining: response.headers.get("x-ratelimit-remaining"),
      reset: response.headers.get("x-ratelimit-reset"),
      retryAfter: response.headers.get("retry-after"),
    };

    console.log(`   Status: ${response.status} ${response.statusText}`);
    console.log(`   Rate Limit Headers:`);
    console.log(`     Limit: ${rateLimitHeaders.limit}`);
    console.log(`     Remaining: ${rateLimitHeaders.remaining}`);
    console.log(`     Reset: ${rateLimitHeaders.reset ? new Date(parseInt(rateLimitHeaders.reset)).toISOString() : "N/A"}`);
    if (rateLimitHeaders.retryAfter) {
      console.log(`     Retry After: ${rateLimitHeaders.retryAfter}s`);
    }
    console.log(`   Response:`, JSON.stringify(data, null, 2));

    return {
      status: response.status,
      data,
      headers: rateLimitHeaders,
    };
  } catch (error) {
    console.error(`   ❌ Error:`, error.message);
    return null;
  }
}

async function runTests() {
  console.log("🧪 Testing Rate Limiting Implementation");
  console.log("=" .repeat(60));
  console.log(`API Endpoint: ${API_ENDPOINT}`);
  console.log(`Expected Limit: 3 requests per 60 seconds`);

  // Test: Make 4 requests
  const results = [];
  for (let i = 1; i <= 4; i++) {
    const result = await makeRequest(i);
    results.push(result);
    
    // Small delay between requests
    if (i < 4) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }

  // Validate results
  console.log("\n" + "=".repeat(60));
  console.log("📊 Test Results Summary");
  console.log("=".repeat(60));

  let passed = 0;
  let failed = 0;

  // Check first 3 requests succeeded
  for (let i = 0; i < 3; i++) {
    const result = results[i];
    if (result && result.status === 200) {
      console.log(`✅ Request ${i + 1}: SUCCESS (200 OK)`);
      passed++;
    } else {
      console.log(`❌ Request ${i + 1}: FAILED (Expected 200, got ${result?.status || "ERROR"})`);
      failed++;
    }
  }

  // Check 4th request was rate limited
  const fourthRequest = results[3];
  if (fourthRequest && fourthRequest.status === 429) {
    console.log(`✅ Request 4: RATE LIMITED (429 Too Many Requests)`);
    console.log(`   Retry After: ${fourthRequest.headers.retryAfter}s`);
    passed++;
  } else {
    console.log(`❌ Request 4: FAILED (Expected 429, got ${fourthRequest?.status || "ERROR"})`);
    failed++;
  }

  // Check headers are present
  const hasHeaders = results.some(r => r && r.headers.limit && r.headers.remaining !== null);
  if (hasHeaders) {
    console.log(`✅ Rate limit headers present`);
    passed++;
  } else {
    console.log(`❌ Rate limit headers missing`);
    failed++;
  }

  console.log("\n" + "=".repeat(60));
  console.log(`🎯 Final Score: ${passed}/5 tests passed`);
  console.log("=".repeat(60));

  if (failed === 0) {
    console.log("\n🎉 All tests passed! Rate limiting is working correctly.");
    process.exit(0);
  } else {
    console.log(`\n⚠️  ${failed} test(s) failed. Please review the implementation.`);
    process.exit(1);
  }
}

// Check if server is running
async function checkServer() {
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
      throw new Error(`Server returned ${response.status}`);
    }
  } catch {
    console.error(`\n❌ Cannot connect to ${BASE_URL}`);
    console.error(`   Make sure the dev server is running: npm run dev\n`);
    process.exit(1);
  }
}

// Run tests
(async () => {
  await checkServer();
  await runTests();
})();
