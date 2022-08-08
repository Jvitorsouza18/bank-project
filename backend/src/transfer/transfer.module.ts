import { VerifyUserForTransaction } from './../transactionsMiddlewares/verifyUserForTransaction.middleware';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TransferService } from './transfer.service';
import { TransferController } from './transfer.controller';

@Module({
  controllers: [TransferController],
  providers: [TransferService],
})
export class TransferModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(VerifyUserForTransaction).forRoutes({
      path: 'transfer/:id',
      method: RequestMethod.POST,
    });
  }
}
