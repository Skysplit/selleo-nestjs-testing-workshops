import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SupplyDTO } from './supply.dto';
import { Supply } from './supply.entity';

@Injectable()
export class SupplyService {
  constructor(
    @InjectRepository(Supply) protected supplyRepository: Repository<Supply>,
  ) {}

  create(supply: SupplyDTO) {
    // TODO
  }
}
