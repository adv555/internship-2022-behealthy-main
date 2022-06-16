import { IEducationFormItem } from './Education';
import { IPractitionerSubmit } from './Practitioner';
import { IWorkExperienceFormItem } from './WorkExperience';

export interface IPractitionerRegistrationStore {
  steps: {
    personalInfo: {
      status: string;
      payload: IPractitionerSubmit | null;
    };
    verification: { status: string; payload: {} | null };
    education: { status: string; payload: IEducationFormItem[] | null };
    workExperience: {
      status: string;
      payload: IWorkExperienceFormItem[] | null;
    };
  };

  isBusy: boolean;
  error: null | string;
}
