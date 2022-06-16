import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReducerName } from 'common/enums/app/reducer-name.enum';
import { IAppointment, IAppointmentEvent, IAppointmentsState } from './types';

const initialState: IAppointmentsState = {
  isBusy: false,
  error: null,
  appointments: [],
  practitioner_appointments_list: [],
  appointment: null,
  event: null,
};

const { reducer, actions } = createSlice({
  name: ReducerName.APPOINTMENTS,
  initialState,
  reducers: {
    appointmentsLoadSuccess: (
      state,
      action: PayloadAction<IAppointment[]>,
    ) => ({
      ...state,
      appointments: action.payload,
      isBusy: false,
      error: null,
    }),
    appointmentsStart: (state) => ({
      ...state,
      isBusy: true,
      error: null,
    }),
    appointmentsEnd: (state) => ({
      ...state,
      isBusy: false,
      error: null,
    }),
    appointmentsError: (state, action: PayloadAction<{ error: string }>) => ({
      ...state,
      isBusy: false,
      error: action.payload.error,
    }),
    setAnAppointment: (state, action: PayloadAction<IAppointment>) => ({
      ...state,
      appointment: action.payload,
      isBusy: false,
      error: null,
    }),
    setAnAppointmentEvent: (
      state,
      action: PayloadAction<IAppointmentEvent>,
    ) => ({
      ...state,
      event: action.payload,
      isBusy: false,
      error: null,
    }),
    setPractitionerAppointmentsList: (
      state,
      action: PayloadAction<IAppointment[]>,
    ) => ({
      ...state,
      practitioner_appointments_list: action.payload,
      isBusy: false,
      error: null,
    }),
  },
});

const AppointmentsActionCreator = {
  ...actions,
  postNewAppointment: createAction(
    'appointments/postNewAppointment',
    (appointment: IAppointmentEvent) => ({
      payload: appointment,
    }),
  ),
  getAppointments: createAction('appointments/getAllAppointments'),

  getPractitionerAppointmentsList: createAction(
    'appointments/getPractitionerAppointmentsList',
    (family_practitioner_id: number | any) => ({
      payload: { family_practitioner_id },
    }),
  ),

  getAnAppointment: createAction(
    'appointments/getAnAppointment',
    (declarationId: number) => ({
      payload: {
        declarationId,
      },
    }),
  ),

  updateAppointment: createAction(
    'appointments/updateAppointment',
    (appointment: IAppointmentEvent) => ({
      payload: appointment,
    }),
  ),

  deleteAppointment: createAction(
    'appointments/deleteAppointment',
    (appointmentId: number) => ({
      payload: appointmentId,
    }),
  ),
};

export { AppointmentsActionCreator, reducer };
