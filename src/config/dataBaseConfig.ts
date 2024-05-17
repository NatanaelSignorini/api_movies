import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type {
  TypeOrmModuleOptions,
  TypeOrmOptionsFactory,
} from '@nestjs/typeorm';
import { join } from 'path';

@Injectable()
export class DataBaseConfig implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      url: this.configService.get<string>('DATABASE_URL'),
      // host: this.configService.get<string>('DB_HOST'),
      // port: this.configService.get<number>('DB_PORT') ?? 5432,
      // username: this.configService.get<string>('DB_USERNAME'),
      // password: this.configService.get<string>('DB_PASSWORD'),
      // database: this.configService.get<string>('DB_NAME'),

      entities: [join(__dirname, '../**/**/*entity{.ts,.js}')],
      // entities: ['dist/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      migrationsRun: true,
      migrations: [join(__dirname, '../migrations/**/*{.ts,.js}')],
      // migrations: ['dist/**/migrations/*{.ts,.js}'],
      migrationsTableName: 'migrations',

      synchronize: true,
      // logging: true,
      // logger: 'file',
      extra: {
        max: 30,
      },
      ssl: {
        rejectUnauthorized: false,
      },
    };
  }
}
