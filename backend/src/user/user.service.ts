import { verifyToken } from './utils/token/verifyToken';
import { loginUserDTO } from './dto/login-user.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import prisma from '../database/prisma';
import { CreateUserDto } from './dto/create-user.dto';
import { formatUser } from './helpers/formatUser.helper';
import { generateToken } from './utils/token/generateToken';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  findAll() {
    return prisma.user.findMany({
      select: {
        name: true,
        email: true,
        id: true,
        password: false,
      },
    });
  }

  async create(createUserDto: CreateUserDto) {
    try {
      await prisma.user.create({ data: createUserDto });
      const token = await generateToken.generate(createUserDto);
      return token;
    } catch (err) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: string) {
    try {
      const user = await prisma.user.findFirst({
        where: { id: id },
        select: {
          name: true,
          balance: true,
          senderPerson: {
            select: {
              id: true,
              type: true,
              value: true,
              date: true,
              recipientId: true,
            },
          },
        },
      });
      return formatUser(user);
    } catch (err) {
      throw new HttpException('User does not exist', HttpStatus.BAD_REQUEST);
    }
  }

  async loginValidation(userData: loginUserDTO) {
    const validUser = await prisma.user.findFirst({
      where: { email: userData.email },
    });
    if (!validUser) {
      throw new HttpException('Invalid user', HttpStatus.BAD_REQUEST);
    }
    return validUser;
  }

  async update(id: string, updateUserDto: UpdateUserDto, token: string) {
    const user = await prisma.user.findFirst({ where: { id } });

    if (!user) {
      throw new HttpException('User does not exist', HttpStatus.BAD_REQUEST);
    }

    const { data: comparingUser } = await verifyToken.verify(token);
    if (user.email !== comparingUser.email) {
      throw new HttpException('Unauthorized user', HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: string) {
    const isDeleted = await prisma.user.deleteMany({ where: { id } });
    if (isDeleted.count === 0)
      throw new HttpException('User does not exist', HttpStatus.BAD_REQUEST);
  }
}
