import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthorModule } from './author/author.module';
import { BookModule } from './book/book.module';
import { DatabaseModule } from './database/database.module';
import { SupplyModule } from './supply/supply.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ['.env'] }),
    DatabaseModule,
    BookModule,
    AuthorModule,
    SupplyModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
