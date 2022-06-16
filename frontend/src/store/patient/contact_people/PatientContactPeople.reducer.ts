import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReducerName } from 'common/enums/app/reducer-name.enum';
import { PatientContactPeople } from 'common/types/PatientContactPeople';

const NAME = ReducerName.PATIENT_CONTACT_PEOPLE;

type PatientContactPeopleState = {
  isLoaded: boolean;
  isSaved: boolean;
  error: string | null;
  data: PatientContactPeople | null;
};

const initialState: PatientContactPeopleState = {
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
      action: PayloadAction<{ data: PatientContactPeople }>,
    ) => ({
      ...state,
      isLoaded: true,
      error: null,
      data: action.payload.data,
    }),
    savingSuccess: (
      state,
      action: PayloadAction<{ data: PatientContactPeople }>,
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

const PatientContactPeopleActionCreator = {
  ...actions,
  load: createAction(`LOAD_${NAME}`, (data) => ({
    payload: data,
  })),
  save: createAction(`SAVE_${NAME}`, (data) => ({
    payload: data,
  })),
  delete: createAction(`DELETE_${NAME}`, (data) => ({
    payload: data,
  })),
};

export { reducer, PatientContactPeopleActionCreator };
