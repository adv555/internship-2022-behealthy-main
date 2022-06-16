import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReducerName } from 'common/enums/app/reducer-name.enum';

export interface NotificationSettings {
  id: number;
  upcoming_visits: boolean;
  cancel_declaration: boolean;
  user_id: number;
}

export interface UpdatedNotificationSettings {
  upcoming_visits?: boolean;
  cancel_declaration?: boolean;
}

interface NotificationSettingsState {
  isLoaded: boolean;
  settingsError: null | string;
  settings: NotificationSettings | null;
}

const initialState: NotificationSettingsState = {
  isLoaded: false,
  settingsError: null,
  settings: null,
};

const { reducer, actions } = createSlice({
  name: ReducerName.NOTIFICATION_SETTINGS,
  initialState,
  reducers: {
    loadSettingsSuccess: (
      state,
      action: PayloadAction<{ settings: NotificationSettings }>,
    ) => ({
      ...state,
      isLoaded: true,
      settingsError: null,
      settings: action.payload.settings,
    }),
    loadSettingsError: (state, action: PayloadAction<{ error: string }>) => ({
      ...state,
      isLoaded: false,
      settingsError: action.payload.error,
    }),
  },
});

const NotificationSettingsActionCreator = {
  ...actions,
  loadSettings: createAction('GET_SETTINGS', (data) => ({
    payload: data,
  })),
  updateSettings: createAction('UPDATE_SETTINGS', (data) => ({
    payload: data,
  })),
  removeSettings: createAction('REMOVE_SETTINGS', (data) => ({
    payload: data,
  })),
};

export { NotificationSettingsActionCreator, reducer };
