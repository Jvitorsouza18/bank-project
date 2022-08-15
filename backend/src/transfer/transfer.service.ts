import { PrismaClient } from '@prisma/client';
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { CreateTransferDto } from './dto/create-transfer.dto';
import prisma from '../database/prisma';

@Injectable()
export class TransferService {
  async create(createTransferDto: CreateTransferDto, id: string) {
    await prisma.$transaction(async (prisma: PrismaClient) => {
      const actionUser = await prisma.user.findFirst({ where: { id } });

      const receiverPerson = await prisma.user.findFirst({
        where: { email: createTransferDto.to },
      });

      if (!receiverPerson) {
        throw new HttpException('Invalid receiver', HttpStatus.BAD_REQUEST);
      }

      const value = Number(createTransferDto.value);

      const newUserBalance = Number(actionUser.balance) - value;

      const newReceiverBalance = Number(receiverPerson.balance) + value;

      if (Number(actionUser.balance) < value) {
        throw new HttpException(
          "You don't have enough balance",
          HttpStatus.BAD_REQUEST,
        );
      }

      const insertUserBalance = {
        balance: newUserBalance,
      };

      const insertReceiverBalance = {
        balance: newReceiverBalance,
      };

      await prisma.user.update({
        where: { id: actionUser.id },
        data: insertUserBalance,
      });

      await prisma.user.update({
        where: { id: receiverPerson.id },
        data: insertReceiverBalance,
      });

      const insertTransaction = {
        ...createTransferDto,
        senderId: id,
        type: 'transfer',
        recipientId: receiverPerson.id,
      };
      delete insertTransaction.to;

      await prisma.transaction.create({ data: insertTransaction });
    });
  }

  async getReceiverName(email: string) {
    const user = await prisma.user.findFirst({ where: { email } });
    return user.name;
  }
}
