import { Controller, Post, Body, Param } from '@nestjs/common';
import { DepositService } from './deposit.service';
import { CreateDepositDto } from './dto/create-deposit.dto';

@Controller('deposit')
export class DepositController {
  constructor(private readonly depositService: DepositService) {}

  @Post('/:id')
  create(@Body() createDepositDto: CreateDepositDto, @Param() id: string) {
    return this.depositService.create(createDepositDto, id);
  }
}
