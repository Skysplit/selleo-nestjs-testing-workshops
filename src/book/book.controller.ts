import { FileUploadService } from '@app/file-upload/file-upload.service';
import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { BookDTO } from './book.dto';
import { Book } from './book.entity';
import { BookService } from './book.service';

@Controller('book')
export class BookController {
  constructor(
    protected bookService: BookService,
    protected fileService: FileUploadService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('cover'))
  async createBook(
    @Body() book: BookDTO,
    @UploadedFile() file: Express.Multer.File,
  ) {
    // Do something with it?
    const s3File = await this.fileService.upload(file.filename, file.buffer);

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
