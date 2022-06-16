import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  first_name: Yup.string()
    .required('First name cannot be empty')
    .max(64, 'First name must be less than 64 characters')
    .matches(/^[aA-zZ\s'-]+$/, "First name mustn't have special characters"),
  last_name: Yup.string()
    .required('Last name cannot be empty')
    .max(64, 'Last name must be less than 64 characters')
    .matches(/^[aA-zZ\s'-]+$/, "Last name mustn't have special characters"),
  email: Yup.string()
    .required('Email cannot be empty')
    .email()
    .max(320, 'Email must be less than 320 characters.'),
  birthdate: Yup.string()
    .required('Birthdate cannot be empty')
    .matches(/\d{4}[-]\d{1,2}[-]\d{1,2}/, 'Incorrent date'),
  phone: Yup.string()
    .required('Phone cannot be empty')
    .min(10, 'Phone must be longer than 10 characters')
    .max(13, 'Phone must be less than 13 characters'),
});
