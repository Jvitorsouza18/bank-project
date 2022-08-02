import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  Patch,
  Param,
  // Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('/')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('user')
  findAll() {
    return this.userService.findAll();
  }

  @Post('user/create')
  @HttpCode(201)
  async create(@Body() user: CreateUserDto) {
    const token = await this.userService.create(user);
    return { token };
  }

  @Get('user/:id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Get('login')
  @HttpCode(201)
  async login() {
    return { statusCode: 201, message: 'Login success!' };
  }

  @Patch('user/:id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    await this.userService.update(id, updateUserDto);
    return { statusCode: 201, message: 'Update success!' };
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}
