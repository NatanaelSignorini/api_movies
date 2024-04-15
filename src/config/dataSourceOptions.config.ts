import { ConfigService } from '@nestjs/config';
import { DataSource, type DataSourceOptions } from 'typeorm';

const configService = new ConfigService();

const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: configService.get<string>('DB_HOST'),
  port: +configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USERNAME'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_NAME'),
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/**/migrations/*{.ts,.js}'],
  migrationsTableName: 'migrations',
  synchronize: true,
  extra: {
    max: 30,
  },
};

export default new DataSource(dataSourceOptions);
