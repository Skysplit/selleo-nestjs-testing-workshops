import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import path from 'path';

import { DatabaseConfig, DatabaseConfigType } from './database.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forFeature(DatabaseConfig)],
      inject: [DatabaseConfig.KEY],
      async useFactory(config: DatabaseConfigType) {
        return {
          type: 'postgres',
          port: +config.port,
          host: config.host,
          username: config.username,
          password: config.password,
          database: config.database,
          synchronize: false,
          migrationsRun: false,
          migrations: [path.join(__dirname, 'migrations', '*.{j,t}s')],
          entities: [path.join(__dirname, '../', '**/*.entity.{j,t}s')],
        };
      },
    }),
  ],
})
export class DatabaseModule {}
