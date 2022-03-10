import { Controller, Delete, Param, ParseIntPipe, Post } from '@nestjs/common';

import { Supply } from './supply.entity';

@Controller('supply')
export class SupplyController {
  @Post()
  async createSupply() {}

  @Delete(':id')
  async deleteSupply(@Param('id', new ParseIntPipe()) id: Supply['id']) {}

  @Post(':id/borrow')
  async borrowSupply(@Param('id', new ParseIntPipe()) id: Supply['id']) {}

  @Post(':id/return')
  async returnSupply(@Param('id', new ParseIntPipe()) id: Supply['id']) {}

  @Post(':id/lost')
  async lostSupply(@Param('id', new ParseIntPipe()) id: Supply['id']) {}
}
