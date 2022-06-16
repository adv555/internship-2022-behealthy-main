import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { REPOSITORY } from 'src/constants';

@Injectable()
export class RedisService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async setValue(key: string, value: string) {
    await this.cacheManager.set(key, value, {
      ttl: REPOSITORY.REDIS_TOKEN_EXPIRATION_TIME_IN_SECONDS,
    });
  }

  async getValue(key: string): Promise<any> {
    return await this.cacheManager.get(key);
  }
}
