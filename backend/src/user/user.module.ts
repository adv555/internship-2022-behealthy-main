import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { userProvider } from './user.provider';
import { TokenModule } from 'src/tokens/token.module';
import { EmailModule } from 'src/email/email.module';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports: [TokenModule, CloudinaryModule, forwardRef(() => EmailModule)],
  controllers: [UserController],
  providers: [UserService, userProvider],
  exports: [UserService],
})
export class UserModule {}
