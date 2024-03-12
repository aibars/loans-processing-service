// users.controller.ts
import { Body, Controller, Post } from '@nestjs/common';

import { CreateUserDto, LoginUserDto } from './types';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const newUser = await this.usersService.registerUser(createUserDto);
    return { message: 'User registered successfully', user: newUser };
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    const token = await this.usersService.loginUser(loginUserDto);
    return { message: 'Login successful', token };
  }
}
