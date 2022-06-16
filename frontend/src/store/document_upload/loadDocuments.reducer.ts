import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReducerName } from "common/enums/app/reducer-name.enum";

export interface DocumentsData {
  id: number;
  scan: string;
  type: string;
  user_id: number;
}

interface DocumentsState {
  isDocumentsLoaded: boolean,
  documentsLoadError: null | string, 
  documentsData: DocumentsData[]
}

const initialState: DocumentsState = {
  isDocumentsLoaded: false,
  documentsLoadError: null,
  documentsData: []
}

const { reducer, actions } = createSlice({
  name: ReducerName.LOAD_DOCUMENTS,
  initialState,
  reducers: {
    loadDocumentsSuccess: (state, action: PayloadAction<{ documents: DocumentsData[] }>) => ({
      ...state,
      documentsData: action.payload.documents,
      isDocumentsLoaded: true
    }),
    loadDocumentsError: (state, action: PayloadAction<{ error: string }>) => ({
      ...state,
      isDocumentsLoaded: false,
      documentsLoadError: action.payload.error
    })
  }
})

const DocumentsActionCreator = {
  ...actions,
  loadDocumentsData: createAction('LOAD_DOCUMENTS_DATA', (data) => ({
    payload: data
  }))
}

export {DocumentsActionCreator, reducer}