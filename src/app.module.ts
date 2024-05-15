import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataBaseConfig } from './config/dataBaseConfig';

import { AuthModule } from './modules/auth/auth.module';
import { MoviesModule } from './modules/movies/movies.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DataBaseConfig,
    }),
    // CacheModule.registerAsync({
    //   isGlobal: true,
    //   imports: [ConfigModule],
    //   useFactory: async (config) => {
    //     const store = await redisStore({
    //       ttl: 30 * 1000,
    //       socket: {
    //         host: config.get('REDIS_HOST'),
    //         port: config.get('REDIS_PORT'),
    //       },
    //     });
    //     return { store };
    //   },
    //   inject: [ConfigService],
    // }),
    AuthModule,
    UsersModule,
    MoviesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
