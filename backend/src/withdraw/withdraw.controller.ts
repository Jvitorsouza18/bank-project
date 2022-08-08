import { Controller, Post, Body, Param } from '@nestjs/common';
import { WithdrawService } from './withdraw.service';
import { CreateWithdrawDto } from './dto/create-withdraw.dto';
import { ParamsWithdrawDTO } from './dto/params-withdraw.dto';

@Controller('withdraw')
export class WithdrawController {
  constructor(private readonly withdrawService: WithdrawService) {}

  @Post('/:id')
  create(
    @Body() createWithdrawDto: CreateWithdrawDto,
    @Param() params: ParamsWithdrawDTO,
  ) {
    const { id } = params;

    this.withdrawService.create(createWithdrawDto, id);

    return { statusCode: 201, message: 'Withdraw has been made' };
  }
}
