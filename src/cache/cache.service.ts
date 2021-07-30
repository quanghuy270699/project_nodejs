import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisCacheService {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cache: Cache,
  ) {}

  /**
   * Returns a value of a key
   * @param key 
   * @returns 
   */
  async get(key): Promise<string> {
    return await this.cache.get(key);
  }

  /**
   * Returns many values of keys
   * @param keys 
   * @returns 
   */
  async getMany(keys: string[]): Promise<string[]> {
    return await this.cache.mget(keys);
  }

  /**
   * Sets value to a key
   * @param key 
   * @param value 
   */
  async set(key, value) {
    await this.cache.set(key, value);
  }
}