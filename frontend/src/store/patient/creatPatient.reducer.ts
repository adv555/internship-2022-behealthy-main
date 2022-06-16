import { IPatientSelect } from './../../common/types/app/Patient.type';
import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReducerName } from 'common/enums/app/reducer-name.enum';
import { IPatient, PatientInitialState } from './types';

const initialState: PatientInitialState = {
  isSubmitting: false,
  submittingError: null,
  data: null,
  current: null,
};

const { reducer, actions } = createSlice({
  name: ReducerName.PATIENT,
  initialState,
  reducers: {
    startSubmitting: (state) => ({
      ...state,
      isSubmitting: true,
      submittingError: undefined,
    }),
    submittingSuccess: (state) => ({
      ...state,
      isSubmitting: false,
    }),
    submittingFailure: (state, action: PayloadAction<{ error: string }>) => ({
      ...state,
      submittingError: action.payload.error,
    }),
    setPatientData: (state, action: PayloadAction<IPatient>) => ({
      ...state,
      data: action.payload,
    }),
    setCurrentPatientData: (state, action: PayloadAction<IPatientSelect>) => ({
      ...state,
      current: action.payload,
    }),
  },
});

const PatientActionCreators = {
  ...actions,
  submitPatientData: createAction('SUBMIT_PATIENT_DATA', (values) => ({
    payload: { values },
  })),
  getPatientData: createAction('GET_PATIENT_DATA', (data) => ({
    payload: data,
  })),
  getPatientByPatientId: createAction(
    'patient/getPatientByPatientId',
    (patientId: number) => ({
      payload: patientId,
    }),
  ),
};

export { PatientActionCreators, reducer };
