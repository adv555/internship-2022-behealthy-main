import { ProfileInfo } from 'common/types/PatientInfo';
import { BirthDateField } from 'components/common/BirthDateInput/BirthDateField';
import { Button } from 'components/common/Button/Button';
import { PhoneInput } from 'components/common/Input/PhoneInput';
import TextInputField from 'components/common/Input/TextInputField';
import { Radio } from 'components/common/Radio/Radio';
import { Typography } from 'components/common/Typography';
import { Form, Formik } from 'formik';
import { FC } from 'react';

interface PatientInfoFormProps {
  initialValues: ProfileInfo;
  validationSchema: any;
  onSubmit: (values: ProfileInfo) => void;
  isSaved: boolean;
  error: string | null;
}

export const PatientInfoForm: FC<PatientInfoFormProps> = ({
  initialValues,
  validationSchema,
  onSubmit,
  isSaved = false,
  error = null,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validateOnBlur={true}
      validateOnChange={false}
      validationSchema={validationSchema}
    >
      {({ values, errors, isValid, dirty, setFieldValue, handleChange }) => (
        <Form>
          <div className="mb-6">
            <TextInputField
              name="first_name"
              placeholder="John"
              label="First name"
            />
          </div>
          <div className="mb-6">
            <TextInputField
              name="last_name"
              placeholder="Doe"
              label="Last name"
            />
          </div>
          <div className="mb-6">
            <TextInputField
              type="email"
              name="email"
              placeholder="example@example.com"
              label="Email"
            />
          </div>
          <Typography type="Ag-13-medium" className="mb-2.5 text-greyScaleGrey">
            Gender
          </Typography>
          <div className="flex justify-between mb-6">
            <Radio
              name="gender"
              label="Male"
              onChange={() => setFieldValue('gender', 'Male')}
              checked={values.gender === 'Male'}
            />
            <Radio
              name="gender"
              label="Female"
              onChange={() => setFieldValue('gender', 'Female')}
              checked={values.gender === 'Female'}
            />
            <Radio
              name="gender"
              label="Other"
              onChange={() => setFieldValue('gender', 'Other')}
              checked={values.gender === 'Other'}
            />
          </div>
          <BirthDateField
            name="birthdate"
            error={errors.birthdate}
            returnDate={handleChange}
            className="mb-6"
          />
          <div className="mb-6">
            <PhoneInput
              label="Phone"
              id="phone"
              value={values.phone}
              placeholder="+380 12 345 67 89"
              setFieldValue={setFieldValue}
              error={errors.phone}
            />
          </div>
          <Button
            type="submit"
            label="Save"
            className="w-[100%] desktop:w-full"
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
      )}
    </Formik>
  );
};
