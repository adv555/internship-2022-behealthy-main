import * as Yup from 'yup';

export const emailValidateSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .required('Required field')
    .max(320, 'Email must be less than 320 characters'),
});
