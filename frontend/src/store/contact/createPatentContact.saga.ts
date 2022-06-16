import { call, put, takeEvery } from 'redux-saga/effects';
import { ContactActionCreators } from './creatPatientContact.reducer';
import { api } from 'services';
import { PersonalContactsProps } from 'components/Patient-questionary/Forms/Personal-contacts-form';

const submitContact = async (values: PersonalContactsProps) => {
  await api.post('/contacts', values);
};

function* submitContactDataWorker(
  action: ReturnType<typeof ContactActionCreators.submitContactData>,
) {
  try {
    yield put(ContactActionCreators.startSubmitting());
    yield call(submitContact, action.payload.values);

    yield put(ContactActionCreators.submittingSuccess());
  } catch (e) {
    const error = e as Error;
    console.error(error);
    yield put(
      ContactActionCreators.submittingFailure({ error: error.message }),
    );
  }
}

function* submitContactDataWatcher() {
  yield takeEvery(
    ContactActionCreators.submitContactData,
    submitContactDataWorker,
  );
}

export { submitContactDataWatcher };
