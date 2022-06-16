import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReducerName } from 'common/enums/app/reducer-name.enum';
import {
  IWorkExperience,
  IWorkExperiencePayload,
  IWorkExperienceState,
} from 'common/types/app/WorkExperience';

const initialState: IWorkExperienceState = {
  items: [],
  isLoading: false,
  error: null,
  selected: null,
  isExperienceLoaded: false,
  experienceList: [],
  experienceLoadError: null,
};

const { reducer, actions } = createSlice({
  name: ReducerName.WORK_EXPERIENCE,
  initialState,
  reducers: {
    experienceLoadSuccess: (
      state,
      action: PayloadAction<{ data: IWorkExperience[] }>,
    ) => ({
      ...state,
      isExperienceLoaded: true,
      experienceList: action.payload.data,
      experienceLoadError: null,
    }),
    updateExperienceData: (
      state,
      action: PayloadAction<{ data: IWorkExperience[] }>,
    ) => ({
      ...state,
      experienceList: action.payload.data,
      experienceLoadError: null,
    }),
    experienceLoadError: (state, action: PayloadAction<{ error: string }>) => ({
      ...state,
      experienceLoadError: action.payload.error,
    }),
    startSubmitting: (state) => ({
      ...state,
      isLoading: true,
      error: null,
    }),
    submittingSuccess: (state, action) => {
      state.isLoading = false;
      state.items.push(action.payload);
    },
    submittingFailure: (state, action: PayloadAction<{ error: string }>) => ({
      ...state,
      isLoading: false,
      error: action.payload.error,
    }),
  },
});

const ExperienceActionCreator = {
  ...actions,
  getExperience: createAction('GET_EXPERIENCE', (data) => ({
    payload: data,
  })),
  updateExperience: createAction('UPDATE_EXPERIENCE', (data) => ({
    payload: data,
  })),
  removeExperience: createAction('REMOVE_EXPERIENCE', (data) => ({
    payload: data,
  })),
  submitWorkExperience: createAction(
    'workExperience/submit',
    (data: IWorkExperiencePayload) => ({
      payload: data,
    }),
  ),
};

export { ExperienceActionCreator, reducer };
