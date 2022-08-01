import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import prisma from '../database/prisma';
import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';

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
      return await prisma.user.create({ data: createUserDto });
    } catch (err) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    // findOne(id: number) {
    //   return `This action returns a #${id} user`;
    // }

    // update(id: number, updateUserDto: UpdateUserDto) {
    //   return `This action updates a #${id} user`;
    // }

    // remove(id: number) {
    //   return `This action removes a #${id} user`;
    // }
  }
}
