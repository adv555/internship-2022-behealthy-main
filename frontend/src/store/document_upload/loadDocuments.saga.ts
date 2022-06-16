import { call, put, takeEvery } from "redux-saga/effects";
import { api } from "services"
import { DocumentsActionCreator, DocumentsData } from "./loadDocuments.reducer";

const loadDocuments = async (usedId: string) : Promise<DocumentsData> => {
  const documents = await api.get(`/documents/all/${usedId}`);
  return documents.data;
}

function* loadDocumentsWorker(
  action: ReturnType<typeof DocumentsActionCreator.loadDocumentsData>
) {
  try {
    const documents: DocumentsData[] = yield call(
      loadDocuments, 
      action.payload
    );
    
    yield put(DocumentsActionCreator.loadDocumentsSuccess({ 
      documents
    }))
  } catch (e) {
    const error = e as Error;
    yield put(DocumentsActionCreator.loadDocumentsError({ error: error.message }))
  }
}

function* loadDocumentsWatcher() {
  yield takeEvery(
    DocumentsActionCreator.loadDocumentsData,
    loadDocumentsWorker
  )
}

export { loadDocumentsWatcher }