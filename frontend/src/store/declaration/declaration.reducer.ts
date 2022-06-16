import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReducerName } from 'common/enums/app/reducer-name.enum';
import {
  IDeclaration,
  IDeclarationSelect,
  IDeclarationState,
} from 'common/types/app/Declaration.type';

const initialState: IDeclarationState = {
  isBusy: false,
  items: [],
  error: null,
  declaration: null,
  current: null,
};

const { reducer, actions } = createSlice({
  name: ReducerName.DECLARATION,
  initialState,
  reducers: {
    declarationLoadSuccess: (
      state,
      action: PayloadAction<IDeclarationSelect[]>,
    ) => ({
      ...state,
      items: action.payload,
      isBusy: false,
      error: null,
    }),
    declarationStart: (state) => ({
      ...state,
      isBusy: true,
      error: null,
    }),
    declarationEnd: (state) => ({
      ...state,
      isBusy: false,
      error: null,
    }),
    declarationError: (state, action: PayloadAction<{ error: string }>) => ({
      ...state,
      isBusy: false,
      error: action.payload.error,
    }),
    submitDeclarationSuccess: (
      state,
      action: PayloadAction<IDeclaration[]>,
    ) => ({
      ...state,
      declaration: action.payload,
    }),
    setCurrent: (state, action: PayloadAction<IDeclarationSelect>) => ({
      ...state,
      current: action.payload,
    }),
  },
});

const DeclarationActionCreator = {
  ...actions,
  getDeclarationListByStatus: createAction(
    'declaration/getListByStatus',
    (practitionerId: number, status: string) => ({
      payload: { practitionerId, status },
    }),
  ),
  updateDeclaration: createAction(
    'declaration/updateDeclaration',
    (data: IDeclaration) => ({
      payload: data,
    }),
  ),
  postDeclaration: createAction(
    'declaration/postDeclaration',
    (data: IDeclaration) => ({
      payload: data,
    }),
  ),
  getDeclarationByPatientId: createAction(
    'declaration/getDeclarationByPatientId',
    (patientId: number) => ({
      payload: patientId,
    }),
  ),
  getDeclarationById: createAction(
    'declaration/getDeclarationById',
    (id: number) => ({
      payload: id,
    }),
  ),
};

export { DeclarationActionCreator, reducer };
