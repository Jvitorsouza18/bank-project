import { Injectable } from '@nestjs/common';
import { CreateDepositDto } from './dto/create-deposit.dto';
import { UpdateDepositDto } from './dto/update-deposit.dto';

@Injectable()
export class DepositService {
  create(createDepositDto: CreateDepositDto) {
    return 'This action adds a new deposit';
  }
}
