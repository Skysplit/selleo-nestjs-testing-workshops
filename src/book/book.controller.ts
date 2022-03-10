import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';

import { BookDTO } from './book.dto';
import { Book } from './book.entity';
import { BookService } from './book.service';

@Controller('book')
export class BookController {
  constructor(protected bookService: BookService) {}

  @Post()
  async createBook(@Body() book: BookDTO) {
    return await this.bookService.create(book);
  }

  @Put(':id')
  async updateBook(
    @Param('id', new ParseIntPipe()) id: Book['id'],
    @Body() book: BookDTO,
  ) {
    return await this.bookService.update(id, book);
  }

  @Delete(':id')
  async deleteBook(@Param('id', new ParseIntPipe()) id: Book['id']) {
    return await this.bookService.delete(id);
  }
}
