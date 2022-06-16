import * as Yup from 'yup';

export const newMessageValidationSchema = Yup.object().shape({
  message: Yup.string().required('Message have not to be empty'),
});
