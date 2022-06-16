import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReducerName } from 'common/enums/app/reducer-name.enum';

interface LoginState {
  userEmail: string;
  isLoggedIn: boolean;
  loginError: string | null;
}

const initialState: LoginState = {
  userEmail: '',
  isLoggedIn: false,
  loginError: null,
};

const { reducer, actions } = createSlice({
  name: ReducerName.LOGIN,
  initialState,
  reducers: {
    successLogin: (state, action: PayloadAction<{ email: string }>) => ({
      ...state,
      isLoggedIn: true,
      userEmail: action.payload.email,
      loginError: null,
    }),
    errorLogin: (state, action: PayloadAction<{ error: string }>) => ({
      ...state,
      isLoggedIn: false,
      userEmail: '',
      loginError: action.payload.error,
    }),
    logoutSuccess: (state) => ({
      ...state,
      isLoggedIn: false,
      userEmail: '',
    }),
  },
});

const LoginActionCreator = {
  ...actions,
  login: createAction('LOGIN', (data) => ({
    payload: data,
  })),
  googleLogin: createAction('GOOGLE'),
  logout: createAction('LOGOUT'),
  signUpLogin: createAction('SIGN_UP_LOGIN', (data) => ({
    payload: data,
  })),
};

export { reducer, LoginActionCreator };
