import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { REPOSITORY } from 'src/constants';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class TokenService {
  constructor(
    private jwtService: JwtService,
    @Inject(RedisService) private redisManager: RedisService,
  ) {}

  async generate(userId: number, username: string): Promise<any> {
    return {
      accessToken: await this.accessToken(userId, username),
      refreshToken: await this.refreshToken(userId, username),
    };
  }

  async update(userId: number, userEmail: string) {
    const tokens = await this.generate(userId, userEmail);
    await this.redisManager.setValue(`${userId}`, tokens.refreshToken);

    return tokens;
  }

  async accessToken(userId: number, username: string) {
    return this.jwtService.sign(
      {
        sub: userId,
        username,
      },
      {
        secret: process.env.JWT_ACCESS_SECRET,
        expiresIn: REPOSITORY.JWT_ACCESS_TOKEN_EXPIRATION_TIME,
      },
    );
  }

  async refreshToken(userId: number, username: string) {
    return this.jwtService.sign(
      {
        sub: userId,
        username,
      },
      {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: REPOSITORY.JWT_REFRESH_TOKEN_EXPIRATION_TIME,
      },
    );
  }
}
