import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/services/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: '8dbf91dcb9875df0395d0bb24151d51990bf0991dcb9875df0395d0bb24108dcb68129b43',
    });
  }

  async validate(payload: any) {
    const user = await this.usersService.findById(payload.sub);

    return user;
  }
}
