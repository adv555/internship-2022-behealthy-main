import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReducerName } from 'common/enums/app/reducer-name.enum';
import {
  IPractitioner,
  PractitionerState,
} from 'common/types/app/Practitioner';

const initialState: PractitionerState = {
  isLoaded: false,
  practitionerError: null,
  data: null,
  items: [],
  selected: null,
  isLoading: false,
};

const { reducer, actions } = createSlice({
  name: ReducerName.PRACTITIONER,
  initialState,
  reducers: {
    loadPractitionerSuccess: (
      state,
      action: PayloadAction<{ data: IPractitioner }>,
    ) => ({
      ...state,
      isLoaded: true,
      data: action.payload.data,
    }),
    loadPractitionerError: (
      state,
      action: PayloadAction<{ error: string }>,
    ) => ({
      ...state,
      isLoaded: false,
      practitionerError: action.payload.error,
    }),
    updatePractitionerData: (
      state,
      action: PayloadAction<{ data: IPractitioner }>,
    ) => ({
      ...state,
      data: action.payload.data,
    }),

    startSubmitting: (state) => ({
      ...state,
      isLoading: true,
      error: null,
    }),
    submittingSuccess: (state, action) => ({
      ...state,
      isLoading: false,
      selected: action.payload,
    }),
    submittingFailure: (state, action: PayloadAction<{ error: string }>) => ({
      ...state,
      isLoading: false,
      error: action.payload.error,
    }),
  },
});

const PractitionerActionCreator = {
  ...actions,
  getPractitionerData: createAction('GET_PRACTITIONER_DATA', (data) => ({
    payload: data,
  })),
  getPractitionerById: createAction('GET_PRACTITIONER_BY_ID', (data) => ({
    payload: data,
  })),

  updatePractitionerData: createAction('UPDATE_PRACTITIONER_DATA', (data) => ({
    payload: data,
  })),
  submitPractitioner: createAction('practitioners/submit', (data) => ({
    payload: { data },
  })),
  removePractitionerData: createAction('REMOVE_PRACTITIONER_DATA', (data) => ({
    payload: data,
  })),
};

export { PractitionerActionCreator, reducer };
