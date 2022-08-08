import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DepositModule } from './deposit/deposit.module';
import { WithdrawModule } from './withdraw/withdraw.module';
import { TransferModule } from './transfer/transfer.module';

@Module({
  imports: [UserModule, DepositModule, WithdrawModule, TransferModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
