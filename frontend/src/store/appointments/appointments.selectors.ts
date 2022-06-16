import { IAppointment } from './types';

export const getAppointmentsList = (state: {
  appointments: { appointments: any };
}) => state.appointments.appointments;

export const getPractitionerAppointmentsList = (state: {
  appointments: { appointments: { practitioner_appointments_list: any } };
}) => state.appointments.appointments.practitioner_appointments_list;
