import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReducerName } from 'common/enums/app/reducer-name.enum';

export interface UserData {
  id: number;
  email: string;
  role: string;
  google_id: string;
  isActivated: boolean;
  avatar?: string;
}

interface UserState {
  isLoaded: boolean;
  error: null | string;
  data: UserData | null;
  isAvatarSubmiting: boolean;
  updateAvatarError: string | null;
}

const initialState: UserState = {
  isLoaded: false,
  error: null,
  data: null,
  isAvatarSubmiting: false,
  updateAvatarError: null,
};

const { reducer, actions } = createSlice({
  name: ReducerName.USER,
  initialState,
  reducers: {
    loadUserSuccess: (state, action: PayloadAction<{ data: UserData }>) => ({
      ...state,
      data: action.payload.data,
      isLoaded: true,
      error: null,
    }),
    loadUserError: (state, action: PayloadAction<{ error: string }>) => ({
      ...state,
      isLoaded: false,
      data: null,
      error: action.payload.error,
    }),
    removeUserSuccess: (state) => ({
      ...state,
      isLoaded: false,
      data: null,
    }),
    resetUserSuccess: (state) => ({
      ...state,
    }),
    updateUserSuccess: (state, action: PayloadAction<{ data: UserData }>) => ({
      ...state,
      data: action.payload.data,
      isLoaded: true,
      error: null,
    }),

    updateAvatarStarted: (state) => ({
      ...state,
      isAvatarSubmiting: true,
      updateAvatarError: null,
    }),
    updateAvatarFinished: (
      state,
      action: PayloadAction<{ data: UserData }>,
    ) => ({
      ...state,
      data: action.payload.data,
      isAvatarSubmiting: false,
      updateAvatarError: null,
    }),
    updateAvatarError: (state, action: PayloadAction<{ error: string }>) => ({
      ...state,
      isAvatarSubmiting: false,
      updateAvatarError: action.payload.error,
    }),
  },
});

const UserActionCreator = {
  ...actions,
  getUserData: createAction('GET_USER_DATA', (data) => ({
    payload: data,
  })),
  removeUser: createAction('REMOVE_USER_DATA', (data) => ({
    payload: data,
  })),
  updateUser: createAction('UPDATE_USER', (data) => ({
    payload: data,
  })),
  updateUserAvatar: createAction('UPDATE_USER_AVATAR', (data) => ({
    payload: data,
  })),
  logOut: createAction('LOG_OUT'),
  resetUser: createAction('RESET_USER'),
};

export { UserActionCreator, reducer };
