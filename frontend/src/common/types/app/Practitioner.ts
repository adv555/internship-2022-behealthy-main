export interface IPractitioner extends PractitionerInfoFormProps {
  id: number;
  user_id: number;
  user: { id: number; avatar: string };
}
export interface IPractitionerSubmit extends PractitionerInfoFormProps {
  user_id: number | null;
}

export interface PractitionerInfoFormProps {
  first_name: string;
  last_name: string;
  gender: string;
  birthdate: string;
  phone: string;
}

export interface PractitionerState {
  isLoaded: boolean;
  practitionerError: null | string;
  data: IPractitioner | null;
  items: IPractitioner[];
  selected: IPractitioner | null;
  isLoading: boolean;
}
