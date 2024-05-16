import type { RedisOptions } from 'ioredis';

const castNumber = (numberToParse: unknown) => {
  const numberParsed = Number(numberToParse);
  if (isNaN(numberParsed)) return undefined;
  return numberParsed;
};

/**
 * Class that aims to facilitate obtaining environment variables
 */
export class ConfigEnvKeys {
  private constructor() {}

  static redisHost(): string | undefined {
    return process.env.REDIS_HOST;
  }

  static redisPort(): number {
    return castNumber(process.env.REDIS_PORT) ?? 6379;
  }

  static redisPassword(): string | undefined {
    return process.env.REDIS_PASSWORD;
  }

  static connectionRedis = (): RedisOptions => ({
    host: ConfigEnvKeys.redisHost(),
    port: ConfigEnvKeys.redisPort(),
    ...(!!ConfigEnvKeys.redisPassword() && {
      password: ConfigEnvKeys.redisPassword(),
    }),
  });
}
