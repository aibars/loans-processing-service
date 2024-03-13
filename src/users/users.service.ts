// users.service.ts
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/user';
import { Repository } from 'typeorm';
import { CreateUserDto, LoginUserDto } from './types';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/typeorm/entities/role';
import { jwtConstants } from 'src/auth/constants';

/**
 * Service related to user operations such as log in a register
 */
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
    const user = await this.userRepository.findOne({
      where: { username },
      relations: ['role'],
    });
    if (!user) throw new Error('user not found');

    const passwordsMatch = await bcrypt.compare(password, user.password);

    if (!passwordsMatch) throw new Error('user not found');
    return user;
  }

  public async registerUser(createUserDto: CreateUserDto) {
    try {
      const user = await this.userRepository.findOneBy({
        username: createUserDto.username,
      });

      if (user) throw new Error('user already registered');

      if (createUserDto.role === 'Admin') {
        throw new Error('Only admins can create admin users');
      }

      const role = await this.roleRepository.findOne({
        where: { name: createUserDto.role },
      });
      if (!role) throw new Error('Role not found');

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(createUserDto.password, salt);
      const newUser = {
        ...createUserDto,
        role,
        password: hash,
      };
      this.userRepository.save(newUser);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Does the logging in. That is, validates the username and password and also obtains the role associated to it
   * @param loginUserDto The object containing the user's details
   * @returns the token generated after that user
   */
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
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * This function generates a JWT token with the provided username and role,
   * ensuring secure authentication by incorporating an expiration time of 1 hour.
   * //TODO: expiration could be made configurable
   * @param username the email of the suer
   * @param role the role name
   * @returns A JWT object with the encrypted data
   */
  private generateToken(username: string, role: string): string {
    const payload = { username, role };
    return jwt.sign(payload, jwtConstants.secret, { expiresIn: '1h' });
  }
}
