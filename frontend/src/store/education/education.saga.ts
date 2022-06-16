import { AxiosError, AxiosResponse } from 'axios';
import { IEducation, ISubmitEducation } from 'common/types/app/Education';
import { call, put, takeEvery } from 'redux-saga/effects';
import { api } from 'services';
import { EducationActionCreator } from './education.reducer';

const getEducationList = async (id: number): Promise<IEducation[]> => {
  const educationList = await api.get(`/education/all/${id}`);
  return educationList.data;
};

const updateEducation = async (data: IEducation[]): Promise<IEducation[]> => {
  for (let item of data) {
    if (item.id) {
      await api.put(`/education/${item.id}`, item);
    } else {
      await api.post(`/education`, item);
    }
  }

  return data;
};
const submitEducation = async (data: ISubmitEducation) => {
  return await api.post('/education', data);
};
const removeEducation = async (id: number) => {
  await api.delete(`/education/${id}`);
};

function* GetEducationWorker(
  action: ReturnType<typeof EducationActionCreator.getEducation>,
) {
  try {
    const educationList: IEducation[] = yield call(
      getEducationList,
      action.payload,
    );

    yield put(
      EducationActionCreator.educationLoadSuccess({
        data: educationList,
      }),
    );
  } catch (err: any) {
    const error: AxiosError = err;
    yield put(
      EducationActionCreator.educationLoadError({
        error: error.message,
      }),
    );
  }
}

function* UpdateEducationWorker(
  action: ReturnType<typeof EducationActionCreator.updateEducation>,
) {
  try {
    const educationList: IEducation[] = yield call(
      updateEducation,
      action.payload,
    );

    yield put(
      EducationActionCreator.educationLoadSuccess({
        data: educationList,
      }),
    );
  } catch (err: any) {
    const error: AxiosError = err;
    yield put(
      EducationActionCreator.educationLoadError({
        error: error.message,
      }),
    );
  }
}
function* submitEducationWorker(
  action: ReturnType<typeof EducationActionCreator.submitEducation>,
) {
  try {
    yield put(EducationActionCreator.startSubmitting());

    for (const el of action.payload.data) {
      const response: AxiosResponse<IEducation> = yield call(submitEducation, {
        ...el,
        family_practitioners_id: action.payload.practitionerId,
      });

      yield put(EducationActionCreator.submittingSuccess(response.data));
    }
  } catch (e) {
    const error = e as Error;
    console.error(error);
    yield put(
      EducationActionCreator.submittingFailure({ error: error.message }),
    );
  }
}

function* RemoveEducationWorker(
  action: ReturnType<typeof EducationActionCreator.removeEducation>,
) {
  try {
    yield call(removeEducation, action.payload);
  } catch (err: any) {
    const error: AxiosError = err;
    yield put(
      EducationActionCreator.educationLoadError({
        error: error.message,
      }),
    );
  }
}

function* EducationWatcher() {
  yield takeEvery(EducationActionCreator.getEducation, GetEducationWorker);
  yield takeEvery(
    EducationActionCreator.updateEducation,
    UpdateEducationWorker,
  );
  yield takeEvery(
    EducationActionCreator.submitEducation,
    submitEducationWorker,
  );

  yield takeEvery(
    EducationActionCreator.removeEducation,
    RemoveEducationWorker,
  );
}

export { EducationWatcher };
