import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy as PassortLocal } from 'passport-local';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserInfo } from './auth.full';
import { UsersService } from './users.full';

export const jwtConstants = {
  secret: 'secretKey',
  expiresIn: '1d',
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: UserInfo) {
    return { userId: payload.userId, username: payload.email };
  }
}

@Injectable()
export class LocalStrategy extends PassportStrategy(PassortLocal) {
  constructor(private usersService: UsersService) {
    super();
  }

  async validate(username: string, password: string): Promise<UserInfo> {
    const user = await this.usersService.findByUserName(username);

    if (user && user.password === password) {
      return {
        email: user.email,
        userId: user.id,
      };
    } else {
      throw new UnauthorizedException();
    }
    return null;
  }
}
