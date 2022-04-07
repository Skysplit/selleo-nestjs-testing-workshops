import { BookService } from '@book/book.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SupplyStatus } from './supply.constants';
import { SupplyDTO } from './supply.dto';
import { Supply } from './supply.entity';

@Injectable()
export class SupplyService {
  constructor(
    protected bookService: BookService,
    @InjectRepository(Supply) protected supplyRepository: Repository<Supply>,
  ) {}

  async create(supply: SupplyDTO) {
    const book = await this.bookService.find(supply.bookId);

    return await this.supplyRepository.save({
      book,
      status: SupplyStatus.AVAILABLE,
    });
  }
}
