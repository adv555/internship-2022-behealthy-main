import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReducerName } from 'common/enums/app/reducer-name.enum';

interface SignUpState {
  signUpDone: boolean;
  signUpError: string | null;
}

const initialState: SignUpState = {
  signUpDone: false,
  signUpError: null,
};

const { reducer, actions } = createSlice({
  name: ReducerName.SIGN_UP,
  initialState,
  reducers: {
    successSignUp: (state) => ({
      ...state,
      signUpDone: true,
      signUpError: null,
    }),
    errorSignUp: (state, action: PayloadAction<{ error: string }>) => ({
      ...state,
      signUpDone: false,
      signUpError: action.payload.error,
    }),
  },
});

const SignUpActionCreator = {
  ...actions,
  signUp: createAction('SIGN_UP', (data) => ({
    payload: data,
  })),
};

export { reducer, SignUpActionCreator };
