import { loginUserDTO } from './../user/dto/login-user.dto';
import { verifyToken } from '../user/utils/token/verifyToken';
import {
  Injectable,
  NestMiddleware,
  HttpException,
  HttpStatus,
  Param,
  Req,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import prisma from '../database/prisma';

@Injectable()
export class VerifyUserForTransaction implements NestMiddleware {
  async verifyUser(userData: loginUserDTO, id: string) {
    const currentUser = await prisma.user.findFirst({
      where: { email: userData.email },
    });
    if (!currentUser) {
      throw new HttpException('Invalid user', HttpStatus.BAD_REQUEST);
    }

    const comparingUser = await prisma.user.findFirst({
      where: { id: id },
    });

    if (comparingUser.email !== currentUser.email) {
      throw new HttpException('Unauthorized user', HttpStatus.BAD_REQUEST);
    }

    return currentUser;
  }

  async use(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    const id = req.params.id;

    const userData = await verifyToken.verify(authorization);

    await this.verifyUser(userData.data, id);

    next();
  }
}
