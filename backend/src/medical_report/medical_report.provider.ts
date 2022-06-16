import { REPOSITORY } from 'src/constants';
import { MedicalReport } from './entities/medical_report.entity';

export const medicalReportProvider = {
  provide: REPOSITORY.MEDICAL_REPORT,
  useValue: MedicalReport,
};
