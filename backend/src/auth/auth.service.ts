import {
  ForbiddenException,
  UnauthorizedException,
  Injectable,
  Inject,
  BadRequestException,
} from '@nestjs/common';

import { UserService } from 'src/user/user.service';
import { RedisService } from 'src/redis/redis.service';
import { REPOSITORY } from 'src/constants';
import { User } from 'src/user/entities/user.entity';
import { TokenService } from 'src/tokens/token.service';
import { UpdatePasswordDto } from './dto/update-password-dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private tokenService: TokenService,
    @Inject(RedisService) private redisManager: RedisService,
    @Inject(REPOSITORY.USER) private userRepository: typeof User,
  ) {}

  async login(id: number, email: string): Promise<any> {
    return await this.tokenService.update(id, email);
  }

  async loginWithGoogle(req: any): Promise<any> {
    if (!req.user) throw new UnauthorizedException();

    const googleUser = await this.userService.findByGoogleId(req.user.id);
    if (googleUser) {
      const tokens = await this.login(googleUser.id, googleUser.email);

      return {
        role: googleUser.role,
        email: googleUser.email,
        ...tokens,
      };
    }

    const user = await this.userService.findByEmail(req.user.email);
    if (user) throw new ForbiddenException('User already exists');

    const role = req.query.state;

    if (!role) throw new BadRequestException('A user role is not defined');

    const newUser = await this.userRepository.create({
      email: req.user.email,
      password: await this.userService.hashPassword(req.user.accessToken),
      role: role.toUpperCase(),
      google_id: req.user.id,
      isActivated: true,
      activationLink: '',
    });

    const tokens = await this.login(newUser.id, newUser.email);

    return {
      role: newUser.role,
      email: newUser.email,
      ...tokens,
    };
  }

  async refresh(userId: number, refreshToken: string): Promise<any> {
    const user = await this.userService.findOne(userId);
    if (!user) throw new UnauthorizedException();

    const cacheToken = await this.redisManager.getValue(`${userId}`);
    if (!cacheToken) throw new UnauthorizedException();

    if (refreshToken !== cacheToken) throw new UnauthorizedException();

    return await this.tokenService.update(user.id, user.email);
  }

  async resetPassword(
    userId: number,
    passwordsDto: UpdatePasswordDto,
  ): Promise<any> {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) throw new UnauthorizedException('User not found!');

    const isPasswordVerified = await this.userService.compareHash(
      passwordsDto.old,
      user.password,
    );

    if (!isPasswordVerified)
      throw new BadRequestException('Incorrect password');

    return await this.userService.update(userId, {
      password: passwordsDto.new,
    });
  }

  async updateForgottenPassword(id: number, password: string, linkId: string) {
    const user = await this.userService.findOne(id);

    if (!user || user.activationLink !== linkId) {
      throw new UnauthorizedException('User not found!');
    }

    return await this.userService.update(id, {
      password,
      isActivated: true
    });
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    if (!user) throw new UnauthorizedException();

    if (!user.isActivated)
      throw new BadRequestException('Please, activate your account');

    const isValideUserPassword = await this.userService.compareHash(
      pass,
      user.password,
    );
    if (!isValideUserPassword) throw new UnauthorizedException();

    const { password, ...res } = user;

    return res;
  }

  async activate(link: string) {
    const user: User = await this.userRepository.findOne({
      where: {
        activationLink: link,
      },
    });

    if (!user) throw new BadRequestException("User doesn't exist!");

    if (user.isActivated)
      throw new ForbiddenException('User already activated');

    const newUser = {
      isActivated: true,
    };

    return await this.userService.update(user.id, newUser);
  }
}
