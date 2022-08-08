import { Controller, Post, Body, Param } from '@nestjs/common';
import { TransferService } from './transfer.service';
import { CreateTransferDto } from './dto/create-transfer.dto';
import { ParamsTransferDTO } from './dto/params-transfer.dto';

@Controller('transfer')
export class TransferController {
  constructor(private readonly transferService: TransferService) {}

  @Post('/:id')
  create(
    @Body() createTransferDto: CreateTransferDto,
    @Param() params: ParamsTransferDTO,
  ) {
    const { id } = params;

    return this.transferService.create(createTransferDto, id);
  }
}