import { REPOSITORY } from 'src/constants';
import { FamilyPractitioner } from './entities/familyPractitioner';

export const familyPractitionerProvider = {
  provide: REPOSITORY.FAMILY_PRACTITIONER,
  useValue: FamilyPractitioner,
};
