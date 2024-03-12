import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { jwtConstants } from './constants';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/typeorm/entities/user';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  /**
   * This method obtains the user from the db and checks if the user exists in the db
   */
  async validate(payload): Promise<User> {
    const user = await this.usersService.findByUsernameAndPassword(
      payload.username,
      payload.password,
    );

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
