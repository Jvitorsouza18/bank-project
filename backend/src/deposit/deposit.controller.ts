import { ParamsDepositDTO } from './dto/params-deposit.dto';
import { Controller, Post, Body, Param } from '@nestjs/common';
import { DepositService } from './deposit.service';
import { CreateDepositDto } from './dto/create-deposit.dto';

@Controller('deposit')
export class DepositController {
  constructor(private readonly depositService: DepositService) {}

  @Post('/:id')
  create(
    @Body() createDepositDto: CreateDepositDto,
    @Param() params: ParamsDepositDTO,
  ) {
    const { id } = params;

    this.depositService.create(createDepositDto, id);

    return { statusCode: 201, message: 'Deposit has been made' };
  }
}
