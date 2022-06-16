import { forwardRef, Module } from '@nestjs/common';
import { TokenModule } from 'src/tokens/token.module';
import { UserModule } from 'src/user/user.module';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';

@Module({
  imports: [TokenModule, forwardRef(() => UserModule)],
  controllers: [EmailController],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
