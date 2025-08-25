/**
 * Cache utility for MCP Server tools
 */

// Default cache TTL (180 minutes)
export const DEFAULT_CACHE_TTL = 180 * 60 * 1000;

export interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

export interface CacheOptions {
  ttl?: number;
}

export class Cache {
  private static instances = new Map<string, Cache>();
  private cache = new Map<string, CacheEntry<any>>();
  private ttl: number;

  private constructor(ttl: number = DEFAULT_CACHE_TTL) {
    this.ttl = ttl;
  }

  /**
   * Get a cache instance by name, creating it if it doesn't exist
   */
  static getInstance(name: string, options: CacheOptions = {}): Cache {
    if (!Cache.instances.has(name)) {
      Cache.instances.set(name, new Cache(options.ttl));
    }
    return Cache.instances.get(name)!;
  }

  /**
   * Get a value from cache if it exists and is not expired
   */
  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    const now = Date.now();
    if (now - entry.timestamp > this.ttl) {
      this.cache.delete(key);
      return null;
    }

    return entry.data;
  }

  /**
   * Set a value in the cache
   */
  set<T>(key: string, data: T): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    });
  }

  /**
   * Get a cached value if it exists, otherwise compute and cache it
   */
  async getOrCompute<T>(key: string, compute: () => Promise<T>): Promise<T> {
    const cached = this.get<T>(key);
    if (cached !== null) {
      return cached;
    }

    const value = await compute();
    this.set(key, value);
    return value;
  }
}
