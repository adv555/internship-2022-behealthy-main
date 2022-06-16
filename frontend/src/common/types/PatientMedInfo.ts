export type PatientMedInfo = {
  id: number;
  patient_id: number;
  blood_type: string | null;
  injuries: string[];
  cardio: string;
  diabetes: string | null;
  asthma: string | null;
  viral_hepatitis: string | null;
  allergies: string[];
  drug_intolerance: string[];
  aids: string | null;
};
