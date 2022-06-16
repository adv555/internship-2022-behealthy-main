import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReducerName } from 'common/enums/app/reducer-name.enum';
import {
  IEducation,
  IEducationPayload,
  IEducationState,
} from 'common/types/app/Education';

const initialState: IEducationState = {
  isEducationLoaded: false,
  items: [],
  educationLoadError: null,
  isLoading: false,
  selected: null,
  error: null,
  educationList: [],
};

const { reducer, actions } = createSlice({
  name: ReducerName.EDUCATION,
  initialState,
  reducers: {
    educationLoadSuccess: (
      state,
      action: PayloadAction<{ data: IEducation[] }>,
    ) => ({
      ...state,
      isEducationLoaded: true,
      educationList: action.payload.data,
      educationLoadError: null,
    }),
    updateEducationData: (
      state,
      action: PayloadAction<{ data: IEducation[] }>,
    ) => ({
      ...state,
      educationList: action.payload.data,
      educationLoadError: null,
    }),
    educationLoadError: (state, action: PayloadAction<{ error: string }>) => ({
      ...state,
      educationLoadError: action.payload.error,
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

const EducationActionCreator = {
  ...actions,
  getEducation: createAction('GET_EDUCATION', (data) => ({
    payload: data,
  })),
  updateEducation: createAction('UPDATE_EDUCATION', (data) => ({
    payload: data,
  })),
  removeEducation: createAction('REMOVE_EDUCATION', (data) => ({
    payload: data,
  })),
  submitEducation: createAction(
    'education/submit',
    (data: IEducationPayload) => ({
      payload: data,
    }),
  ),
};

export { EducationActionCreator, reducer };
