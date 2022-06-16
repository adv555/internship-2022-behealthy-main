import { REPOSITORY } from '../constants';
import { Chat } from './entities/chat.entity';

export const chatProvider = {
  provide: REPOSITORY.CHAT,
  useValue: Chat,
};
