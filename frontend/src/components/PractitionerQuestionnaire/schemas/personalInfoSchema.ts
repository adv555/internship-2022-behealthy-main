import * as Yup from 'yup';

import 'yup-phone';

export const PersonalInfoSchema = Yup.object({
  first_name: Yup.string()
    .max(64, 'Must be 64 characters or less')
    .matches(
      /^[a-zA-ZА-ЯҐЄІЇа-яієїґ0-9\s'-]+$/,
      ' not allowed special symbols except space and dash ',
    )
    .required('Required'),

  last_name: Yup.string()
    .max(64, 'Must be 64 characters or less')
    .matches(
      /^[a-zA-ZА-ЯҐЄІЇа-яієїґ0-9\s'-]+$/,
      ' not allowed special symbols except space and dash ',
    )
    .required('Required'),

  gender: Yup.string().oneOf(['Male', 'Female', 'Other']).required('Required'),

  birthdate: Yup.date()
    .min(new Date().getFullYear() - 122)
    .max(new Date().getFullYear() - 18)
    .typeError('Age must be between 18 and 122 years')
    .required('Required'),

  phone: Yup.string()
    .phone('UA', true, 'Must be a valid UA phone number')
    .required('Required'),
});
