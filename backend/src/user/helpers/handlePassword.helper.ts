import { HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

export function encryptPassword(password: string) {
  const salt = bcrypt.genSaltSync(5);

  const encryptedPassword = bcrypt.hashSync(password, salt);
  return encryptedPassword;
}

export function checkPassword(password: string, passwordDb: string) {
  const isMatch = bcrypt.compareSync(password, passwordDb);

  if (!isMatch) {
    throw new HttpException('Invalid password', HttpStatus.BAD_REQUEST);
  }
}
