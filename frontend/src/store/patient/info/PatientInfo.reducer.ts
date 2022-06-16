import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReducerName } from 'common/enums/app/reducer-name.enum';
import { PatientInfo } from 'common/types/PatientInfo';

const NAME = ReducerName.PATIENT_INFO;

type PatientInfoState = {
  isLoaded: boolean;
  isSaved: boolean;
  error: string | null;
  data: PatientInfo | null;
};

const initialState: PatientInfoState = {
  isLoaded: false,
  isSaved: false,
  error: null,
  data: null,
};

const { reducer, actions } = createSlice({
  name: NAME,
  initialState,
  reducers: {
    loadingSuccess: (state, action: PayloadAction<{ data: PatientInfo }>) => ({
      ...state,
      isLoaded: true,
      error: null,
      data: action.payload.data,
    }),
    savingSuccess: (state, action: PayloadAction<{ data: PatientInfo }>) => ({
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

const PatientInfoActionCreator = {
  ...actions,
  load: createAction(`LOAD_${NAME}`, (data) => ({
    payload: data,
  })),
  save: createAction(`SAVE_${NAME}`, (data) => ({
    payload: data,
  })),
  update: createAction(`UPDATE_${NAME}`, (data) => ({
    payload: data,
  })),
};

export { reducer, PatientInfoActionCreator };
