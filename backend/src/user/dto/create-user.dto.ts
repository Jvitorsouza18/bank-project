import { IsEmail, IsNotEmpty, IsString, Length, Min } from 'class-validator';

export class CreateUserDto {
  @IsEmail({ message: 'Email is not valid' })
  @IsNotEmpty({ message: 'Please enter a valid email' })
  email: string;

  @IsString({ message: 'Please enter a valid password' })
  @Length(5, 20, { message: 'Password must be between 5 and 20 characters' })
  @IsNotEmpty({ message: 'Please enter a password' })
  password: string;

  @IsString({ message: 'Name must contaion letters' })
  @Min(3, { message: 'Name must have 3 characters' })
  @IsNotEmpty({ message: 'Please enter your name' })
  name: string;
}
