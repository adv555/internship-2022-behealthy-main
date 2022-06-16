import { REPOSITORY } from 'src/constants';
import { BmiInfo } from './entities/bmi_info.entity';

export const bmiInfoProvider = {
  provide: REPOSITORY.BMI_INFO,
  useValue: BmiInfo,
};
