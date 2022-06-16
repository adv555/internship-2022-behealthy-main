export type ProfileInfo = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender: string;
  birthdate: string;
  user_id: number;
};

export type PatientInfo = ProfileInfo;

export type PractitionerInfo = ProfileInfo;
