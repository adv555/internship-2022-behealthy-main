import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReducerName } from 'common/enums/app/reducer-name.enum';

export interface IDocumentInfo {
  isSubmitting: boolean;
  submittingError?: string | null;
}

const initialState: IDocumentInfo = {
  isSubmitting: false,
  submittingError: null,
};

const { reducer, actions } = createSlice({
  name: ReducerName.DOCUMENT_UPLOAD,
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

const DocumentInfoActionCreators = {
  ...actions,
  submitDocumentsData: createAction('SUBMIT_DOCUMENTS_DATA', (values) => ({
    payload: { values },
  })),
};

export { DocumentInfoActionCreators, reducer };
