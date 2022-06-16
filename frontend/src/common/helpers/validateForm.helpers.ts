import * as Yup from 'yup';

export const SignIpSchema = Yup.object().shape({
  email: Yup.string()
    .required('Please, enter your email address')
    .max(320, 'Your email must be less than 320 characters'),
  password: Yup.string()
    .required('Please, enter your password')
    .max(256, 'You password must be less than 255 characters'),
});
