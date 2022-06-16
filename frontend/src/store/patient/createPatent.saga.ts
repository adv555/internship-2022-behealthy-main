import { call, put, takeEvery } from 'redux-saga/effects';
import { PatientActionCreators } from './creatPatient.reducer';
import { api } from 'services';
import { PersonalContactsProps } from 'components/Patient-questionary/Forms/Personal-contacts-form';
import { IPatient } from './types';
import { IPatientSelect } from 'common/types/app/Patient.type';

const submitPatientData = async (values: PersonalContactsProps) => {
  const newPatient = await api.post('/patient', values);
  return newPatient.data;
};
const getPatientByUserId = async (user_id: number): Promise<IPatient> => {
  const patient = await api.get(`/patient`, {
    params: {
      user_id,
    },
  });
  return patient.data;
};
const getPatientById = async (id: number): Promise<IPatientSelect> => {
  const patient = await api.get(`/patient/${id}`);
  return patient.data;
};

function* submitPatientDataWorker(
  action: ReturnType<typeof PatientActionCreators.submitPatientData>,
) {
  try {
    yield put(PatientActionCreators.startSubmitting());
    const newPatient: IPatient = yield call(
      submitPatientData,
      action.payload.values,
    );

    yield put(PatientActionCreators.setPatientData(newPatient));

    yield put(PatientActionCreators.submittingSuccess());
  } catch (e) {
    const error = e as Error;
    console.error(error);
    yield put(
      PatientActionCreators.submittingFailure({ error: error.message }),
    );
  }
}

function* getPatientDataWorker(
  action: ReturnType<typeof PatientActionCreators.getPatientData>,
) {
  try {
    const patient: IPatient = yield call(getPatientByUserId, action.payload);

    yield put(
      PatientActionCreators.setPatientData({
        ...patient,
      }),
    );
  } catch (e) {
    const error = e as Error;
    yield put(
      PatientActionCreators.submittingFailure({ error: error.message }),
    );
  }
}
function* getPatientByIdWorker(
  action: ReturnType<typeof PatientActionCreators.getPatientByPatientId>,
) {
  try {
    const patient: IPatientSelect = yield call(getPatientById, action.payload);

    yield put(PatientActionCreators.setCurrentPatientData(patient));
  } catch (e) {
    const error = e as Error;
    yield put(
      PatientActionCreators.submittingFailure({ error: error.message }),
    );
  }
}

function* submitPatientDataWatcher() {
  yield takeEvery(
    PatientActionCreators.submitPatientData,
    submitPatientDataWorker,
  );

  yield takeEvery(PatientActionCreators.getPatientData, getPatientDataWorker);
  yield takeEvery(
    PatientActionCreators.getPatientByPatientId,
    getPatientByIdWorker,
  );
}

export { submitPatientDataWatcher };
