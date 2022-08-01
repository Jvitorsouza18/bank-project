import { CreateUserDto } from './../dto/create-user.dto';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { validate } from 'class-validator';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class UserValidation implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const user: CreateUserDto = req.body;
    const errors = await validate(user);
    if (errors.length === 0) return next();
    return res.status(404).json({ message: errors });
  }
}
