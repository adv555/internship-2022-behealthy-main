import { call, put, takeEvery } from 'redux-saga/effects';
import { DocumentInfoActionCreators } from './createDocument.reducer';
import { api } from 'services';
import { DocumentProps } from 'components/Patient-questionary/Forms/Personal-verification-form';

const submitDocument = async (values: DocumentProps) => {
  await api.post('/documents', values);
};

function* submitDocumentInfoDataWorker(
  action: ReturnType<typeof DocumentInfoActionCreators.submitDocumentsData>,
) {
  try {
    yield put(DocumentInfoActionCreators.startSubmitting());
    yield call(submitDocument, action.payload.values);

    yield put(DocumentInfoActionCreators.submittingSuccess());
  } catch (e) {
    const error = e as Error;
    console.error(error);
    yield put(
      DocumentInfoActionCreators.submittingFailure({ error: error.message }),
    );
  }
}

function* submitDocumentInfoDataWatcher() {
  yield takeEvery(
    DocumentInfoActionCreators.submitDocumentsData,
    submitDocumentInfoDataWorker,
  );
}

export { submitDocumentInfoDataWatcher };
