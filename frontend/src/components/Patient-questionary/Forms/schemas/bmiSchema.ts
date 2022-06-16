import * as Yup from 'yup';

export const BmiSchema = Yup.object({
  height: Yup.number()
    .typeError('Only numbers with range [0-350] cm')
    .min(0, 'Must be greater than 0')
    .max(350, 'Must be less than 350')
    .required('Required'),
  weight: Yup.number()
    .typeError('Only numbers with range [0-700] kg')
    .min(0, 'Must be greater than 0')
    .max(700, 'Must be less than 700')
    .required('Required'),
});
