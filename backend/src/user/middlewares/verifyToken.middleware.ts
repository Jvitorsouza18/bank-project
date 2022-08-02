import { UserService } from './../user.service';
import { verifyToken } from './../utils/token/verifyToken';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class VerifyToken implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    const userData = await verifyToken.verify(authorization);

    const validationMethod = new UserService();
    await validationMethod.loginValidation(userData.data);
    next();
  }
}
