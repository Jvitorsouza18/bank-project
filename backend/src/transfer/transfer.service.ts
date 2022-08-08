import { Injectable } from '@nestjs/common';
import { CreateTransferDto } from './dto/create-transfer.dto';

@Injectable()
export class TransferService {
  create(createTransferDto: CreateTransferDto) {
    return 'This action adds a new transfer';
  }
}
