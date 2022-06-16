import { REPOSITORY } from 'src/constants';
import { Relatives } from './entities/relatives.entity';

export const relativesProvider = {
  provide: REPOSITORY.RELATIVES,
  useValue: Relatives,
};
