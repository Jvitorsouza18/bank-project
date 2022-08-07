import { Injectable } from '@nestjs/common';
import prisma from 'src/database/prisma';

import { CreateDepositDto } from './dto/create-deposit.dto';

@Injectable()
export class DepositService {
  async create(createDepositDto: CreateDepositDto, id: string) {
    const insertTransaction = {
      ...createDepositDto,
      senderId: id,
      type: 'deposit',
    };

    await prisma.transaction.create({ data: insertTransaction });

    return 'This action adds a new deposit';
  }
}
