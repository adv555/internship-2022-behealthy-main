import { IAddChatMessage } from './../../common/types/app/ChatMessage.type';
import {
  IChatState,
  IChatSelect,
  IChat,
  IChatCreateDto,
} from './../../common/types/app/Chat.type';
import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReducerName } from 'common/enums/app/reducer-name.enum';

const initialState: IChatState = {
  isLoaded: false,
  items: [],
  error: null,
  currentItem: { item: null, isLoaded: false },
};

const { reducer, actions } = createSlice({
  name: ReducerName.CHAT,
  initialState,
  reducers: {
    chatLoadSuccess: (state, action: PayloadAction<IChatSelect[]>) => ({
      ...state,
      items: action.payload,
      isLoaded: true,
      error: null,
    }),
    chatLoadCurrentSuccess: (state, action: PayloadAction<IChatSelect>) => ({
      ...state,
      currentItem: { item: action.payload, isLoaded: true },
      error: null,
    }),
    success: (state) => ({
      ...state,
      error: null,
    }),

    chatError: (state, action: PayloadAction<{ error: string }>) => ({
      ...state,
      isLoaded: false,
      currentItem: { ...state.currentItem, isLoaded: false },
      error: action.payload.error,
    }),
    clearCurrentChat: (state) => ({
      ...state,
      currentItem: { item: null, isLoaded: false },
    }),
  },
});

const ChatActionCreator = {
  ...actions,
  getChatListByPractitionerId: createAction(
    'chat/getListByPractitionerId',
    (practitionerId, isActive: boolean) => ({
      payload: { practitionerId, isActive },
    }),
  ),
  getChatListByPatientId: createAction(
    'chat/getListByPatientId',
    (patientId, isActive: boolean) => ({
      payload: { patientId, isActive },
    }),
  ),
  getChatById: createAction('chat/getChatById', (chatId) => ({
    payload: chatId,
  })),
  addMessage: createAction('chat/addMessage', (message: IAddChatMessage) => ({
    payload: message,
  })),
  addChat: createAction('chat/addChat', (chat: IChatCreateDto) => ({
    payload: chat,
  })),
  updateChat: createAction(
    'chat/updateChat',
    (id: number, chat: Partial<IChat>) => ({
      payload: { chat, id },
    }),
  ),
  openChat: createAction(
    'chat/openChat',
    (patientId: number, practitionerId: number) => ({
      payload: { patientId, practitionerId },
    }),
  ),
  terminateChat: createAction(
    'chat/terminateChat',
    (patientId: number, practitionerId: number) => ({
      payload: { patientId, practitionerId },
    }),
  ),
};

export { ChatActionCreator, reducer };
