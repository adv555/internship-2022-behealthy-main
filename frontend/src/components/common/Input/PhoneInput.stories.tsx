import { Story } from '@storybook/react';
import { PhoneInput } from './PhoneInput';
import { Formik, FormikProps, Form, Field } from 'formik';
import * as yup from 'yup';
import 'yup-phone';

type PhoneWithValidationProps = {
  messageIfError: string;
  placeholder: string;
  defaultValue: string;
};

const PhoneWithValidation = ({
  messageIfError,
  placeholder,
  defaultValue,
}: PhoneWithValidationProps) => {
  const validationSchema = yup.object().shape({
    phone: yup
      .string()
      .phone(undefined, undefined, messageIfError)
      .required('Required'),
  });

  return (
    <>
      <Formik
        initialValues={{
          phone: defaultValue,
        }}
        onSubmit={(values) => {
          alert(`Phone: ${values.phone}`);
          console.log(values.phone);
        }}
        validationSchema={validationSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          setFieldValue,
        }: FormikProps<any>) => (
          <Form>
            <Field
              type="phone"
              name="phone"
              id="phone"
              label="Phone"
              placeholder={placeholder}
              value={values.phone}
              error={touched.phone && errors.phone}
              setFieldValue={setFieldValue}
              onBlur={handleBlur}
              component={PhoneInput}
            />
            <button type="submit" />
          </Form>
        )}
      </Formik>
    </>
  );
};

export default {
  component: PhoneWithValidation,
  title: 'Forms/PhoneWithValidation',
};

const PhoneTemplate: Story<PhoneWithValidationProps> = (
  args: PhoneWithValidationProps,
) => <PhoneWithValidation {...args} />;

export const PhoneInputTpl = PhoneTemplate.bind({});

PhoneInputTpl.args = {
  messageIfError: 'Error!',
  placeholder: '+380 96 222 22 22',
  defaultValue: '',
};
