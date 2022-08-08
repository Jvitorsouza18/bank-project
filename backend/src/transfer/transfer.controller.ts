import { Controller, Post, Body } from '@nestjs/common';
import { TransferService } from './transfer.service';
import { CreateTransferDto } from './dto/create-transfer.dto';

@Controller('transfer')
export class TransferController {
  constructor(private readonly transferService: TransferService) {}

  @Post('/:id')
  create(@Body() createTransferDto: CreateTransferDto) {
    return this.transferService.create(createTransferDto);
  }
}
