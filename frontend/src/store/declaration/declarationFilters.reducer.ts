import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReducerName } from 'common/enums/app/reducer-name.enum';

const initialState = {
  filterByName: '',
  filterByGender: '',
  filterByCity: '',
  filterByClinic: '',
  filterByExperience: '',
};

const { reducer, actions } = createSlice({
  name: ReducerName.DECLARATION_FILTERS,
  initialState,
  reducers: {
    setFilterByName: (state, action: PayloadAction<string>) => ({
      ...state,
      filterByName: action.payload,
    }),
    setFilterByGender: (state, action: PayloadAction<string>) => ({
      ...state,
      filterByGender: action.payload,
    }),
    setFilterByCity: (state, action: PayloadAction<string>) => ({
      ...state,
      filterByCity: action.payload,
    }),
    setFilterByClinic: (state, action: PayloadAction<string>) => ({
      ...state,
      filterByClinic: action.payload,
    }),
    setFilterByExperience: (state, action: PayloadAction<string>) => ({
      ...state,
      filterByExperience: action.payload,
    }),
  },
});

const DeclarationFilterActionCreator = {
  ...actions,
};

export { DeclarationFilterActionCreator, reducer };
