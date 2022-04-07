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

<<<<<<< Updated upstream
  async find(id: Book['id']) {
    const book = await this.bookRepository.findOne(id);
    if (!book) {
      throw new NotFoundException('Book not found');
    }

    return book;
  }

  async create(book: BookDTO) {
    const { authorIds, ...bookProps } = book;
    return await this.bookRepository.save({
      ...bookProps,
      authors: await this.authorSerivce.findAuthors(authorIds),
=======
  async create({ authorIds, ...book }: BookDTO) {
    const authors = await this.authorSerivce.findAll(authorIds);

    return await this.bookRepository.save({
      ...book,
      authors,
>>>>>>> Stashed changes
    });
  }

  async update(id: Book['id'], book: BookDTO) {
    const foundBook = await this.find(id);
    const { authorIds, ...bookProps } = book;
    return await this.bookRepository.save({
      ...foundBook,
      ...bookProps,
      authors: await this.authorSerivce.findAuthors(authorIds),
    });
  }

  async delete(id: Book['id']) {
    // TODO
  }
}
