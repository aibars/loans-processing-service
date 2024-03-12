// users.controller.ts
import { Body, Controller, Post } from '@nestjs/common';

import { CreateUserDto, LoginUserDto } from './types';
import { UsersService } from './users.service';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOkResponse({
    description: 'The generated user with the token',
  })
  @ApiOperation({
    summary: 'Registers a new user with a specific role',
  })
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const newUser = await this.usersService.registerUser(createUserDto);
    return { message: 'User registered successfully', user: newUser };
  }

  @ApiOkResponse({
    description: 'The user token',
  })
  @ApiOperation({
    summary: 'Log In method',
  })
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    const token = await this.usersService.loginUser(loginUserDto);
    return { message: 'Login successful', token };
  }
}
