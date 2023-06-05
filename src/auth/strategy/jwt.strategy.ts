import { Injectable, UnauthorizedException } from '@nestjs/common';

import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { User } from '../interfaces/user.interface';
import { JWtPayload } from './jwt.interface';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JWtPayload): Promise<User> {
    const { username } = payload;
    const user: User = await this.authService.getOneUser(username);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
