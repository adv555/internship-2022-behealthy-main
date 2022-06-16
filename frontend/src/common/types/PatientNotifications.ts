export type PatientNotifications = {
  id: number;
  patient_id: number;
  visits: boolean;
  recommendations: boolean;
  reminders: boolean;
  propositions: boolean;
};
