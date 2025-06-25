// src/auth/jwt.strategy.ts
import { ForbiddenException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'segredo_mais_secreto_do_mundo',
    });
  }

  async validate(payload: any) {
    const user = await this.userRepo.findOneBy({ email: payload.username });
    if (!user) {
      throw new ForbiddenException('User not found');
    }

    return { userId: payload.userId, username: payload.username };
  }
}
