import { AxiosError, AxiosResponse } from 'axios';
import {
  IPractitioner,
  IPractitionerSubmit,
} from 'common/types/app/Practitioner';

import { call, put, takeEvery } from 'redux-saga/effects';
import { api } from 'services';
import { EducationActionCreator } from 'store/education/education.reducer';
import { ExperienceActionCreator } from 'store/experience/experience.reducer';
import { PractitionerActionCreator } from './practitioner.reducer';
import { PractitionerRegistrationActionCreator } from './practitionerRegistration.reducer';

const submitPractitioner = async (
  values: IPractitionerSubmit,
): Promise<IPractitioner> => {
  return await api.post('/family-practitioner', values);
};

function* registerPractitionerWorker(
  action: ReturnType<
    typeof PractitionerRegistrationActionCreator.registerPractitioner
  >,
) {
  try {
    yield put(PractitionerRegistrationActionCreator.registrationStart());

    const response: AxiosResponse<IPractitioner> = yield call(
      submitPractitioner,
      { ...action.payload.data['personalInfo'].payload! },
    );
    yield put(PractitionerActionCreator.submittingSuccess(response.data));

    const practitioner_id = response.data.id;

    if (action.payload.data['education'].payload !== null)
      yield put(
        EducationActionCreator.submitEducation({
          data: action.payload.data.education.payload,
          practitionerId: practitioner_id,
        }),
      );

    if (action.payload.data['workExperience'].payload !== null)
      yield put(
        ExperienceActionCreator.submitWorkExperience({
          data: action.payload.data['workExperience'].payload,
          practitionerId: practitioner_id,
        }),
      );
  } catch (e) {
    const error = e as Error;
    console.error(error);
    yield put(
      PractitionerRegistrationActionCreator.registrationError({
        error: error.message,
      }),
    );
  }
}

function* practitionerRegistrationWatcher() {
  yield takeEvery(
    PractitionerRegistrationActionCreator.registerPractitioner,
    registerPractitionerWorker,
  );
}

export { practitionerRegistrationWatcher };
