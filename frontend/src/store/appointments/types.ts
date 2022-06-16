import { IDeclaration } from 'common/types/app/Declaration.type';

export interface IAppointment {
  id: number;
  type: string;
  duration: string;
  start_time: string;
  end_time: string;
  declaration_id: number;
  declarations?: IDeclaration;
  family_practitioner_id: number;
  patient_name: string;
}

export interface IAppointmentsState {
  isBusy: boolean;
  error: string | null;
  appointments: IAppointment[];
  practitioner_appointments_list: IAppointment[];
  appointment: IAppointment | null;
  event: IAppointmentEvent | null;
}

export interface IAppointmentEvent {
  id?: number;
  type: string;
  duration: string;
  start_time: string;
  end_time: string;
  declaration_id: number;
}
