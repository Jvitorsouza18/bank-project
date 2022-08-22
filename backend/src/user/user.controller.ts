import { loginUserDTO } from './dto/login-user.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  Patch,
  Param,
  Delete,
  Req,
  Headers,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request } from 'express';

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

  @HttpCode(201)
  @Patch('user/:id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Headers('authorization') authorization,
  ) {
    await this.userService.update(id, updateUserDto, authorization);
    return { statusCode: 201, message: 'Update success!' };
  }

  @HttpCode(201)
  @Delete('user/:id')
  async remove(@Param('id') id: string, @Req() req: Request) {
    const { authorization } = req.headers;
    await this.userService.remove(id, authorization);
    return { statusCode: 201, message: 'Delete success!' };
  }

  @Get('login')
  @HttpCode(200)
  async login(@Body() login: loginUserDTO) {
    const token = await this.userService.loginValidation(login);
    return { statusCode: 200, message: 'Login success!', token };
  }
}
