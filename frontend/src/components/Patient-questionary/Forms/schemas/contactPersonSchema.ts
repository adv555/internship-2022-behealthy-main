import * as Yup from 'yup';

export const ContactPersonSchema = Yup.object({
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

  phone: Yup.string()
    .matches(/^\+?3?8?(0\d{9})$/, 'Phone number is not valid')
    .required('Required'),

  relation_type: Yup.string()
    .oneOf(['Relative', 'Friend', 'Colleague', 'Parent', 'Other'])
    .required('Required'),
});
