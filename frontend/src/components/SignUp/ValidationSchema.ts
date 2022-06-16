import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  email: yup
    .string()
    .max(320, 'Email should contain maximum 320 symbols')
    .email()
    .required('Required'),
  password: yup
    .string()
    .matches(new RegExp('[0-9]', 'g'), 'Password should contain numbers')
    .matches(
      new RegExp('[a-z]', 'g'),
      'Password should contain lower case letters',
    )
    .matches(
      new RegExp('[A-Z]', 'g'),
      'Password should contain upper case letters',
    )
    .matches(
      new RegExp('[*.!@#$%^&(){}\\[\\]:;<>,?/~_+=|]', 'g'),
      'Password should contain special characters',
    )
    .min(8, 'Password should contain minimum 8 symbols')
    .max(64, 'Password should contain maximum 64 symbols')
    .required('Required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], "Passwords aren't the same")
    .required('Required'),
});
