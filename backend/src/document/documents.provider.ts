import { REPOSITORY } from 'src/constants';
import { Documents } from './entities/documents.entity';

export const documentsProvider = {
  provide: REPOSITORY.DOCUMENTS,
  useValue: Documents,
};
