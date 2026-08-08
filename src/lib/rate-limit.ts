type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

/**
 * In-memory limiter. Good enough for a single instance and for stopping the
 * obvious floods; if the site ever runs on more than one instance, swap this
 * for Vercel KV or Upstash without touching the call site.
 */
export function rateLimit(
  key: string,
  { limit = 5, windowMs = 60_000 } = {},
): boolean {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || now > bucket.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (bucket.count >= limit) return false;

  bucket.count += 1;
  return true;
}
