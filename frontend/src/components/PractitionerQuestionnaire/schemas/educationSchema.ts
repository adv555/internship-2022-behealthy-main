import * as Yup from 'yup';

export const educationSchema = Yup.object({
  educationList: Yup.array().of(
    Yup.object({
      country: Yup.string()
        .max(256, 'should be of maximum 256 characters length')
        .required('Required'),
      date_from: Yup.date()
        .typeError('Is not a valid date')
        .min(new Date().getFullYear() - 100)
        .max(new Date().getFullYear())
        .required('Required'),
      date_to: Yup.date()
        .typeError('Is not a valid date')
        .min(new Date().getFullYear() - 100)
        .max(new Date().getFullYear())
        .required('Required'),
      university: Yup.string()
        .max(256, 'should be of maximum 256 characters length')
        .required('Required'),
      speciality: Yup.string()
        .max(256, 'should be of maximum 256 characters length')
        .required('Required'),
    }),
  ),
});
