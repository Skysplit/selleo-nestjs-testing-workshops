import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AuthorService } from '../author/author.service';
import { BookDTO } from './book.dto';
import { Book } from './book.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book) protected bookRepository: Repository<Book>,
    protected authorSerivce: AuthorService,
  ) {}

  async create(book: BookDTO) {
    // TODO
  }

  async update(id: Book['id'], book: BookDTO) {
    // TODO
  }

  async delete(id: Book['id']) {
    // TODO
  }
}
