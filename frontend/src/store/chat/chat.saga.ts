import { IAddChatMessage } from './../../common/types/app/ChatMessage.type';
import { IChatMessage } from 'common/types/app/ChatMessage.type';
import {
  IChat,
  IChatSelect,
  IChatCreateDto,
} from './../../common/types/app/Chat.type';
import { AxiosError } from 'axios';
import { call, put, putResolve, takeEvery } from 'redux-saga/effects';
import { api } from 'services';
import { ChatActionCreator } from './chat.reducer';

const getChatList = async (
  id: number,
  isActive: boolean,
): Promise<IChatSelect[]> => {
  const list = await api.get(`/chat/practitioners/${id}`, {
    params: { status: isActive },
  });
  return list.data;
};
const getChatListByPatientId = async (
  id: number,
  isActive: boolean,
): Promise<IChatSelect[]> => {
  const list = await api.get(`/chat/patients/${id}`, {
    params: { status: isActive },
  });
  return list.data;
};
const getChatById = async (id: number): Promise<IChatSelect> => {
  const list = await api.get(`/chat/${id}`);
  return list.data;
};
const addMessage = async (message: IAddChatMessage): Promise<IChatMessage> => {
  const list = await api.post(`/chat-message`, message);
  return list.data;
};
const addChat = async (chat: IChatCreateDto): Promise<IChat> => {
  const list = await api.post(`/chat`, chat);
  return list.data;
};
const updateChat = async (id: number, chat: Partial<IChat>): Promise<IChat> => {
  const list = await api.patch(`/chat/${id}`, chat);
  return list.data;
};
const getChatByIds = async (
  patientId: number,
  practitionerId: number,
): Promise<IChatSelect> => {
  const list = await api.get(
    `/chat/patient/${patientId}/practitioner/${practitionerId}`,
  );
  return list.data;
};

function* getChatListWorker(
  action: ReturnType<typeof ChatActionCreator.getChatListByPractitionerId>,
) {
  try {
    const chatList: IChatSelect[] = yield call(
      getChatList,
      action.payload.practitionerId,
      action.payload.isActive,
    );
    yield put(ChatActionCreator.chatLoadSuccess(chatList));
  } catch (err: any) {
    const error: AxiosError = err;
    yield put(
      ChatActionCreator.chatError({
        error: error.message,
      }),
    );
  }
}
function* getChatListByPatientIdWorker(
  action: ReturnType<typeof ChatActionCreator.getChatListByPatientId>,
) {
  try {
    const chatList: IChatSelect[] = yield call(
      getChatListByPatientId,
      action.payload.patientId,
      action.payload.isActive,
    );
    yield put(ChatActionCreator.chatLoadSuccess(chatList));
  } catch (err: any) {
    const error: AxiosError = err;
    yield put(
      ChatActionCreator.chatError({
        error: error.message,
      }),
    );
  }
}
function* getChatByIdWorker(
  action: ReturnType<typeof ChatActionCreator.getChatById>,
) {
  try {
    const chat: IChatSelect = yield call(getChatById, action.payload);
    yield put(ChatActionCreator.chatLoadCurrentSuccess(chat));
  } catch (err: any) {
    const error: AxiosError = err;
    yield put(
      ChatActionCreator.chatError({
        error: error.message,
      }),
    );
  }
}
function* addMessageWorker(
  action: ReturnType<typeof ChatActionCreator.addMessage>,
) {
  try {
    yield call(addMessage, action.payload);
    yield put(ChatActionCreator.success());
  } catch (err: any) {
    const error: AxiosError = err;
    yield put(
      ChatActionCreator.chatError({
        error: error.message,
      }),
    );
  }
}
function* addChatWorker(action: ReturnType<typeof ChatActionCreator.addChat>) {
  try {
    const chat: IChat = yield call(
      getChatByIds,
      action.payload.patient_id,
      action.payload.family_practitioner_id,
    );

    if (chat) {
      yield call(updateChat, chat.id!, { is_active: true });
    } else {
      yield call(addChat, action.payload);
    }

    yield put(ChatActionCreator.success());
  } catch (err: any) {
    const error: AxiosError = err;
    yield put(
      ChatActionCreator.chatError({
        error: error.message,
      }),
    );
  }
}
function* updateChatWorker(
  action: ReturnType<typeof ChatActionCreator.updateChat>,
) {
  try {
    yield call(updateChat, action.payload.id, action.payload.chat);
    yield put(ChatActionCreator.success());
  } catch (err: any) {
    const error: AxiosError = err;
    yield put(
      ChatActionCreator.chatError({
        error: error.message,
      }),
    );
  }
}
function* openChatWorker(
  action: ReturnType<typeof ChatActionCreator.openChat>,
) {
  try {
    const chat: IChatSelect = yield call(
      getChatByIds,
      action.payload.patientId,
      action.payload.practitionerId,
    );

    if (chat) {
      yield putResolve(ChatActionCreator.chatLoadCurrentSuccess(chat));
    } else {
      yield put(ChatActionCreator.clearCurrentChat());
    }
  } catch (err: any) {
    const error: AxiosError = err;
    yield put(
      ChatActionCreator.chatError({
        error: error.message,
      }),
    );
  }
}
function* terminateChatWorker(
  action: ReturnType<typeof ChatActionCreator.terminateChat>,
) {
  try {
    const chat: IChatSelect = yield call(
      getChatByIds,
      action.payload.patientId,
      action.payload.practitionerId,
    );

    if (chat) {
      yield call(updateChat, chat.id, { is_active: false });
      yield put(ChatActionCreator.success());
    }
  } catch (err: any) {
    const error: AxiosError = err;
    yield put(
      ChatActionCreator.chatError({
        error: error.message,
      }),
    );
  }
}

function* chatWatcher() {
  yield takeEvery(
    ChatActionCreator.getChatListByPractitionerId,
    getChatListWorker,
  );
  yield takeEvery(ChatActionCreator.getChatById, getChatByIdWorker);
  yield takeEvery(ChatActionCreator.addMessage, addMessageWorker);
  yield takeEvery(
    ChatActionCreator.getChatListByPatientId,
    getChatListByPatientIdWorker,
  );
  yield takeEvery(ChatActionCreator.addChat, addChatWorker);
  yield takeEvery(ChatActionCreator.updateChat, updateChatWorker);
  yield takeEvery(ChatActionCreator.openChat, openChatWorker);
  yield takeEvery(ChatActionCreator.terminateChat, terminateChatWorker);
}

export { chatWatcher };
