import { Injectable } from '@nestjs/common';
import { CreateDepositDto } from './dto/create-deposit.dto';
import { UpdateDepositDto } from './dto/update-deposit.dto';

@Injectable()
export class DepositService {
  create(createDepositDto: CreateDepositDto, id: string) {
    console.log(id);

    return 'This action adds a new deposit';
  }
}
