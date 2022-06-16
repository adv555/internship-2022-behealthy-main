import { PatientBmi } from 'common/types/PatientBmi';
import { Button } from 'components/common/Button/Button';
import { TextInput } from 'components/common/Input/TextInput';
import { Typography } from 'components/common/Typography';
import { Formik, Form, Field, FormikProps } from 'formik';
import { PatientBmiSchema } from './PatientBMISchema';

export type PatientBmiFormFields = Omit<PatientBmi, 'id' | 'patient_id'>;

export type PatientBmiFormProps = {
  initialValues: PatientBmiFormFields;
  onSubmit: (data: PatientBmiFormFields) => void;
  isSaved: boolean;
  error: string | null;
};

export const PatientBmiForm = ({
  initialValues,
  onSubmit,
  isSaved = false,
  error = null,
}: PatientBmiFormProps) => (
  <Formik
    initialValues={initialValues}
    validationSchema={PatientBmiSchema}
    onSubmit={onSubmit}
  >
    {(props: FormikProps<PatientBmiFormFields>) => {
      const { values, errors, dirty, isValid, handleChange, handleBlur } =
        props;
      return (
        <Form className="flex flex-col gap-6">
          <Field
            type="number"
            name="height"
            id="height"
            label="Your height (in cm)"
            value={values.height}
            error={errors.height}
            onChange={handleChange}
            onBlur={handleBlur}
            component={TextInput}
          />

          <Field
            type="number"
            name="weight"
            id="weight"
            label="Your weight (in kilo)"
            value={values.weight}
            error={errors.weight}
            onChange={handleChange}
            onBlur={handleBlur}
            component={TextInput}
          />

          <Button
            className="min-w-full"
            type="submit"
            label="Save"
            disabled={!(isValid && dirty)}
          />

          {error && (
            <Typography type="Ag-13-medium" className="text-error mt-2">
              Server error: {error}
            </Typography>
          )}
          {isSaved && (
            <Typography type="Ag-13-medium" className="text-green mt-2">
              Information successfuly updated
            </Typography>
          )}
        </Form>
      );
    }}
  </Formik>
);
