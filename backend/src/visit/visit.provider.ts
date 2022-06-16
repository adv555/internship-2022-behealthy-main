import { REPOSITORY } from 'src/constants';
import { Visit } from './entities/visit.entity';

export const visitProvider = {
  provide: REPOSITORY.VISIT,
  useValue: Visit,
};
