import { REPOSITORY } from 'src/constants';
import { Insurance } from './entities/insurance.entity';

export const insuranceProvider = {
  provide: REPOSITORY.INSURANCE,
  useValue: Insurance,
};
