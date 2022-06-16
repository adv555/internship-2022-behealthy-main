import { AxiosError } from 'axios';
import { PatientMedInfo } from 'common/types/PatientMedInfo';
import { call, put, takeEvery } from 'redux-saga/effects';
import { api } from 'services';
import { PatientMedInfoActionCreator } from './PatientMedInfo.reducer';

export type PatientMedInfoData = {
  id: number;
  patient_id: number;
  blood_type: string | null;
  injuries: string;
  cardio: string;
  diabetes: string | null;
  asthma: string | null;
  viral_hepatitis: string | null;
  allergies: string;
  drug_intolerance: string;
  aids: string | null;
};

const dataToEntity = (data: PatientMedInfoData): PatientMedInfo => {
  return {
    ...data,
    injuries: data.injuries.split(', '),
    allergies: data.allergies.split(', '),
    drug_intolerance: data.drug_intolerance.split(', '),
  };
};

const entityToData = (entity: PatientMedInfo): PatientMedInfoData => {
  return {
    ...entity,
    injuries: entity.injuries.join(', '),
    allergies: entity.allergies.join(', '),
    drug_intolerance: entity.drug_intolerance.join(', '),
  };
};

const loadEntity = async (
  patient_id: number,
): Promise<Omit<PatientMedInfo, 'id'>> => {
  const response = await api.get(`/medical_info?patient_id=${patient_id}`);

  return response.data
    ? dataToEntity(response.data)
    : {
        patient_id,
        blood_type: null,
        injuries: [],
        cardio: '',
        diabetes: null,
        asthma: null,
        viral_hepatitis: null,
        allergies: [],
        drug_intolerance: [],
        aids: null,
      };
};

const saveEntity = async (entity: PatientMedInfo): Promise<PatientMedInfo> => {
  const data = entityToData(entity);

  const response = entity.id
    ? await api.patch(`/medical_info/${entity.id}`, data)
    : await api.post('/medical_info/', data);

  return response.data;
};

function* saveWorker(
  action: ReturnType<typeof PatientMedInfoActionCreator.save>,
) {
  try {
    yield call(saveEntity, action.payload);
    yield put(
      PatientMedInfoActionCreator.savingSuccess({ data: action.payload }),
    );
  } catch (err: any) {
    const error: AxiosError = err;
    yield put(PatientMedInfoActionCreator.error({ error: error.message }));
  }
}

function* loadWorker(
  action: ReturnType<typeof PatientMedInfoActionCreator.load>,
) {
  try {
    const entity: PatientMedInfo = yield call(loadEntity, action.payload);
    yield put(PatientMedInfoActionCreator.loadingSuccess({ data: entity }));
  } catch (err: any) {
    const error: AxiosError = err;
    yield put(PatientMedInfoActionCreator.error({ error: error.message }));
  }
}

function* PatientMedInfoWatcher() {
  yield takeEvery(PatientMedInfoActionCreator.load, loadWorker);

  yield takeEvery(PatientMedInfoActionCreator.save, saveWorker);
}

export { PatientMedInfoWatcher };
