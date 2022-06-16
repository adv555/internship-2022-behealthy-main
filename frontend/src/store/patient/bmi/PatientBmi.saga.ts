import { AxiosError } from 'axios';
import { PatientBmi } from 'common/types/PatientBmi';
import { call, put, takeEvery } from 'redux-saga/effects';
import { api } from 'services';
import { PatientBmiActionCreator } from './PatientBmi.reducer';

const loadEntity = async (
  patient_id: number,
): Promise<Omit<PatientBmi, 'id'>> => {
  let response = await api.get(`/bmi_info?patient_id=${patient_id}`);

  return response.data ? response.data : { patient_id, height: 0, weight: 0 };
};

const saveEntity = async (entity: PatientBmi): Promise<PatientBmi> => {
  const response = entity.id
    ? await api.patch(`/bmi_info/${entity.id}`, entity)
    : await api.post('/bmi_info/', entity);

  return response.data;
};

function* saveWorker(action: ReturnType<typeof PatientBmiActionCreator.save>) {
  try {
    const entity: PatientBmi = yield call(saveEntity, action.payload);
    yield put(PatientBmiActionCreator.savingSuccess({ data: entity }));
  } catch (err: any) {
    const error: AxiosError = err;
    yield put(PatientBmiActionCreator.error({ error: error.message }));
  }
}

function* loadWorker(action: ReturnType<typeof PatientBmiActionCreator.load>) {
  try {
    const entity: PatientBmi = yield call(loadEntity, action.payload);
    yield put(PatientBmiActionCreator.loadingSuccess({ data: entity }));
  } catch (err: any) {
    const error: AxiosError = err;
    yield put(PatientBmiActionCreator.error({ error: error.message }));
  }
}

function* PatientBmiWatcher() {
  yield takeEvery(PatientBmiActionCreator.load, loadWorker);

  yield takeEvery(PatientBmiActionCreator.save, saveWorker);
}

export { PatientBmiWatcher };
