import { REPOSITORY } from 'src/constants';
import { Vaccines } from './entities/vaccines.entity';

export const vaccinesProvider = {
  provide: REPOSITORY.VACCINES,
  useValue: Vaccines,
};
