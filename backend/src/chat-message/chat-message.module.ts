import { Module } from '@nestjs/common';
import { ChatMessageController } from './chat-message.controller';
import { ChatMessageService } from './chat-message.service';
import { chatMessageProvider } from './chat-message.provider';

@Module({
  controllers: [ChatMessageController],
  providers: [ChatMessageService, chatMessageProvider],
  exports: [ChatMessageService],
})
export class ChatMessageModule {}
