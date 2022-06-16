import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { RedisModule } from 'src/redis/redis.module';
import { TokenService } from './token.service';

@Module({
  imports: [JwtModule.register({}), RedisModule],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
