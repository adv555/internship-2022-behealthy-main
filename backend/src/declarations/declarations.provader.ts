import { REPOSITORY } from 'src/constants';
import { Declarations } from 'src/declarations/entities/declarations.entity';

export const declarationsProvider = {
  provide: REPOSITORY.DECLARATIONS,
  useValue: Declarations,
};
