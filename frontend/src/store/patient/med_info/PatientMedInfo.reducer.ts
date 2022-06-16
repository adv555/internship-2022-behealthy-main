import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReducerName } from 'common/enums/app/reducer-name.enum';
import { PatientMedInfo } from 'common/types/PatientMedInfo';

const NAME = ReducerName.PATIENT_MED_INFO;

type PatientMedInfoState = {
  isLoaded: boolean;
  isSaved: boolean;
  error: string | null;
  data: PatientMedInfo | null;
};

const initialState: PatientMedInfoState = {
  isLoaded: false,
  isSaved: false,
  error: null,
  data: null,
};

const { reducer, actions } = createSlice({
  name: NAME,
  initialState,
  reducers: {
    loadingSuccess: (
      state,
      action: PayloadAction<{ data: PatientMedInfo }>,
    ) => ({
      ...state,
      isLoaded: true,
      error: null,
      data: action.payload.data,
    }),
    savingSuccess: (
      state,
      action: PayloadAction<{ data: PatientMedInfo }>,
    ) => ({
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

const PatientMedInfoActionCreator = {
  ...actions,
  load: createAction(`LOAD_${NAME}`, (data) => ({
    payload: data,
  })),
  save: createAction(`SAVE_${NAME}`, (data) => ({
    payload: data,
  })),
};

export { reducer, PatientMedInfoActionCreator };
