import { PatientContactPerson } from 'common/types/PatientContactPeople';
import { PatientBmi } from 'common/types/PatientBmi';

import { PatientMedInfo } from '../PatientMedInfo';

export interface IPatient {
  id: number;
  user_id: number;
  first_name: string;
  last_name: string;
  gender: string;
  address: string;
  phone: string;
  birthdate: string;
  user: { id: number; avatar: string };
}

export interface IPatientSelect extends IPatient {
  medicalInfo: PatientMedInfo | null;
  bmiInfo: PatientBmi | null;
  contacts: PatientContactPerson[] | null;
}
