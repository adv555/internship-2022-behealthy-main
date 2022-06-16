import { call, put, takeEvery } from 'redux-saga/effects';
import { BmiInfoActionCreators } from './createBmiInfo.reducer';
import { api } from 'services';
import { PersonalBmiFormFields } from 'components/Patient-questionary/Forms/Personal-bmi-form';

const submitBmiInfo = async (values: PersonalBmiFormFields) => {
  await api.post('/bmi_info', values);
};

function* submitBmiInfoDataWorker(
  action: ReturnType<typeof BmiInfoActionCreators.submitBmiInfoData>,
) {
  try {
    yield put(BmiInfoActionCreators.startSubmitting());
    yield call(submitBmiInfo, action.payload.values);

    yield put(BmiInfoActionCreators.submittingSuccess());
  } catch (e) {
    const error = e as Error;
    console.error(error);
    yield put(
      BmiInfoActionCreators.submittingFailure({ error: error.message }),
    );
  }
}

function* submitBmiInfoDataWatcher() {
  yield takeEvery(
    BmiInfoActionCreators.submitBmiInfoData,
    submitBmiInfoDataWorker,
  );
}

export { submitBmiInfoDataWatcher };
