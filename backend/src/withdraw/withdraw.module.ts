import { VerifyUserForTransaction } from './../transactionsMiddlewares/verifyUserForTransaction.middleware';
import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { WithdrawService } from './withdraw.service';
import { WithdrawController } from './withdraw.controller';

@Module({
  controllers: [WithdrawController],
  providers: [WithdrawService],
})
export class WithdrawModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(VerifyUserForTransaction).forRoutes({
      path: 'withdraw/:id',
      method: RequestMethod.POST,
    });
  }
}
