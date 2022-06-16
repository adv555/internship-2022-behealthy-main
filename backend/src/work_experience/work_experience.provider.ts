import { REPOSITORY } from 'src/constants';
import { WorkExperience } from './entities/work_experience.entity';

export const workExperienceProvider = {
  provide: REPOSITORY.WORK_EXPERIENCE,
  useValue: WorkExperience,
};
