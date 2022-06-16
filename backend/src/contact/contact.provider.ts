import { REPOSITORY } from 'src/constants';
import { Contact } from './entities/contact.entity';

export const contactProvider = {
  provide: REPOSITORY.CONTACT,
  useValue: Contact,
};
