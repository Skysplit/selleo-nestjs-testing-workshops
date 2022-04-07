import { Injectable, NotFoundException } from '@nestjs/common';
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

  async find(id: Book['id']) {
    const book = await this.bookRepository.findOne(id);
    if (!book) {
      throw new NotFoundException('Book not found');
    }

    return book;
  }

  async create({ authorIds, ...book }: BookDTO) {
    const authors = await this.authorSerivce.findAll(authorIds);

    return await this.bookRepository.save({
      ...book,
      authors,
    });
  }

  async update(id: Book['id'], { authorIds, ...book }: BookDTO) {
    const foundBook = await this.find(id);

    return await this.bookRepository.save({
      ...foundBook,
      ...book,
      authors: await this.authorSerivce.findAll(authorIds),
    });
  }

  async delete(id: Book['id']) {
    const foundBook = await this.find(id);

    await this.bookRepository.delete(foundBook.id);

    return foundBook;
  }
}
