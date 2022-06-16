import { AxiosError } from 'axios';
import {
  PatientContactPeople,
  PatientContactPerson,
} from 'common/types/PatientContactPeople';
import { call, put, takeEvery } from 'redux-saga/effects';
import { api } from 'services';
import { PatientContactPeopleActionCreator } from './PatientContactPeople.reducer';

const loadEntity = async (
  patient_id: number,
): Promise<Omit<PatientContactPeople, 'id'>> => {
  const response = await api.get(`/contacts?patient_id=${patient_id}`);

  const emptyContact = {
    patient_id,
    contacts: [
      {
        patient_id,
        first_name: '',
        last_name: '',
        phone: '',
        relation_type: null,
      },
    ],
  };

  return response.data && response.data.length
    ? { patient_id, contacts: response.data }
    : emptyContact;
};

const saveEntity = async (
  entity: PatientContactPerson,
): Promise<PatientContactPerson> => {
  const response = entity.id
    ? api.put<PatientContactPerson>(`/contacts/${entity.id}`, entity)
    : api.post<PatientContactPerson>('/contacts/', entity);

  return (await response).data;
};

const saveEntities = async (
  contactPeople: PatientContactPeople,
): Promise<PatientContactPeople> => {
  const { patient_id } = contactPeople;

  return Promise.all(
    contactPeople.contacts
      .map((entity) => ({ ...entity, patient_id }))
      .map(saveEntity),
  ).then((contacts) => ({ ...contactPeople, contacts }));
};

const deleteEntity = async (id: number) => {
  await api.delete(`/contacts/${id}`);
};

function* saveWorker(
  action: ReturnType<typeof PatientContactPeopleActionCreator.save>,
) {
  try {
    yield call(saveEntities, action.payload);
    yield put(
      PatientContactPeopleActionCreator.savingSuccess({ data: action.payload }),
    );
  } catch (err: any) {
    const error: AxiosError = err;
    yield put(
      PatientContactPeopleActionCreator.error({ error: error.message }),
    );
  }
}

function* loadWorker(
  action: ReturnType<typeof PatientContactPeopleActionCreator.load>,
) {
  try {
    const entity: PatientContactPeople = yield call(loadEntity, action.payload);
    yield put(
      PatientContactPeopleActionCreator.loadingSuccess({ data: entity }),
    );
  } catch (err: any) {
    const error: AxiosError = err;
    yield put(
      PatientContactPeopleActionCreator.error({ error: error.message }),
    );
  }
}

function* deleteWorker(
  action: ReturnType<typeof PatientContactPeopleActionCreator.delete>,
) {
  try {
    yield call(deleteEntity, action.payload);
  } catch (err: any) {
    const error: AxiosError = err;
    yield put(
      PatientContactPeopleActionCreator.error({ error: error.message }),
    );
  }
}

function* PatientContactPeopleWatcher() {
  yield takeEvery(PatientContactPeopleActionCreator.load, loadWorker);

  yield takeEvery(PatientContactPeopleActionCreator.save, saveWorker);

  yield takeEvery(PatientContactPeopleActionCreator.delete, deleteWorker);
}

export { PatientContactPeopleWatcher };
