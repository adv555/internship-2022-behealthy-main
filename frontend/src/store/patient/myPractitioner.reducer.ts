import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReducerName } from 'common/enums/app/reducer-name.enum';
import { PractitionerInitialState } from './types';

const initialState: PractitionerInitialState = {
  practitioners: [],
  isSubmitting: false,
  submittingError: null,
};

const { reducer, actions } = createSlice({
  name: ReducerName.MY_PRACTITIONER,
  initialState,
  reducers: {
    startSubmitting: (state) => ({
      ...state,
      isSubmitting: true,
      submittingError: undefined,
    }),
    submittingSuccess: (state, action) => ({
      ...state,
      practitioners: action.payload,
      isSubmitting: false,
    }),
    submitPractitionerSuccess: (state, action) => ({
      ...state,
      practitioner: action.payload,
      isSubmitting: false,
    }),
    submittingFailure: (state, action: PayloadAction<{ error: string }>) => ({
      ...state,
      submittingError: action.payload.error,
      isSubmitting: false,
    }),
  },
});

const MyPractitionerActionCreators = {
  ...actions,
  getPractitioners: createAction('GET_PRACTITIONERS'),
  getPractitionerById: createAction('GET_PRACTITIONER_BY_ID', (data) => ({
    payload: data,
  })),
};

export { MyPractitionerActionCreators, reducer };
