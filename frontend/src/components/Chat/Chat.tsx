import { useState } from 'react';
import { io } from 'socket.io-client';
import { ChatMessagesList } from './ChatMessagesList';
import { ChatNameList } from './ChatNameList';
import { ChatSidebar } from './ChatSidebar';

interface ChatProps {
  isExtendedInit: boolean;
  role: 'practitioner' | 'patient';
}
export const socket = io(`${process.env.REACT_APP_BASE_URL}`, {
  autoConnect: false,
});

export const Chat = ({ isExtendedInit, role }: ChatProps) => {
  const [isExtended, setIsExctended] = useState(isExtendedInit);
  return (
    <div className="w-full  flex flex-row h-[calc(100%-90px)]">
      <div className="w-1/4 h-full">
        <ChatNameList role={role} />
      </div>
      <div className={isExtended ? 'w-3/4' : 'w-2/5' + ' h-full'}>
        <ChatMessagesList role={role} />
      </div>
      <div className={isExtended ? 'hidden' : 'border-l' + ' w-1/3 h-full'}>
        <ChatSidebar role={role} onClick={() => setIsExctended(true)} />
      </div>
    </div>
  );
};
