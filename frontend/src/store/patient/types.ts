import { IPatientSelect } from './../../common/types/app/Patient.type';
import { IEducation } from 'common/types/app/Education';
import { IWorkExperienceFormItem } from 'common/types/app/WorkExperience';
import { IDeclaration } from '../../common/types/app/Declaration.type';
export interface IPatient {
  id?: number;
  user_id?: number;
  first_name?: string;
  last_name?: string;
  gender?: string;
  address?: string;
  phone?: string;
  birthdate?: string;
  declarations?: IDeclaration[];
}
export interface IPractitioner {
  id: number;
  user_id: number;
  first_name: string;
  last_name: string;
  gender: string;
  phone: string;
  birthdate: string;
  workExperience: IWorkExperienceFormItem[];
  education: IEducation[];
  user: { id: number; avatar: string };
}

export interface PatientInitialState {
  isSubmitting: boolean;
  submittingError?: string | null;
  data: IPatient | null;
  current: IPatientSelect | null;
}

export interface PractitionerInitialState {
  practitioners?: IPractitioner[] | [];
  practitioner?: IPractitioner | [];
  isSubmitting: boolean;
  submittingError?: string | null;
}

export interface IAvatar {
  id: number;
  avatar: string;
}

export interface IPractitionerFullData {
  id: number;
  first_name: string;
  last_name: string;
  birthdate: string;
  avatar: string | any;
  clinicAddress: string;
  experience: number;
  workExperience: IWorkExperienceFormItem[] | any;
  declaration?: any;
  phone: string;
}
