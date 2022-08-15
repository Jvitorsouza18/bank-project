import { PrismaClient } from '@prisma/client';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import prisma from '../database/prisma';

import { CreateDepositDto } from './dto/create-deposit.dto';

@Injectable()
export class DepositService {
  async create(createDepositDto: CreateDepositDto, id: string) {
    await prisma.$transaction(async (prisma: PrismaClient) => {
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
    });
  }
}
