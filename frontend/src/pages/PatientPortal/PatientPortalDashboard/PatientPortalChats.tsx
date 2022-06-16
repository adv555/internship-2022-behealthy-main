import { RootState } from 'common/types/app/root-state.type';
import { Chat } from 'components/Chat/Chat';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ChatActionCreator } from 'store/chat/chat.reducer';

export const PatientPortalChats = () => {
  return <Chat isExtendedInit={false} role={'patient'} />;
};
