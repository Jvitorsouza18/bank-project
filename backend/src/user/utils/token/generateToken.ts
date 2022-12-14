import { CreateUserDto } from './../../dto/create-user.dto';
import * as jwt from 'jsonwebtoken';
import 'dotenv/config';

const { JWT_SECRET } = process.env;

class GenerateToken {
  async generate(data: CreateUserDto) {
    const token = jwt.sign({ data }, JWT_SECRET || 'password', {
      expiresIn: '365d',
    });

    return token;
  }
}

export const generateToken = new GenerateToken();
