import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'Please enter a valid email' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @IsString({ message: 'Please enter a valid password' })
  @Length(5, 20, { message: 'Password must be between 5 and 20 characters' })
  @IsNotEmpty({ message: 'Please enter a password' })
  password: string;

  @IsString({ message: 'Name must contaion letters' })
  @Length(3, 30, { message: 'Name must have between 3 and 30 characters' })
  @IsNotEmpty({ message: 'Please enter your name' })
  name: string;
}
