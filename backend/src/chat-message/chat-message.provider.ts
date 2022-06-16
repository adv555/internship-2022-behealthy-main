import { REPOSITORY } from '../constants';
import { ChatMessage } from './entities/chat-message.entity';

export const chatMessageProvider = {
  provide: REPOSITORY.CHAT_MESSAGE,
  useValue: ChatMessage,
};
