import { AxiosError } from 'axios';
import {
  IDeclaration,
  IDeclarationSelect,
} from 'common/types/app/Declaration.type';
import { call, put, takeEvery } from 'redux-saga/effects';
import { api } from 'services';
import { DeclarationActionCreator } from './declaration.reducer';

const getDeclarationList = async (
  id: number,
  status: string,
): Promise<IDeclarationSelect[]> => {
  const list = await api.get(
    `/declarations/family-practitioners/${id}/status`,
    {
      params: { status: status },
    },
  );
  return list.data;
};

const getPatientDeclarations = async (id: number): Promise<IDeclaration[]> => {
  const list = await api.get(`/declarations/patient/${id}`);
  return list.data;
};

const postDeclaration = async (data: IDeclaration) => {
  const response = await api.post('/declarations', data);
  return response.data;
};

const updateDeclaration = async (data: IDeclaration) => {
  const lis = await api.put(`declarations/${data.id}`, data);
  return lis.data;
};
const getDeclarationById = async (id: number): Promise<IDeclarationSelect> => {
  const lis = await api.get(`declarations/${id}`);
  return lis.data;
};

function* getDeclarationListWorker(
  action: ReturnType<
    typeof DeclarationActionCreator.getDeclarationListByStatus
  >,
) {
  try {
    yield put(DeclarationActionCreator.declarationStart());
    const declarationList: IDeclarationSelect[] = yield call(
      getDeclarationList,
      action.payload.practitionerId,
      action.payload.status,
    );
    yield put(DeclarationActionCreator.declarationLoadSuccess(declarationList));
  } catch (err: any) {
    const error: AxiosError = err;
    yield put(
      DeclarationActionCreator.declarationError({
        error: error.message,
      }),
    );
  }
}

function* getPatientDeclarationsWorker(
  action: ReturnType<typeof DeclarationActionCreator.getDeclarationByPatientId>,
) {
  try {
    yield put(DeclarationActionCreator.declarationStart());
    const patientDeclarations: IDeclaration[] = yield call(
      getPatientDeclarations,
      action.payload,
    );
    yield put(
      DeclarationActionCreator.submitDeclarationSuccess(patientDeclarations),
    );
  } catch (err) {
    const error = err as AxiosError;
    yield put(
      DeclarationActionCreator.declarationError({
        error: error.message,
      }),
    );
  }
}
function* getDeclarationByIdWorker(
  action: ReturnType<typeof DeclarationActionCreator.getDeclarationById>,
) {
  try {
    const declararion: IDeclarationSelect = yield call(
      getDeclarationById,
      action.payload,
    );
    yield put(DeclarationActionCreator.setCurrent(declararion));
  } catch (err) {
    const error = err as AxiosError;
    yield put(
      DeclarationActionCreator.declarationError({
        error: error.message,
      }),
    );
  }
}

function* postDeclarationWorker(
  action: ReturnType<typeof DeclarationActionCreator.postDeclaration>,
) {
  try {
    yield put(DeclarationActionCreator.declarationStart());
    yield call(postDeclaration, action.payload);

    yield put(DeclarationActionCreator.declarationEnd());
  } catch (err) {
    const error = err as AxiosError;
    yield put(
      DeclarationActionCreator.declarationError({
        error: error.message,
      }),
    );
  }
}

function* updateDeclarationWorker(
  action: ReturnType<typeof DeclarationActionCreator.updateDeclaration>,
) {
  try {
    const declaration: IDeclarationSelect = yield call(
      updateDeclaration,
      action.payload,
    );
    yield put(DeclarationActionCreator.setCurrent(declaration));
  } catch (err: any) {
    const error: AxiosError = err;
    yield put(
      DeclarationActionCreator.declarationError({
        error: error.message,
      }),
    );
  }
}

function* declarationWatcher() {
  yield takeEvery(
    DeclarationActionCreator.getDeclarationListByStatus,
    getDeclarationListWorker,
  );
  yield takeEvery(
    DeclarationActionCreator.updateDeclaration,
    updateDeclarationWorker,
  );
  yield takeEvery(
    DeclarationActionCreator.postDeclaration,
    postDeclarationWorker,
  );
  yield takeEvery(
    DeclarationActionCreator.getDeclarationByPatientId,
    getPatientDeclarationsWorker,
  );
  yield takeEvery(
    DeclarationActionCreator.getDeclarationById,
    getDeclarationByIdWorker,
  );
}

export { declarationWatcher };
