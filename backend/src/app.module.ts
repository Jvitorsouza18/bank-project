import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DepositModule } from './deposit/deposit.module';
import { WithdrawModule } from './withdraw/withdraw.module';

@Module({
  imports: [UserModule, DepositModule, WithdrawModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
