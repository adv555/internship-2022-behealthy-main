import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReducerName } from 'common/enums/app/reducer-name.enum';
import { IPractitionerRegistrationStore } from 'common/types/app/PractitionerRegistration';

const initialState: IPractitionerRegistrationStore = {
  steps: {
    personalInfo: { status: 'unlocked', payload: null },
    verification: { status: 'locked', payload: null },
    education: { status: 'locked', payload: null },
    workExperience: { status: 'locked', payload: null },
  },
  isBusy: false,
  error: null,
};

const { reducer, actions } = createSlice({
  name: ReducerName.PRACTITIONER_REGISTRATION,
  initialState,
  reducers: {
    unlockStep: (state, action: PayloadAction<{ data: string }>) => {
      state.steps[action.payload.data as keyof typeof state.steps].status =
        'unlocked';
    },
    addStepPayload: (
      state,
      action: PayloadAction<{ key: string; data: any }>,
    ) => {
      state.steps[action.payload.key as keyof typeof state.steps].payload =
        action.payload.data;
    },

    registrationSuccess: (state) => ({
      ...state,
      isBusy: false,
    }),
    registrationError: (state, action: PayloadAction<{ error: string }>) => ({
      ...state,
      isBusy: false,
      error: action.payload.error,
    }),

    registrationStart: (state) => ({
      ...state,
      isBusy: true,
      error: null,
    }),
  },
});

const PractitionerRegistrationActionCreator = {
  ...actions,
  registerPractitioner: createAction(
    'practitioner/register',
    (data: IPractitionerRegistrationStore['steps']) => ({
      payload: { data },
    }),
  ),
};

export { PractitionerRegistrationActionCreator, reducer };
