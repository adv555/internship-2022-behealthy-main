import * as Yup from 'yup';

export const PatientMedInfoSchema = Yup.object({
  blood_type: Yup.string()
    .oneOf([
      'A RhD positive (A+)',
      'A RhD negative (A-)',
      'B RhD positive (B+)',
      'B RhD negative (B-)',
      'O RhD positive (O+)',
      'O RhD negative (O-)',
      'AB RhD positive (AB+)',
      'AB RhD negative (AB-)',
    ])
    .required('Required'),

  injuries: Yup.array().of(Yup.string().min(3).max(100).notOneOf(['<', '>'])),

  cardio: Yup.string()
    .max(1000, 'should be of maximum 1000 characters length')
    .notOneOf(['<', '>'])
    .required(),
  diabetes: Yup.string()
    .oneOf([
      'No diabetes',
      'Type 1',
      'Type 2',
      'Gestational diabetes (diabetes while pregnant)',
    ])
    .required('Required'),

  asthma: Yup.string()
    .oneOf([
      'No asthma',
      'Non-allergic asthma',
      'Cough-variant asthma',
      'Allergic asthma',
    ])
    .required('Required'),

  viral_hepatitis: Yup.string()
    .oneOf([
      'No hepatitis',
      'Hepatitis-A',
      'Hepatitis-B',
      'Hepatitis-C',
      'Hepatitis-E',
    ])
    .required('Required'),

  allergies: Yup.array().of(Yup.string().min(3).max(100).notOneOf(['<', '>'])),

  drug_intolerance: Yup.array().of(
    Yup.string().min(3).max(100).notOneOf(['<', '>']),
  ),

  aids: Yup.string().oneOf(['No HIV/AIDS', 'HIV-1', 'HIV-2']),
});
