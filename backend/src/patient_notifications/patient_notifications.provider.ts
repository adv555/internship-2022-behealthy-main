import { REPOSITORY } from 'src/constants';
import { PatientNotifications } from './entities/patient_notifications.entity';

export const patientNotificationsProvider = {
  provide: REPOSITORY.NOTIFICATION_SETTINGS,
  useValue: PatientNotifications,
};
