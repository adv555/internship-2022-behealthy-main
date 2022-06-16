import {
  ConflictException,
  forwardRef,
  BadRequestException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { REPOSITORY } from 'src/constants';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { TokenService } from 'src/tokens/token.service';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { EmailService } from 'src/email/email.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class UserService {
  constructor(
    @Inject(CloudinaryService) private cloudinaryService: CloudinaryService,

    @Inject(REPOSITORY.USER) private userRepository: typeof User,
    private tokenService: TokenService,
    @Inject(forwardRef(() => EmailService))
    private emailService: EmailService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.findByEmail(createUserDto.email);

    if (user) throw new ConflictException('User already exists!');
    const activationLink = uuidv4();

    const newUser = await this.userRepository.create({
      email: createUserDto.email,
      password: await this.hashPassword(createUserDto.password),
      role: createUserDto.role,
      isActivated: false,
      activationLink: activationLink,
    });

    this.emailService.sendActivationEmail(newUser);

    return await this.tokenService.update(newUser.id, newUser.email);
  }

  async findAll() {
    return this.userRepository.findAll({
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt'],
      },
    });
  }

  async findOne(id: number) {
    return await this.userRepository.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt'],
      },
    });
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOne({
      where: {
        email,
      },
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt'],
      },
    });
  }

  async findByGoogleId(googleId: string) {
    return this.userRepository.findOne({
      where: {
        google_id: googleId,
      },
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt'],
      },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    if (updateUserDto.password) {
      updateUserDto.password = await this.hashPassword(updateUserDto.password);
    }

    if (updateUserDto.email) {
      const activationLink = uuidv4();
      const updatedUser = {
        ...updateUserDto,
        isActivated: false,
        activationLink,
      };

      await this.userRepository.update(updatedUser, {
        where: {
          id,
        },
      });
      this.emailService.sendUpdateEmail(user.id);
    } else {
      await this.userRepository.update(updateUserDto, {
        where: {
          id,
        },
      });
    }

    return await this.userRepository.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt'],
      },
    });
  }

  async updateAvatar(
    id: number,
    updateDto: UpdateUserDto,
    file: Express.Multer.File,
  ) {
    const img = await this.cloudinaryService.uploadImage(file);

    const result = await this.userRepository.update(
      {
        ...updateDto,
        avatar: img.url,
      },
      {
        where: { id: id },
        returning: true,
      },
    );

    return result[1] && result[1][0] ? result[1][0] : result;
  }

  async remove(id: number, userData: { password: string }) {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    const isPasswordVerified = await this.compareHash(
      userData.password,
      user.password,
    );

    if (!isPasswordVerified)
      throw new BadRequestException('Incorrect password');

    return await this.userRepository.destroy({
      where: {
        id,
      },
    });
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(REPOSITORY.BCRYPT_ROUNDS);

    return await bcrypt.hash(password, salt);
  }

  async compareHash(value: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(value, hash);
  }
}
