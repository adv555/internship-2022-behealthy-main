import { REPOSITORY } from 'src/constants';
import { Appointment } from './entities/appointments.entity';

export const appointmentProvider = {
  provide: REPOSITORY.APPOINTMENTS,
  useValue: Appointment,
};
