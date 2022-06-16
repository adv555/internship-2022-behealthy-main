import React from 'react';
import { Typography } from '../common/Typography';
import CompanionAvatar from '../../assets/img/Avatar-2.png';
import { IChatMessage } from 'common/types/app/ChatMessage.type';

interface MessageItemProps {
  chatMessage: IChatMessage;
  currentUserId: number;
  avatar: string;
}

export const ChatMessage: React.FC<MessageItemProps> = ({
  chatMessage,
  currentUserId,
  avatar,
}) => {
  const { id, user_id, message, is_read, files } = chatMessage;

  return (
    <div className="mt-11px mx-10px overflow-x-visible break-all">
      {user_id === currentUserId ? (
        <div className="flex justify-end">
          <Typography
            type="Ag-15-regular"
            className="bg-primaryBlue text-greyScaleWhite p-11px rounded-24px max-w-5/6"
            children={message}
          />
          <img
            src={avatar}
            alt="user avatar"
            className="w-32px h-32px rounded-full mt-1.5 ml-1"
          />
        </div>
      ) : (
        <div className="flex">
          <img
            src={avatar}
            alt="companion avatar"
            className="w-32px h-32px rounded-full mt-1.5 mr-1"
          />
          <Typography
            type="Ag-15-regular"
            className="bg-disabledBlue text-greyScaleWhite p-11px rounded-24px"
            children={message}
          />
        </div>
      )}
    </div>
  );
};
