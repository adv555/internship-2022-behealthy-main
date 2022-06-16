import * as Yup from 'yup';
import 'yup-phone';

export const workExperienceSchema = Yup.object({
  workExperienceList: Yup.array().of(
    Yup.object({
      country: Yup.string().required('Required'),
      date_from: Yup.date()
        .typeError('Is not a valid date')
        .min(new Date().getFullYear() - 100)
        .max(new Date().getFullYear())
        .required('Required'),
      date_to: Yup.date()
        .typeError('Is not a valid date')
        .min(new Date().getFullYear() - 100)
        .max(new Date().getFullYear() + 1)
        .required('Required'),
      clinic_name: Yup.string()
        .max(1000, 'should be of maximum 1000 characters length')
        .notOneOf(['<', '>'])
        .required('Required'),
      clinic_type: Yup.string().required('Required'),
      clinic_address: Yup.string()
        .max(1000, 'should be of maximum 1000 characters length')
        .notOneOf(['<', '>'])
        .required('Required'),
      position: Yup.string().required('Required'),
      phone: Yup.string()
        .phone('UA', true, 'Must be a valid UA phone number')
        .required('Required'),
    }),
  ),
});
