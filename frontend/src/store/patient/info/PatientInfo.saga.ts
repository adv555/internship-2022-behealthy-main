import { AxiosError } from 'axios';
import { PatientInfo } from 'common/types/PatientInfo';
import { call, put, takeEvery } from 'redux-saga/effects';
import { api } from 'services';
import { PatientInfoActionCreator } from './PatientInfo.reducer';

const loadPatientInfo = async (user_id: number): Promise<PatientInfo> => {
  const response = await api.get(`/patient?user_id=${user_id}`);
  const patient: PatientInfo = response.data;

  return patient;
};

const updatePatientInfo = async (
  id: number,
  values: PatientInfo,
): Promise<PatientInfo> => {
  const response = await api.put(`/patient/${id}`, values);
  return response.data;
};

function* updatePatientInfoWorker(
  action: ReturnType<typeof PatientInfoActionCreator.update>,
) {
  try {
    const { id, values } = action.payload;
    yield call(updatePatientInfo, id, values);
    yield put(PatientInfoActionCreator.savingSuccess({ data: values }));
  } catch (err: any) {
    const error: AxiosError = err;
    yield put(PatientInfoActionCreator.error({ error: error.message }));
  }
}

function* loadPatientInfoWorker(
  action: ReturnType<typeof PatientInfoActionCreator.load>,
) {
  try {
    const patientInfo: PatientInfo = yield call(
      loadPatientInfo,
      action.payload,
    );
    yield put(PatientInfoActionCreator.loadingSuccess({ data: patientInfo }));
  } catch (err: any) {
    const error: AxiosError = err;
    yield put(PatientInfoActionCreator.error({ error: error.message }));
  }
}

function* PatientInfoWatcher() {
  yield takeEvery(PatientInfoActionCreator.load, loadPatientInfoWorker);

  yield takeEvery(PatientInfoActionCreator.update, updatePatientInfoWorker);
}

export { PatientInfoWatcher };
