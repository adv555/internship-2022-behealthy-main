import { RootState } from 'common/types/app/root-state.type';
import { useDispatch, useSelector } from 'react-redux';
import { ChatNameCard } from './ChatNameCard';
import { Typography } from 'components/common/Typography';
import { useEffect, useState } from 'react';
import { ChatActionCreator } from 'store/chat/chat.reducer';
import { findLatestMessage } from './hepers/findLatestMessage';
import { getChatAvatarByRole } from './hepers/getChatAvatarByRole';

export interface ChatNameList {
  role: 'practitioner' | 'patient';
}
export const ChatNameList = ({ role }: ChatNameList) => {
  const dispatch = useDispatch();
  const chats = useSelector((state: RootState) => state.chat.items);
  const user = useSelector((state: RootState) => state.user.data);
  const currentChat = useSelector((state: RootState) => state.chat.currentItem);

  function getInitialFilter(current: boolean | undefined) {
    if (current == null) {
      return true;
    } else return current;
  }

  const [showActive, Toggle] = useState(
    getInitialFilter(currentChat.item?.is_active),
  );

  const patient_id = useSelector((state: RootState) => state.patient.data?.id);

  const practitioner_id = useSelector(
    (state: RootState) => state.practitioner.data?.id,
  );

  useEffect(() => {
    if (patient_id !== null && role === 'patient') {
      dispatch(
        ChatActionCreator.getChatListByPatientId(patient_id, showActive),
      );
    } else if (practitioner_id !== null && role === 'practitioner') {
      dispatch(
        ChatActionCreator.getChatListByPractitionerId(
          practitioner_id,
          showActive,
        ),
      );
    }
  }, [patient_id, practitioner_id, showActive]);

  if (patient_id == null && practitioner_id == null) return <div></div>;

  return (
    <div className="w-full h-full min-h-[74px] truncate border-r">
      <div className="h-76px flex border-b justify-center px-10px items-center">
        <div
          onClick={() => {
            Toggle(true);
            dispatch(ChatActionCreator.clearCurrentChat());
          }}
        >
          <Typography
            type="Ag-12-normal"
            children="Active"
            className={
              showActive
                ? 'mx-10px hover:cursor-pointer underline text-primaryBlue'
                : 'mx-10px hover:cursor-pointer hover:underline hover:text-primaryBlue'
            }
          />
        </div>
        <div
          onClick={() => {
            Toggle(false);
            dispatch(ChatActionCreator.clearCurrentChat());
          }}
        >
          <Typography
            type="Ag-12-normal"
            children="Archived"
            className={
              !showActive
                ? 'mx-10px hover:cursor-pointer underline text-primaryBlue'
                : 'mx-10px hover:cursor-pointer hover:underline hover:text-primaryBlue'
            }
          />
        </div>
      </div>
      {chats.map((item) => (
        <ChatNameCard
          key={item.id}
          isActiveChat={item.id === currentChat.item?.id}
          lastMessage={findLatestMessage(item.messages, user!.id)}
          personName={
            role === 'patient'
              ? item.familyPractitioner.first_name +
                ' ' +
                item.familyPractitioner.last_name
              : item.patient.first_name + ' ' + item.patient.last_name
          }
          avatar={getChatAvatarByRole(role, item)}
          onClick={() => {
            if (currentChat.item == null || currentChat.item.id !== item.id) {
              dispatch(ChatActionCreator.getChatById(item.id));
            }
          }}
        />
      ))}
    </div>
  );
};
