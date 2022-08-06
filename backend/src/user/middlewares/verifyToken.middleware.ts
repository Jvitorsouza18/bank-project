import { loginUserDTO } from './../dto/login-user.dto';

import { verifyToken } from './../utils/token/verifyToken';
import {
  Injectable,
  NestMiddleware,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import prisma from '../../database/prisma';

@Injectable()
export class VerifyToken implements NestMiddleware {
  async authorizationValidation(userData: loginUserDTO) {
    const validUser = await prisma.user.findFirst({
      where: { email: userData.email },
    });

    if (!validUser) {
      throw new HttpException('Invalid user', HttpStatus.BAD_REQUEST);
    }

    return validUser;
  }

  async use(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    const userData = await verifyToken.verify(authorization);

    await this.authorizationValidation(userData.data);
    next();
  }
}
