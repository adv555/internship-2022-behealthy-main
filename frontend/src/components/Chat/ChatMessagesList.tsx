import React, { useEffect, useRef, useState } from 'react';
import EmptyImg from '../../assets/img/Messages.png';
import { Typography } from '../common/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'common/types/app/root-state.type';
import { ChatMessage } from './ChatMessage';
import { ChatActionCreator } from 'store/chat/chat.reducer';
import { ReactComponent as Send } from '../../assets/icons/Send.svg';
import { ReactComponent as AddFile } from '../../assets/icons/AddFile.svg';
import { IAddChatMessage } from 'common/types/app/ChatMessage.type';
import { socket } from './Chat';
import { IChatSelect } from 'common/types/app/Chat.type';
import { getChatAvatarByRole } from './hepers/getChatAvatarByRole';
import { getChatMessageAvatar } from './hepers/getChatMessageAvatar';
interface MessageListProps {
  role: 'practitioner' | 'patient';
  context?: 'chatPage' | 'detailsPage';
}
export const ChatMessagesList = ({ role, context }: MessageListProps) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.data);
  const inputElement = useRef<HTMLDivElement>(null);
  const [successUpdate, setSuccessUpdate] = useState<boolean>(false);
  const currentChat = useSelector(
    (state: RootState) => state.chat.currentItem.item,
  );
  const currentUserId = useSelector((state: RootState) => state.user.data?.id);

  useEffect(() => {
    if (successUpdate && currentChat) {
      dispatch(ChatActionCreator.getChatById(currentChat.id));
      setSuccessUpdate(false);
    }
  }, [successUpdate]);

  useEffect(() => {
    if (user !== null) {
      socket.connect();
      socket.on('connect', () => {
        socket.emit('register', user.id);
      });
      socket.on('message', ({ data, sender }) => {
        if (currentChat !== null) {
          dispatch(ChatActionCreator.getChatById(currentChat.id));
        }
      });
    }
  }, [currentChat]);

  if (currentUserId == null) return <div></div>;

  if (currentChat === null) {
    return (
      <div className="h-full flex flex-col justify-center items-center ">
        <div>
          <img src={EmptyImg} alt="no messages" />
        </div>
        <Typography
          tagName="p"
          type="Ag-16-medium"
          children={
            context === 'detailsPage'
              ? 'Chat will be avaliable after acceptance of the declaration'
              : 'Choose conversation to start messaging'
          }
        />
      </div>
    );
  }

  function addNewMessage(currentChat: IChatSelect, userId: number) {
    const newMessage: IAddChatMessage = {
      chat_id: currentChat.id,
      user_id: userId,
      message:
        inputElement.current == null ? '' : inputElement.current.innerText,
      is_read: false,
    };
    dispatch(ChatActionCreator.addMessage(newMessage));
    socket.emit('message', {
      data: newMessage.message,
      receiver:
        role === 'patient'
          ? currentChat.familyPractitioner.user_id
          : currentChat.patient.user_id,
      sender: currentUserId,
    });
    setSuccessUpdate(true);
    if (inputElement.current !== null) {
      inputElement.current.innerText = '';
    }
  }

  return (
    <div className="h-full relative">
      {!(context === 'detailsPage') && (
        <div className="p-3 h-76px flex items-center border-b w-full bg-backgroundColour hover:cursor-pointer">
          <a className="block mx-2 w-10 h-10 rounded-full mr-4 overflow-hidden">
            <img
              src={getChatAvatarByRole(role, currentChat)}
              alt=" No avatar"
              className="object-cover h-full w-full  object-center"
            />
          </a>
          <div>
            <p>
              {role === 'patient'
                ? currentChat.familyPractitioner.first_name +
                  ' ' +
                  currentChat.familyPractitioner.last_name
                : currentChat.patient.first_name +
                  ' ' +
                  currentChat.patient.last_name}
            </p>
            <p>
              {role === 'patient'
                ? currentChat.familyPractitioner.phone
                : currentChat.patient.phone}
            </p>
          </div>
        </div>
      )}

      {currentChat.messages.length === 0 && currentChat.is_active ? (
        <div className="m-10 flex flex-col items-center ">
          <div>
            <img src={EmptyImg} alt="no messages" />
          </div>
          <Typography
            tagName="p"
            type="Ag-16-medium"
            children="There are no messages yet"
          />
        </div>
      ) : (
        <div className="mb-11px max-h-chatMessages overflow-auto">
          {currentChat.messages.map((message) => {
            return (
              <ChatMessage
                key={message.id}
                chatMessage={message}
                currentUserId={currentUserId}
                avatar={getChatMessageAvatar(
                  role,
                  currentUserId,
                  message,
                  currentChat,
                )}
              />
            );
          })}
        </div>
      )}

      {currentChat.is_active && (
        <div className="mx-auto flex w-11/12 items-center absolute bottom-0 left-0 right-0 mb-5">
          <div className="w-full flex flex-row justify-center">
            <div className="flex rounded-full p-1.5 mt-10px border border-primaryBlue max-h-[150px] w-4/5 oveflow-hidden">
              <div className="mx-1.5 mt-0.5">
                <label htmlFor="file-upload" className="hover:cursor-pointer">
                  <AddFile />
                </label>
                <input id="file-upload" type="file" className="hidden" />
              </div>
              <div
                contentEditable
                className="message w-full max-h-[150px] outline-none overflow-hidden"
                ref={inputElement}
              ></div>
            </div>
            <button
              className="ml-3 mt-2"
              type="submit"
              onClick={() => addNewMessage(currentChat, currentUserId)}
            >
              <Send />
            </button>
          </div>
        </div>
      )}
      {!currentChat.is_active && (
        <div className="w-full flex items-center m-5">
          <Typography
            tagName="p"
            type="Ag-15-medium"
            children="You cannot send messages to this person because they are not your patient anymore"
          />
        </div>
      )}
    </div>
  );
};
