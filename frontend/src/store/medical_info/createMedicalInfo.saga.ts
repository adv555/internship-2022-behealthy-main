import { call, put, takeEvery } from 'redux-saga/effects';
import { MedicalInfoActionCreators } from './createMedicalInfo.reducer';
import { api } from 'services';
import { PersonalMedicalInfoFormProps } from 'components/Patient-questionary/Forms/Personal-medical-info-form';

const submitMedicalInfo = async (values: PersonalMedicalInfoFormProps) => {
  await api.post('/medical_info', values);
};

function* submitMedicalInfoDataWorker(
  action: ReturnType<typeof MedicalInfoActionCreators.submitMedicalInfoData>,
) {
  try {
    yield put(MedicalInfoActionCreators.startSubmitting());
    yield call(submitMedicalInfo, action.payload.values);

    yield put(MedicalInfoActionCreators.submittingSuccess());
  } catch (e) {
    const error = e as Error;
    console.error(error);
    yield put(
      MedicalInfoActionCreators.submittingFailure({ error: error.message }),
    );
  }
}

function* submitMedicalInfoDataWatcher() {
  yield takeEvery(
    MedicalInfoActionCreators.submitMedicalInfoData,
    submitMedicalInfoDataWorker,
  );
}

export { submitMedicalInfoDataWatcher };
