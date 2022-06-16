import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { chatProvider } from './chat.provider';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [ChatController],
  providers: [ChatService, chatProvider],
})
export class ChatModule {}
