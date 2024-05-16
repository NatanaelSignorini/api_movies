import type {
  CacheModuleOptions,
  CacheOptionsFactory,
} from '@nestjs/cache-manager';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-yet';
import { ConfigEnvKeys } from 'src/common/config/config-env-keys';

@Injectable()
export class CacheConfig implements CacheOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createCacheOptions(): CacheModuleOptions {
    return {
      ...ConfigEnvKeys.connectionRedis(),
      store: redisStore,
      ttl: 5,
      db: 1,
    };
  }
}
