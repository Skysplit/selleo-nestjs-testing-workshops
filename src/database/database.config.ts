import { ConfigType, registerAs } from '@nestjs/config';

export const DatabaseConfig = registerAs('database', () => ({
  host: process.env.TYPEORM_HOST ?? '',
  port: +(process.env.TYPEORM_PORT ?? 5432),
  database: process.env.TYPEORM_DATABASE ?? '',
  username: process.env.TYPEORM_USERNAME ?? '',
  password: process.env.TYPEORM_PASSWORD ?? '',
}));

export type DatabaseConfigType = ConfigType<typeof DatabaseConfig>;
