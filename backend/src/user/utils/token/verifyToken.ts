import { HttpException, HttpStatus } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import 'dotenv/config';

const { JWT_SECRET } = process.env;

class VerifyToken {
  async verify(token: string): Promise<jwt.JwtPayload> {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      return decoded as jwt.JwtPayload;
    } catch (err) {
      throw new HttpException('Invalid login', HttpStatus.BAD_REQUEST);
    }
  }
}

export const verifyToken = new VerifyToken();
