import { REPOSITORY } from 'src/constants';
import { MedicalInfo } from './entities/medical_info.entity';

export const medicalInfoProvider = {
  provide: REPOSITORY.MEDICAL_INFO,
  useValue: MedicalInfo,
};
