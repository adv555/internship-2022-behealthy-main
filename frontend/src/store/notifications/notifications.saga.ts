import { AxiosError } from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { api } from 'services';
import {
  NotificationSettings,
  NotificationSettingsActionCreator,
  UpdatedNotificationSettings,
} from './notifications.reducer';

const loadSettings = async (userId: number): Promise<NotificationSettings> => {
  const settings = await api.get(`/notification-settings/${userId}`);

  if (settings.data === '') {
    const settings = await api.post(`/notification-settings/`, {
      user_id: userId,
    });

    return settings.data;
  }

  return settings.data;
};

const removeSettings = async (id: number) => {
  await api.delete(`/notification-settings/${id}`);
};

const updateSettings = async (
  settingsId: number | undefined,
  updatedSettings: UpdatedNotificationSettings,
  userId: number,
): Promise<NotificationSettings> => {
  if (settingsId) {
    const settings = await api.patch(
      `/notification-settings/${settingsId}`,
      updatedSettings,
    );
    return settings.data;
  }

  const settings = await api.post('/notification-settings', {
    ...updatedSettings,
    user_id: userId,
  });
  return settings.data;
};

function* LoadSettingsWorker(
  action: ReturnType<typeof NotificationSettingsActionCreator.loadSettings>,
) {
  try {
    const settings: NotificationSettings = yield call(
      loadSettings,
      action.payload,
    );

    yield put(
      NotificationSettingsActionCreator.loadSettingsSuccess({
        settings,
      }),
    );
  } catch (err: any) {
    const error: AxiosError = err;
    yield put(
      NotificationSettingsActionCreator.loadSettingsError({
        error: error.message,
      }),
    );
  }
}

function* UpdatedSettingsWorker(
  action: ReturnType<typeof NotificationSettingsActionCreator.updateSettings>,
) {
  try {
    const settings: NotificationSettings = yield call(
      updateSettings,
      action.payload.id,
      action.payload.updatedSettings,
      action.payload.userId,
    );

    yield put(
      NotificationSettingsActionCreator.loadSettingsSuccess({
        settings,
      }),
    );
  } catch (err: any) {
    const error: AxiosError = err;
    yield put(
      NotificationSettingsActionCreator.loadSettingsError({
        error: error.message,
      }),
    );
  }
}

function* RemoveSettingsWorker(
  action: ReturnType<typeof NotificationSettingsActionCreator.removeSettings>,
) {
  try {
    yield call(removeSettings, action.payload);
  } catch (err: any) {
    const error: AxiosError = err;
    yield put(
      NotificationSettingsActionCreator.loadSettingsError({
        error: error.message,
      }),
    );
  }
}

function* LoadSettingsWatcher() {
  yield takeEvery(
    NotificationSettingsActionCreator.loadSettings,
    LoadSettingsWorker,
  );
  yield takeEvery(
    NotificationSettingsActionCreator.updateSettings,
    UpdatedSettingsWorker,
  );
  yield takeEvery(
    NotificationSettingsActionCreator.removeSettings,
    RemoveSettingsWorker,
  );
}

export { LoadSettingsWatcher };
