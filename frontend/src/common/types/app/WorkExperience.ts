export interface IWorkExperience extends IWorkExperienceFormItem {
  id: number;
  family_practitioner_id: number;
}
export interface IWorkExperienceFormItem {
  country: string;
  date_from: string;
  date_to: string | null;
  clinic_name: string;
  clinic_type: string;
  clinic_address: string;
  phone: string;
  position: string;
}

export interface IWorkExperiencePayload {
  data: IWorkExperienceFormItem[];
  practitionerId: number | undefined;
}

export interface ISubmitWorkExperience extends IWorkExperienceFormItem {
  family_practitioner_id: number | undefined;
}

export interface WorkExperienceFormProps {
  workExperienceList: IWorkExperienceFormItem[];
}
export interface IWorkExperienceState {
  isExperienceLoaded: boolean;
  experienceList: IWorkExperience[];
  experienceLoadError: string | null;
  items: IWorkExperience[];
  isLoading: boolean;
  error: string | null;
  selected: IWorkExperience | null;
}
