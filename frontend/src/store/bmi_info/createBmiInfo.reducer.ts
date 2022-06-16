import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReducerName } from 'common/enums/app/reducer-name.enum';

export interface IBmiInfo {
  isSubmitting: boolean;
  submittingError?: string | null;
}

const initialState: IBmiInfo = {
  isSubmitting: false,
  submittingError: null,
};

const { reducer, actions } = createSlice({
  name: ReducerName.BMI_INFO,
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

const BmiInfoActionCreators = {
  ...actions,
  submitBmiInfoData: createAction('SUBMIT_BMI_INFO_DATA', (values) => ({
    payload: { values },
  })),
};

export { BmiInfoActionCreators, reducer };
