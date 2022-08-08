import { Decimal } from '@prisma/client/runtime';

export interface formatUserDTO {
  name: string;
  balance: Decimal;
  senderPerson: {
    id: string;
    type: string;
    value: Decimal;
    date: Date;
    recipientId: string | null;
  }[];
  recipientPerson: {
    id: string;
    type: string;
    value: Decimal;
    date: Date;
    senderId: string | null;
  }[];
}
