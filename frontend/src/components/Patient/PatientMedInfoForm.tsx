import { PatientMedInfo } from 'common/types/PatientMedInfo';
import { Button } from 'components/common/Button/Button';
import { TextInput } from 'components/common/Input/TextInput';
import { PoorMultiSelect } from 'components/common/MultiSelect/PoorMultiSelect';
import { SelectField } from 'components/common/Select/SelectField';
import { Typography } from 'components/common/Typography';
import { Formik, Form, Field, FormikProps } from 'formik';
import { PatientMedInfoSchema } from './PatientMedInfoSchema';
import {
  selectOptionAids,
  selectOptionAsthma,
  selectOptionBloodType,
  selectOptionDiabetes,
  selectOptionHepatitis,
} from './select-options';

export type PatientMedInfoFormFields = Omit<
  PatientMedInfo,
  'id' | 'patient_id'
>;

export type PatientMedInfoFormProps = {
  initialValues: PatientMedInfoFormFields;
  onSubmit: (data: PatientMedInfoFormFields) => void;
  isSaved: boolean;
  error: string | null;
};

export const PatientMedInfoForm = ({
  initialValues,
  onSubmit,
  isSaved = false,
  error = null,
}: PatientMedInfoFormProps) => (
  <Formik
    initialValues={initialValues}
    validationSchema={PatientMedInfoSchema}
    onSubmit={onSubmit}
  >
    {(props: FormikProps<PatientMedInfoFormFields>) => {
      const {
        values,
        errors,
        touched,
        dirty,
        isValid,
        handleChange,
        handleBlur,
        setFieldValue,
      } = props;

      return (
        <Form className="flex flex-col gap-6">
          <SelectField
            key={'blood_type'}
            name={'blood_type'}
            options={selectOptionBloodType}
            label={'Blood type'}
            placeholder={'Choose your blood type'}
          />

          <PoorMultiSelect
            key={'injuries'}
            label={'Injuries or operations'}
            name={'injuries'}
            placeholder={'List your injuries or operations'}
            value={values.injuries}
            errors={errors.injuries as string[]}
            setFieldValue={setFieldValue}
          />

          <Field
            id={'cardio'}
            key={'cardio'}
            label={'Cardiovascular diseases'}
            name={'cardio'}
            placeholder={'e.g. Heart attack'}
            value={values.cardio}
            error={touched.cardio && errors.cardio}
            onChange={handleChange}
            onBlur={handleBlur}
            component={TextInput}
          />

          <SelectField
            key={'asthma'}
            name={'asthma'}
            options={selectOptionAsthma}
            label={'Asthma'}
            placeholder={'Choose your diabetes mellitus'}
          />

          <SelectField
            key={'diabetes'}
            name={'diabetes'}
            options={selectOptionDiabetes}
            label={'Diabetes mellitus'}
            placeholder={'Choose your asthma type'}
          />

          <SelectField
            key={'viral_hepatitis'}
            name={'viral_hepatitis'}
            options={selectOptionHepatitis}
            label={'Viral hepatitis'}
            placeholder={'Choose your viral hepatitis'}
          />

          <PoorMultiSelect
            key={'allergies'}
            label={'Allergies'}
            name={'allergies'}
            placeholder={'List your allergies'}
            value={values.allergies}
            errors={errors.allergies as string[]}
            setFieldValue={setFieldValue}
          />

          <PoorMultiSelect
            key={'drug_intolerance'}
            label={'Drug intolerance'}
            name={'drug_intolerance'}
            placeholder={'List your drug intolerance'}
            value={values.drug_intolerance}
            setFieldValue={setFieldValue}
            errors={errors.drug_intolerance as string[]}
          />

          <SelectField
            key={'aids'}
            name={'aids'}
            options={selectOptionAids}
            label={'HIV / AIDS'}
            placeholder={'HIV / AIDS'}
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
