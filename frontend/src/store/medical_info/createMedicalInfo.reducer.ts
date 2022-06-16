import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReducerName } from 'common/enums/app/reducer-name.enum';

export interface IMedicalInfo {
  isSubmitting: boolean;
  submittingError?: string | null;
}

const initialState: IMedicalInfo = {
  isSubmitting: false,
  submittingError: null,
};

const { reducer, actions } = createSlice({
  name: ReducerName.MEDICAL_INFO,
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
  },
});

const MedicalInfoActionCreators = {
  ...actions,
  submitMedicalInfoData: createAction('SUBMIT_MEDICAL_INFO_DATA', (values) => ({
    payload: { values },
  })),
};

export { MedicalInfoActionCreators, reducer };
