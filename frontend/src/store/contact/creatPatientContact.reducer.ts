import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReducerName } from 'common/enums/app/reducer-name.enum';

interface IContact {
  isSubmitting: boolean;
  submittingError?: string | null;
}

const initialState: IContact = {
  isSubmitting: false,
  submittingError: null,
};

const { reducer, actions } = createSlice({
  name: ReducerName.CONTACT,
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

const ContactActionCreators = {
  ...actions,
  submitContactData: createAction('SUBMIT_CONTACT_DATA', (values) => ({
    payload: { values },
  })),
};

export { ContactActionCreators, reducer };
