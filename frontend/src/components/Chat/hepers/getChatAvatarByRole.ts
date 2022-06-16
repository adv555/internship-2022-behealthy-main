import { IChatSelect } from 'common/types/app/Chat.type';
export const getChatAvatarByRole = (role: string, chat: IChatSelect) => {
  let result =
    role === 'patient'
      ? chat.familyPractitioner.user.avatar
      : chat.patient.user.avatar;
  if (result) {
    return result;
  } else {
    return 'https://via.placeholder.com/150';
  }
};
