/**
 * Rate limiting utility for client-side protection
 */
class RateLimiter {
  private attempts: Map<string, number[]> = new Map();
  private readonly maxAttempts: number;
  private readonly windowMs: number;

  constructor(maxAttempts: number = 5, windowMs: number = 60000) {
    this.maxAttempts = maxAttempts;
    this.windowMs = windowMs;
  }

  /**
   * Check if action is allowed for given key
   */
  isAllowed(key: string): boolean {
    const now = Date.now();
    const attempts = this.attempts.get(key) || [];
    
    // Remove old attempts outside the window
    const validAttempts = attempts.filter(time => now - time < this.windowMs);
    
    if (validAttempts.length >= this.maxAttempts) {
      return false;
    }

    // Record this attempt
    validAttempts.push(now);
    this.attempts.set(key, validAttempts);
    
    return true;
  }

  /**
   * Clear attempts for a key
   */
  clear(key: string): void {
    this.attempts.delete(key);
  }

  /**
   * Get remaining attempts
   */
  getRemainingAttempts(key: string): number {
    const attempts = this.attempts.get(key) || [];
    const now = Date.now();
    const validAttempts = attempts.filter(time => now - time < this.windowMs);
    return Math.max(0, this.maxAttempts - validAttempts.length);
  }
}

// Export singleton instances for common use cases
export const searchRateLimiter = new RateLimiter(20, 60000); // 20 searches per minute
export const formRateLimiter = new RateLimiter(5, 300000); // 5 form submissions per 5 minutes

export { RateLimiter };