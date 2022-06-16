import { Story } from '@storybook/react';
import { TextInput } from './TextInput';
import { Formik, FormikProps, Form, Field } from 'formik';
import * as yup from 'yup';

type EmailWithValidationProps = {
  messageIfError: string;
  placeholder: string;
  defaultValue: string;
};

const EmailWithValidation = ({
  messageIfError,
  placeholder,
  defaultValue,
}: EmailWithValidationProps) => {
  const validationSchema = yup.object().shape({
    email: yup.string().email(messageIfError).required('Required'),
  });

  return (
    <>
      <Formik
        initialValues={{
          email: defaultValue,
        }}
        onSubmit={(values) => {
          alert(`Email: ${values.email}`);
          console.log(values.email);
        }}
        validationSchema={validationSchema}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
        }: FormikProps<any>) => (
          <Form>
            <Field
              type="email"
              name="email"
              id="email"
              label="Email"
              placeholder={placeholder}
              value={values.email}
              error={touched.email && errors.email}
              onChange={handleChange}
              onBlur={handleBlur}
              component={TextInput}
            />
            <button type="submit" />
          </Form>
        )}
      </Formik>
    </>
  );
};

export default {
  component: EmailWithValidation,
  title: 'Forms/EmailWithValidation',
};

const EmailTemplate: Story<EmailWithValidationProps> = (
  args: EmailWithValidationProps,
) => <EmailWithValidation {...args} />;

export const EmailInput = EmailTemplate.bind({});

EmailInput.args = {
  messageIfError: 'Error!',
  placeholder: 'user@gmail.com',
  defaultValue: 'user2@gmail.com',
};
