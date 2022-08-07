import { Decimal } from '@prisma/client/runtime';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreateDepositDto {
  @IsString({ message: 'Please enter a valid description' })
  description?: string;

  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'Please insert a valid number' },
  )
  @IsNotEmpty({ message: 'Please declare a value' })
  value: Decimal;
}
