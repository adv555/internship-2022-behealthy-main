import { IChatSelect } from 'common/types/app/Chat.type';
import { IChatMessage } from 'common/types/app/ChatMessage.type';

export const getChatMessageAvatar = (
  role: string,
  userId: number,
  message: IChatMessage,
  currentChat: IChatSelect,
) => {
  if (role === 'patient')
    return message.user_id === userId
      ? currentChat.patient.user.avatar
      : currentChat.familyPractitioner.user.avatar;

  if (role === 'practitioner')
    return message.user_id === userId
      ? currentChat.familyPractitioner.user.avatar
      : currentChat.patient.user.avatar;
  return 'https://via.placeholder.com/150';
};
