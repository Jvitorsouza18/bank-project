import { Controller, Post, Body, Param } from '@nestjs/common';
import { TransferService } from './transfer.service';
import { CreateTransferDto } from './dto/create-transfer.dto';
import { ParamsTransferDTO } from './dto/params-transfer.dto';

@Controller('transfer')
export class TransferController {
  constructor(private readonly transferService: TransferService) {}

  @Post('/:id')
  async create(
    @Body() createTransferDto: CreateTransferDto,
    @Param() params: ParamsTransferDTO,
  ) {
    const { id } = params;
    const { to, value } = createTransferDto;
    await this.transferService.create(createTransferDto, id);

    const receiverEmail = await this.transferService.getReceiverName(to);
    return {
      message: `Transcerência de R$${value.toFixed(
        2,
      )} realizada para ${receiverEmail}`,
    };
  }
}
