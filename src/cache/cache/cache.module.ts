import { CacheModule, Module } from '@nestjs/common';
import { RedisCacheService } from './cache.service';
import { ConfigModule } from '../config/config.module';
import { Configuration } from '../config/config.keys';
import { ConfigService } from '../config/config.service';

import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        store: redisStore,
        host: config.get(Configuration.REDIS_HOST),
        port: config.get(Configuration.REDIS_PORT),
        // db: config.get(Configuration.REDIS_DB),
        // password: config.get(Configuration.REDIS_PASSWORD),
        // keyPrefix: config.get(Configuration.REDIS_KEY_PRIFIX),
        ttl: config.get(Configuration.CACHE_TTL),
      }),
    }),
  ],
  providers: [RedisCacheService],
  exports: [RedisCacheService],
})
export class RedisCacheModule {}