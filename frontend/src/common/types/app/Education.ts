export interface IEducation extends IEducationFormItem {
  id: number;
  family_practitioners_id: number;
}
export interface IEducationFormItem {
  id?: number;
  country: string;
  date_from: string;
  date_to: string;
  university: string;
  speciality: string;
}

export interface IEducationPayload {
  data: IEducationFormItem[];
  practitionerId: number | undefined;
}

export interface ISubmitEducation extends IEducationFormItem {
  family_practitioners_id: number | undefined;
}

export interface EducationFormProps {
  educationList: IEducationFormItem[];
}

export interface IEducationState {
  isEducationLoaded: boolean;
  items: IEducation[];
  educationList: IEducation[];
  educationLoadError: string | null;
  isLoading: boolean;
  selected: IEducation | null;
  error: string | null;
}
