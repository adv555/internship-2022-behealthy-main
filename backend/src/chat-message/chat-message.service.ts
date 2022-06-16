import { CreateChatMessageDto } from './dto/create-chat-message.dto';
import { Inject, Injectable } from '@nestjs/common';
import { REPOSITORY } from '../constants';
import { ChatMessage } from './entities/chat-message.entity';

@Injectable()
export class ChatMessageService {
  constructor(
    @Inject(REPOSITORY.CHAT_MESSAGE)
    readonly chatMessageRepository: typeof ChatMessage,
  ) {}
  async createMessage(newMessage: CreateChatMessageDto) {
    return await this.chatMessageRepository.create(newMessage);
  }
}
