import { Decimal } from '@prisma/client/runtime';

export interface IGetUserById {
  madeTransactions: {
    id: string;
    type: string;
    value: Decimal;
    date: Date;
    recipientId: string;
  }[];
  receivedTransactions: {
    id: string;
    type: string;
    value: Decimal;
    date: Date;
    senderId: string;
  }[];
  name: string;
  balance: Decimal;
  senderPerson: {
    id: string;
    type: string;
    value: Decimal;
    date: Date;
    recipientId: string;
  }[];
  recipientPerson: {
    id: string;
    type: string;
    value: Decimal;
    date: Date;
    senderId: string;
  }[];
}
