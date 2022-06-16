export type PatientContactPerson = {
  id: number;
  patient_id: number;
  first_name: string;
  last_name: string;
  phone: string;
  relation_type: string | null;
};

export type PatientContactPeople = {
  patient_id: number;
  contacts: PatientContactPerson[];
};
