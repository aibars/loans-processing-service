// users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/user';
import { Repository } from 'typeorm';
import { CreateUserDto, LoginUserDto } from './types';
import * as jwt from 'jsonwebtoken';
import { Role } from 'src/typeorm/entities/role';
import { jwtConstants } from 'src/auth/constants';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}
  private readonly jwtSecret = 'my-secret-key';
  public async findByUsernameAndPassword(
    username: string,
    password: string,
  ): Promise<User> {
    //todo: password should be encrypted here
    const user = await this.userRepository.findOne({
      where: { username, password },
      relations: ['role'],
    });

    if (!user) throw new Error('user not found');

    return user;
  }

  public async registerUser(createUserDto: CreateUserDto) {
    try {
      const role = await this.roleRepository.findOne({
        where: { name: createUserDto.role },
      });
      if (!role) throw new Error('Role not found');
      const newUser = { id: null, ...createUserDto, role };
      this.userRepository.save(newUser);
      return newUser;
    } catch (err) {
      throw err;
    }
  }

  public async loginUser(loginUserDto: LoginUserDto) {
    try {
      const user = await this.findByUsernameAndPassword(
        loginUserDto.username,
        loginUserDto.password,
      );

      if (!user) throw new Error('Username or password invalid');
      const token = this.generateToken(user.username, user.role.name);
      return token;
    } catch (err) {
      throw err;
    }
  }

  private generateToken(username: string, role: string): string {
    const payload = { username, role };
    return jwt.sign(payload, jwtConstants.secret, { expiresIn: '1h' });
  }
}
