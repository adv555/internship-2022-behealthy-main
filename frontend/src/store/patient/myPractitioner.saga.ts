import { call, put, takeEvery } from 'redux-saga/effects';
import { api } from 'services';
import { MyPractitionerActionCreators } from './myPractitioner.reducer';
import { IPractitioner } from './types';

const fetchPractitionersData = async () => {
  const { data } = await api.get('/family-practitioner');
  return data;
};

const fetchPractitionerByIdData = async (
  id: number,
): Promise<IPractitioner> => {
  const practitioner = await api.get(`/family-practitioner/${id}`);
  return practitioner.data;
};

function* submitPractitionersDataWorker() {
  try {
    yield put(MyPractitionerActionCreators.startSubmitting());
    const data: IPractitioner[] = yield call(fetchPractitionersData);
    yield put(MyPractitionerActionCreators.submittingSuccess(data));
  } catch (e) {
    const error = e as Error;
    console.error(error);
    yield put(
      MyPractitionerActionCreators.submittingFailure({ error: error.message }),
    );
  }
}

function* submitPractitionerByIdDataWorker(
  action: ReturnType<typeof MyPractitionerActionCreators.getPractitionerById>,
) {
  try {
    yield put(MyPractitionerActionCreators.startSubmitting());
    const practitioner: IPractitioner = yield call(
      fetchPractitionerByIdData,
      action.payload,
    );
    yield put(
      MyPractitionerActionCreators.submitPractitionerSuccess(practitioner),
    );
  } catch (e) {
    const error = e as Error;
    console.error(error);
    yield put(
      MyPractitionerActionCreators.submittingFailure({ error: error.message }),
    );
  }
}

function* submitPractitionersDataWatcher() {
  yield takeEvery(
    MyPractitionerActionCreators.getPractitioners,
    submitPractitionersDataWorker,
  );

  yield takeEvery(
    MyPractitionerActionCreators.getPractitionerById,
    submitPractitionerByIdDataWorker,
  );
}

export { submitPractitionersDataWatcher };
