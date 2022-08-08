import { Injectable } from '@nestjs/common';
import { CreateWithdrawDto } from './dto/create-withdraw.dto';

@Injectable()
export class WithdrawService {
  create(createWithdrawDto: CreateWithdrawDto) {
    return 'This action adds a new withdraw';
  }
}
