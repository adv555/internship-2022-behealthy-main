import { AxiosError, AxiosResponse } from 'axios';
import {
  ISubmitWorkExperience,
  IWorkExperience,
} from 'common/types/app/WorkExperience';
import { call, put, takeEvery } from 'redux-saga/effects';
import { api } from 'services';
import { ExperienceActionCreator } from './experience.reducer';

const getExperienceList = async (id: number): Promise<IWorkExperience[]> => {
  const experienceList = await api.get(`/work-experience/all/${id}`);
  return experienceList.data;
};
const submitWorkExperience = async (data: ISubmitWorkExperience) => {
  return await api.post('/work-experience', data);
};

const updateExperience = async (
  data: IWorkExperience[],
): Promise<IWorkExperience[]> => {
  for (let item of data) {
    if (item.id) {
      await api.put(`/work-experience/${item.id}`, item);
    } else {
      await api.post(`/work-experience`, item);
    }
  }

  return data;
};

const removeExperience = async (id: number) => {
  await api.delete(`/work-experience/${id}`);
};

function* GetExperienceWorker(
  action: ReturnType<typeof ExperienceActionCreator.getExperience>,
) {
  try {
    const experienceList: IWorkExperience[] = yield call(
      getExperienceList,
      action.payload,
    );

    yield put(
      ExperienceActionCreator.experienceLoadSuccess({
        data: experienceList,
      }),
    );
  } catch (err: any) {
    const error: AxiosError = err;
    yield put(
      ExperienceActionCreator.experienceLoadError({
        error: error.message,
      }),
    );
  }
}

function* UpdateExperienceWorker(
  action: ReturnType<typeof ExperienceActionCreator.updateExperience>,
) {
  try {
    const experienceList: IWorkExperience[] = yield call(
      updateExperience,
      action.payload,
    );

    yield put(
      ExperienceActionCreator.experienceLoadSuccess({
        data: experienceList,
      }),
    );
  } catch (err: any) {
    const error: AxiosError = err;
    yield put(
      ExperienceActionCreator.experienceLoadError({
        error: error.message,
      }),
    );
  }
}
function* submitWorkExperienceWorker(
  action: ReturnType<typeof ExperienceActionCreator.submitWorkExperience>,
) {
  try {
    yield put(ExperienceActionCreator.startSubmitting());

    for (const el of action.payload.data) {
      const response: AxiosResponse<IWorkExperience> = yield call(
        submitWorkExperience,
        {
          ...el,
          family_practitioner_id: action.payload.practitionerId,
        },
      );

      yield put(ExperienceActionCreator.submittingSuccess(response.data));
    }
  } catch (e) {
    const error = e as Error;
    console.error(error);
    yield put(
      ExperienceActionCreator.submittingFailure({ error: error.message }),
    );
  }
}

function* RemoveExperienceWorker(
  action: ReturnType<typeof ExperienceActionCreator.removeExperience>,
) {
  try {
    yield call(removeExperience, action.payload);
  } catch (err: any) {
    const error: AxiosError = err;
    yield put(
      ExperienceActionCreator.experienceLoadError({
        error: error.message,
      }),
    );
  }
}

function* ExperienceWatcher() {
  yield takeEvery(ExperienceActionCreator.getExperience, GetExperienceWorker);
  yield takeEvery(
    ExperienceActionCreator.updateExperience,
    UpdateExperienceWorker,
  );
  yield takeEvery(
    ExperienceActionCreator.submitWorkExperience,
    submitWorkExperienceWorker,
  );

  yield takeEvery(
    ExperienceActionCreator.removeExperience,
    RemoveExperienceWorker,
  );
}

export { ExperienceWatcher };
