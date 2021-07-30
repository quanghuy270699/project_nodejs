import { CacheModule } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';
import { Configuration } from '../config/config.keys';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';

/**
 * See more:
 * https://github.com/skunight/nestjs-redis
 * https://dev.to/piavgh/nest-js-caching-with-redis-1eon
 */
export const redisProviers = [
  CacheModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (config:ConfigService) => ({
      store: redisStore,
      host: config.get(Configuration.REDIS_HOST),
      post: config.get(Configuration.REDIS_PORT),
      db: config.get(Configuration.REDIS_DB),
      password: config.get(Configuration.REDIS_PASSWORD),
      keyPrefix: config.get(Configuration.REDIS_KEY_PRIFIX)      
    })
  })
]