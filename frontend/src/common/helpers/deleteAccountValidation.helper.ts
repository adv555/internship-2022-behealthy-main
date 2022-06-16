import * as Yup from 'yup';

export const deleteAccountValidation = Yup.object().shape({
  currentPassword: Yup.string().required('Current password cannot be empty'),
  confirmCurrentPassword: Yup.string()
    .required('Please, enter your password')
    .oneOf([Yup.ref('currentPassword')], "Passwords aren't the same"),
});
