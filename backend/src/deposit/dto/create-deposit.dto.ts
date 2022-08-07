import { Decimal } from '@prisma/client/runtime';
import { IsNotEmpty, IsNumber } from 'class-validator';
export class CreateDepositDto {
  description?: string;

  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'Please insert a valid number' },
  )
  @IsNotEmpty({ message: 'Please declare a value' })
  value: Decimal;
}
