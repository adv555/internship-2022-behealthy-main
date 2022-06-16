import { forwardRef, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { RedisModule } from 'src/redis/redis.module';
import { TokenModule } from 'src/tokens/token.module';
import { UserModule } from 'src/user/user.module';
import { userProvider } from 'src/user/user.provider';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwtAuth.guard';
import { RolesGuard } from './guards/roles.guard';
import { GoogleStrategy } from './strategies/google.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    forwardRef(() => UserModule),
    UserModule,
    PassportModule,
    TokenModule,
    RedisModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    JwtRefreshStrategy,
    GoogleStrategy,
    userProvider,
    JwtAuthGuard,
    RolesGuard,
  ],
})
export class AuthModule {}
