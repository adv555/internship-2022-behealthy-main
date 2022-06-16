import { REPOSITORY } from 'src/constants';
import { Patient } from './entities/patient.entity';

export const patientProvider = {
  provide: REPOSITORY.PATIENT,
  useValue: Patient,
};
