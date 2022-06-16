import { RedisService } from './redis.service';
import { CacheModule, Module } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';
import { REPOSITORY } from 'src/constants';

@Module({
  imports: [
    CacheModule.registerAsync({
      useFactory: async () => ({
        store: redisStore,
        host: process.env.REDIS_HOST || 'redis-server',
        port: Number(process.env.REDIS_PORT) || 6379,
        ttl: REPOSITORY.CACHE_SETTING_EXPIRATION_TIME,
      }),
    }),
  ],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
