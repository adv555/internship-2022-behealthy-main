import { AxiosError } from 'axios';
import { PatientNotifications } from 'common/types/PatientNotifications';
import { call, put, takeEvery } from 'redux-saga/effects';
import { api } from 'services';
import { PatientNotificationsActionCreator } from './PatientNotifications.reducer';

const loadEntity = async (
  patient_id: number,
): Promise<Omit<PatientNotifications, 'id'>> => {
  const response = await api.get(`/patient-notifications/${patient_id}`);

  const emptyEntity = {
    patient_id,
    visits: false,
    recommendations: false,
    reminders: false,
    propositions: false,
  };

  return response.data ? response.data : emptyEntity;
};

const saveEntity = async (
  entity: PatientNotifications,
): Promise<PatientNotifications> => {
  const response = entity.id
    ? await api.patch(`/patient-notifications/${entity.id}`, entity)
    : await api.post('/patient-notifications/', entity);

  return response.data;
};

function* saveWorker(
  action: ReturnType<typeof PatientNotificationsActionCreator.save>,
) {
  try {
    const entity: PatientNotifications = yield call(saveEntity, action.payload);
    yield put(
      PatientNotificationsActionCreator.savingSuccess({ data: entity }),
    );
  } catch (err: any) {
    const error: AxiosError = err;
    yield put(
      PatientNotificationsActionCreator.error({ error: error.message }),
    );
  }
}

function* loadWorker(
  action: ReturnType<typeof PatientNotificationsActionCreator.load>,
) {
  try {
    const entity: PatientNotifications = yield call(loadEntity, action.payload);
    yield put(
      PatientNotificationsActionCreator.loadingSuccess({ data: entity }),
    );
  } catch (err: any) {
    const error: AxiosError = err;
    yield put(
      PatientNotificationsActionCreator.error({ error: error.message }),
    );
  }
}

function* PatientNotificationsWatcher() {
  yield takeEvery(PatientNotificationsActionCreator.load, loadWorker);

  yield takeEvery(PatientNotificationsActionCreator.save, saveWorker);
}

export { PatientNotificationsWatcher };
