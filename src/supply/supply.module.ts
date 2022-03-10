import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BookModule } from '../book/book.module';
import { SupplyController } from './supply.controller';
import { Supply } from './supply.entity';
import { SupplyService } from './supply.service';

@Module({
  imports: [TypeOrmModule.forFeature([Supply]), BookModule],
  providers: [SupplyService],
  controllers: [SupplyController],
})
export class SupplyModule {}
