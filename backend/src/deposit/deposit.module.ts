import { VerifyUserForTransaction } from './../transactionsMiddlewares/verifyUserForTransaction.middleware';
import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { DepositService } from './deposit.service';
import { DepositController } from './deposit.controller';

@Module({
  controllers: [DepositController],
  providers: [DepositService],
})
export class DepositModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(VerifyUserForTransaction).forRoutes({
      path: 'deposit/:id',
      method: RequestMethod.POST,
    });
  }
}
