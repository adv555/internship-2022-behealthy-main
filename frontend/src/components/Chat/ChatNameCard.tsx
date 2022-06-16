import { IChatMessage } from 'common/types/app/ChatMessage.type';
import { Typography } from 'components/common/Typography';

interface ChatNameCardProps {
  avatar: string;
  personName: string;
  onClick?: React.MouseEventHandler;
  lastMessage?: IChatMessage;
  timeStamp?: string;
  isActiveChat?: boolean;
}

export const ChatNameCard = ({
  avatar,
  personName,
  onClick,
  lastMessage,
  isActiveChat,
}: ChatNameCardProps) => {
  let message = '';
  let timeStamp = '';
  if (lastMessage) {
    message = lastMessage.message;
    let date = new Date(lastMessage.createdAt);
    timeStamp = date.getHours() + ':' + date.getMinutes();
  }

  return (
    <div
      onClick={onClick}
      className={
        (isActiveChat ? 'bg-fieldChosen ' : '') +
        'w-full min-h-[74px] flex flex-row p-4 gap-2 hover:bg-field hover:cursor-pointer'
      }
    >
      <div className="w-8 h-8 bg-neutral-200 mr-3 rounded-full overflow-hidden shrink-0">
        <img src={avatar} alt={personName} />
      </div>
      <div className="flex flex-col">
        <div className="flex flex-row">
          <Typography type="Ag-13-medium" className="w-full">
            {personName}
          </Typography>
          <Typography type="Ag-13-medium" className="w-full ml-5">
            {timeStamp}
          </Typography>
        </div>
        <Typography type="Ag-12-normal" className="w-full">
          {message}
        </Typography>
      </div>
    </div>
  );
};
