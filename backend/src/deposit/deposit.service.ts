import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
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

    const value = Number(createDepositDto.value);

    const targetUser = await prisma.user.findFirst({ where: { id } });

    if (!targetUser) {
      throw new HttpException('User does not exist', HttpStatus.BAD_REQUEST);
    }

    const newBalance = Number(targetUser.balance) + value;

    const insertBalance = {
      balance: newBalance,
    };

    await prisma.user.update({
      where: { id },
      data: insertBalance,
    });

    await prisma.transaction.create({ data: insertTransaction });

    return 'This action adds a new deposit';
  }
}
