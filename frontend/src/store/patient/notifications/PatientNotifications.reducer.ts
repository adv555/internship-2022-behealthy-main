import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReducerName } from 'common/enums/app/reducer-name.enum';
import { PatientNotifications } from 'common/types/PatientNotifications';

const NAME = ReducerName.PATIENT_NOTIFICATIONS;

type PatientNotificationsState = {
  isLoaded: boolean;
  isSaved: boolean;
  error: string | null;
  data: PatientNotifications | null;
};

const initialState: PatientNotificationsState = {
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
      action: PayloadAction<{ data: PatientNotifications }>,
    ) => ({
      ...state,
      isLoaded: true,
      error: null,
      data: action.payload.data,
    }),
    savingSuccess: (
      state,
      action: PayloadAction<{ data: PatientNotifications }>,
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

const PatientNotificationsActionCreator = {
  ...actions,
  load: createAction(`LOAD_${NAME}`, (data) => ({
    payload: data,
  })),
  save: createAction(`SAVE_${NAME}`, (data) => ({
    payload: data,
  })),
};

export { reducer, PatientNotificationsActionCreator };
