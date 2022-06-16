import { emailValidateSchema } from 'common/helpers/emailValidate.helper';
import { Button } from 'components/common/Button/Button';
import { Field, Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { TextInput } from 'components/common/Input/TextInput';
import { useState } from 'react';
import { Typography } from 'components/common/Typography';
import { api } from 'services';
import { AppRoute } from 'common/enums/app/app-route.enum';

const ForgotPasswordForm = () => {
  const [forgotPassError, setForgotPassError] = useState(null);

  const navigate = useNavigate();
  const onSubmitHandler = (values: { email: string }) => {
    const { email } = values;

    try {
      api.post('/email/confirm', {
        email,
      });
      navigate(AppRoute.CHECK_EMAIL, { replace: true });
    } catch (error: any) {
      const catchedError = error?.response?.data?.message;
      setForgotPassError(catchedError);
    }
  };

  const initialValues = {
    email: '',
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmitHandler}
      validateOnChange={false}
      validateOnBlur={true}
      validationSchema={emailValidateSchema}
    >
      {({ values, errors, handleChange, handleBlur }) => (
        <Form>
          <Field
            type="email"
            name="email"
            id="email"
            label="Email"
            placeholder="example@example.com"
            value={values.email}
            error={errors.email}
            onChange={handleChange}
            onBlur={handleBlur}
            component={TextInput}
          />
          {forgotPassError && (
            <Typography
              type="Ag-14-regular"
              className="Ag-14 text-secondaryRed mt-2"
            >
              {forgotPassError}
            </Typography>
          )}
          <Button
            type="submit"
            nameBtn="primary"
            className="mt-10 mb-8 w-full"
            label="Reset Password"
          />
        </Form>
      )}
    </Formik>
  );
};

export default ForgotPasswordForm;
