import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReducerName } from 'common/enums/app/reducer-name.enum';
import { PatientBmi } from 'common/types/PatientBmi';

const NAME = ReducerName.PATIENT_BMI;

type PatientBmiState = {
  isLoaded: boolean;
  isSaved: boolean;
  error: string | null;
  data: PatientBmi | null;
};

const initialState: PatientBmiState = {
  isLoaded: false,
  isSaved: false,
  error: null,
  data: null,
};

const { reducer, actions } = createSlice({
  name: NAME,
  initialState,
  reducers: {
    loadingSuccess: (state, action: PayloadAction<{ data: PatientBmi }>) => ({
      ...state,
      isLoaded: true,
      error: null,
      data: action.payload.data,
    }),
    savingSuccess: (state, action: PayloadAction<{ data: PatientBmi }>) => ({
      ...state,
      isSaved: true,
      error: null,
      data: action.payload.data,
    }),
    error: (state, action: PayloadAction<{ error: string }>) => ({
      ...state,
      error: action.payload.error,
    }),
  },
});

const PatientBmiActionCreator = {
  ...actions,
  load: createAction(`LOAD_${NAME}`, (data) => ({
    payload: data,
  })),
  save: createAction(`SAVE_${NAME}`, (data) => ({
    payload: data,
  })),
};

export { reducer, PatientBmiActionCreator };
