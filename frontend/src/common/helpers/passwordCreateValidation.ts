import * as Yup from 'yup';

export const CreatePasswordSchema = Yup.object().shape({
  newPassword: Yup.string()
    .required('Please, enter your password')
    .matches(new RegExp('[0-9]', 'g'), 'Password should contain numbers')
    .matches(new RegExp('[A-Za-z]', 'g'), 'Password should contain letters')
    .matches(
      new RegExp('[*.!@#$%^&(){}\\[\\]:;<>,?/~_+=|]', 'g'),
      'Password should contain special characters',
    )
    .min(8, 'Password should contain minimum 8 symbols')
    .max(64, 'Password should contain maximum 64 symbols'),
  confirmNewPassword: Yup.string()
    .required('Please, enter your password')
    .oneOf([Yup.ref('newPassword')], "Passwords aren't the same"),
});
