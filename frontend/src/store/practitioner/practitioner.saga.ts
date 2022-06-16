import { AxiosError, AxiosResponse } from 'axios';
import {
  IPractitioner,
  PractitionerInfoFormProps,
} from 'common/types/app/Practitioner';
import { ProfileInfo } from 'components/EditPersonalInfo/EditPersonalInfo';
import { call, put, takeEvery } from 'redux-saga/effects';
import { api } from 'services';
import { PractitionerActionCreator } from './practitioner.reducer';

const getPractitioner = async (user_id: number): Promise<IPractitioner> => {
  const practitioner = await api.get(`/family-practitioner/user/${user_id}`);
  return practitioner.data;
};
const getPractitionerById = async (id: number) => {
  const practitioner = await api.get(`/family-practitioner/${id}`);
  return practitioner.data;
};

const removePractitioner = async (id: number) => {
  await api.delete(`/family-practitioner/${id}`);
};

const updatePractitioner = async (
  id: number,
  values: ProfileInfo,
): Promise<IPractitioner> => {
  const practitioner = await api.patch(`/family-practitioner/${id}`, values);
  return practitioner.data;
};
const submitPractitioner = async (values: PractitionerInfoFormProps) => {
  return await api.post('/family-practitioner', values);
};
function* RemovePractitionerData(
  action: ReturnType<typeof PractitionerActionCreator.removePractitionerData>,
) {
  try {
    yield call(removePractitioner, action.payload.id);
  } catch (err: any) {
    const error: AxiosError = err;
    yield put(
      PractitionerActionCreator.loadPractitionerError({
        error: error.message,
      }),
    );
  }
}

function* GetPractitionerWorker(
  action: ReturnType<typeof PractitionerActionCreator.getPractitionerData>,
) {
  try {
    const practitioner: IPractitioner = yield call(
      getPractitioner,
      action.payload,
    );
    yield put(
      PractitionerActionCreator.loadPractitionerSuccess({
        data: practitioner,
      }),
    );
  } catch (err: any) {
    const error: AxiosError = err;
    yield put(
      PractitionerActionCreator.loadPractitionerError({
        error: error.message,
      }),
    );
  }
}

function* getPractitionerByIdWorker(
  action: ReturnType<typeof PractitionerActionCreator.getPractitionerById>,
) {
  try {
    const practitioner: IPractitioner = yield call(
      getPractitionerById,
      action.payload,
    );
    yield put(
      PractitionerActionCreator.loadPractitionerSuccess({
        data: practitioner,
      }),
    );
  } catch (err: any) {
    const error: AxiosError = err;
    yield put(
      PractitionerActionCreator.loadPractitionerError({
        error: error.message,
      }),
    );
  }
}

function* UpdatePractitionerWorker(
  action: ReturnType<typeof PractitionerActionCreator.updatePractitionerData>,
) {
  try {
    const practitioner: IPractitioner = yield call(
      updatePractitioner,
      action.payload.id,
      action.payload.values,
    );

    yield put(
      PractitionerActionCreator.loadPractitionerSuccess({
        data: practitioner,
      }),
    );
  } catch (err: any) {
    const error: AxiosError = err;
    yield put(
      PractitionerActionCreator.loadPractitionerError({
        error: error.message,
      }),
    );
  }
}
function* submitPractitionerWorker(
  action: ReturnType<typeof PractitionerActionCreator.submitPractitioner>,
) {
  try {
    yield put(PractitionerActionCreator.startSubmitting());
    const response: AxiosResponse<IPractitioner> = yield call(
      submitPractitioner,
      { ...action.payload.data, user_id: 1 },
    );

    yield put(PractitionerActionCreator.submittingSuccess(response.data));
  } catch (e) {
    const error = e as Error;
    console.error(error);
    yield put(
      PractitionerActionCreator.submittingFailure({ error: error.message }),
    );
  }
}

function* practitionerWatcher() {
  yield takeEvery(
    PractitionerActionCreator.getPractitionerData,
    GetPractitionerWorker,
  );
  yield takeEvery(
    PractitionerActionCreator.updatePractitionerData,
    UpdatePractitionerWorker,
  );
  yield takeEvery(
    PractitionerActionCreator.submitPractitioner,
    submitPractitionerWorker,
  );
  yield takeEvery(
    PractitionerActionCreator.removePractitionerData,
    RemovePractitionerData,
  );
  yield takeEvery(
    PractitionerActionCreator.getPractitionerById,
    getPractitionerByIdWorker,
  );
}

export { practitionerWatcher };
