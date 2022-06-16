import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { ContactController } from './contact.controller';
import { contactProvider } from './contact.provider';
import { ContactService } from './contact.service';

@Module({
  imports: [UserModule],
  controllers: [ContactController],
  providers: [ContactService, contactProvider],
})
export class ContactModule {}
