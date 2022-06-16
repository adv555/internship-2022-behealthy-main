import { REPOSITORY } from 'src/constants';
import { Education } from './entities/education.entity';

export const educationProvider = {
  provide: REPOSITORY.EDUCATION,
  useValue: Education,
};
