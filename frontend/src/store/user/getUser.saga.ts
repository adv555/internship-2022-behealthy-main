import { AxiosError } from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { api } from 'services';
import { UserActionCreator, UserData } from './getUser.reducer';

const getUser = async (email: string): Promise<UserData> => {
  const user = await api.get(`/user/email/${email}`);

  return user.data;
};

const updateUser = async (id: number, updatedData: any): Promise<UserData> => {
  const user = await api.patch(`/user/${id}`, updatedData);

  return user.data;
};

const deleteUser = async (id: number, password: string) => {
  await api.delete(`/user/${id}`, {
    data: {
      password,
    },
  });
};

const logOutUser = () => {
  localStorage.clear();
};

function* getUserWorker(
  action: ReturnType<typeof UserActionCreator.getUserData>,
) {
  try {
    const user: UserData = yield call(getUser, action.payload.email);

    yield put(UserActionCreator.loadUserSuccess({ data: user }));
  } catch (err: any) {
    const error: AxiosError = err;
    yield put(UserActionCreator.loadUserError({ error: error.message }));
  }
}

function* updateUserWorker(
  action: ReturnType<typeof UserActionCreator.updateUser>,
) {
  try {
    const user: UserData = yield call(
      updateUser,
      action.payload.id,
      action.payload.updatedData,
    );
    yield put(UserActionCreator.updateUserSuccess({ data: user }));
  } catch (err: any) {
    const error: AxiosError = err;

    yield put(UserActionCreator.loadUserError({ error: error.message }));
  }
}

function* removeUserWorker(
  action: ReturnType<typeof UserActionCreator.removeUser>,
) {
  try {
    yield call(deleteUser, action.payload.id, action.payload.password);
    yield put(UserActionCreator.removeUserSuccess());
  } catch (err: any) {
    const error: AxiosError = err;
    yield put(UserActionCreator.loadUserError({ error: error.message }));
  }
}

function* logOutWorker() {
  yield call(logOutUser);
  yield put(UserActionCreator.removeUserSuccess());
}

function* resetUser() {
  try {
    yield put(UserActionCreator.resetUserSuccess());
  } catch (err: any) {
    const error: AxiosError = err;
    yield put(UserActionCreator.loadUserError({ error: error.message }));
  }
}

const updateAvatar = async (user: UserData): Promise<UserData> => {
  const formData = new FormData();
  formData.append('avatar', user.avatar!);
  formData.append('id', user.id.toString());

  const response = await api.patch(`/user/avatar/${user.id}`, formData);

  return response.data;
};

function* updateUserAvatarWorker(
  action: ReturnType<typeof UserActionCreator.updateUserAvatar>,
) {
  try {
    yield put(UserActionCreator.updateAvatarStarted());
    const user: UserData = yield call(updateAvatar, action.payload);
    yield put(UserActionCreator.updateAvatarFinished({ data: user }));
  } catch (err: any) {
    const error: AxiosError = err;
    yield put(UserActionCreator.updateAvatarError({ error: error.message }));
  }
}

function* getUserWatcher() {
  yield takeEvery(UserActionCreator.getUserData, getUserWorker);
  yield takeEvery(UserActionCreator.updateUser, updateUserWorker);
  yield takeEvery(UserActionCreator.removeUser, removeUserWorker);
  yield takeEvery(UserActionCreator.logOut, logOutWorker);
  yield takeEvery(UserActionCreator.resetUser, resetUser);
  yield takeEvery(UserActionCreator.updateUserAvatar, updateUserAvatarWorker);
}

export { getUserWatcher };
