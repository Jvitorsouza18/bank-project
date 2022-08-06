import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DepositModule } from './deposit/deposit.module';

@Module({
  imports: [UserModule, DepositModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
