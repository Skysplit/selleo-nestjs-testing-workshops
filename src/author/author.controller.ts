import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';

import { AuthorDTO } from './author.dto';
import { Author } from './author.entity';
import { AuthorService } from './author.service';

@Controller('author')
export class AuthorController {
  constructor(protected authorService: AuthorService) {}

  @Post()
  async createAuthor(@Body() author: AuthorDTO) {
    return await this.authorService.create(author);
  }

  @Put(':id')
  async updateAuthor(
    @Param('id', new ParseIntPipe()) id: Author['id'],
    @Body() author: AuthorDTO,
  ) {
    return await this.authorService.update(id, author);
  }

  @Delete(':id')
  async deleteAuthor(@Param('id', new ParseIntPipe()) id: Author['id']) {
    return await this.authorService.delete(id);
  }
}
