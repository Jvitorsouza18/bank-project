import * as jwt from 'jsonwebtoken';
import 'dotenv/config';

const { JWT_SECRET } = process.env;

class VerifyToken {
  async verify(token: string) {
    const decoded = jwt.verify(token, JWT_SECRET as string);

    return decoded;
  }
}

export const verifyToken = new VerifyToken();
