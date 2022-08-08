import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import prisma from 'src/database/prisma';
import { CreateWithdrawDto } from './dto/create-withdraw.dto';

@Injectable()
export class WithdrawService {
  async create(createWithdrawDto: CreateWithdrawDto, id: string) {
    const insertTransaction = {
      ...createWithdrawDto,
      senderId: id,
      type: 'withdraw',
    };

    const value = Number(createWithdrawDto.value);

    const targetUser = await prisma.user.findFirst({ where: { id } });

    if (!targetUser) {
      throw new HttpException('User does not exist', HttpStatus.BAD_REQUEST);
    }

    if (Number(targetUser.balance) < value) {
      throw new HttpException(
        "You don't have enough balance",
        HttpStatus.BAD_REQUEST,
      );
    }

    const newBalance = Number(targetUser.balance) - value;

    const insertBalance = {
      balance: newBalance,
    };

    await prisma.user.update({
      where: { id },
      data: insertBalance,
    });

    await prisma.transaction.create({ data: insertTransaction });
  }
}
