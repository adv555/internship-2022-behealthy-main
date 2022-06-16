import { changePasswordValidation } from 'common/helpers/changePasswordValidation.helper';
import { Button } from 'components/common/Button/Button';
import { PasswordInput } from 'components/common/Input/PasswordInput';
import { Typography } from 'components/common/Typography';
import { Field, Form, Formik } from 'formik';
import { useState } from 'react';
import { api } from 'services';

export const ChangePassword = () => {
  const [requestError, setRequestError] = useState(null);
  const [requestSuccess, setRequestSuccess] = useState('');

  const initialValues = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  const onSubmit = async (values: any) => {
    try {
      await api.patch('/auth/reset', {
        old: values.currentPassword,
        new: values.confirmPassword,
      });
      setRequestSuccess('Password is successfully updated');
      requestError && setRequestError(null);
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message;
      setRequestError(errorMessage);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validateOnBlur={true}
      validateOnChange={false}
      validationSchema={changePasswordValidation}
    >
      {({
        values,
        errors,
        touched,
        isValid,
        dirty,
        handleChange,
        handleBlur,
      }) => (
        <Form>
          {requestError && (
            <Typography
              type="Ag-14-regular"
              className="Ag-14 text-secondaryRed mb-6"
            >
              {requestError}
            </Typography>
          )}
          {requestSuccess && (
            <Typography type="Ag-14-regular" className="Ag-14 text-green mb-6">
              {requestSuccess}
            </Typography>
          )}
          <div className="mb-6">
            <Field
              name="currentPassword"
              id="currentPassword"
              label="Current password"
              placeholder="Enter current password"
              values={values.currentPassword}
              error={errors.currentPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              component={PasswordInput}
            />
          </div>
          <div className="mb-6">
            <Field
              name="newPassword"
              id="newPassword"
              label="New password"
              placeholder="New password"
              values={values.newPassword}
              error={touched.newPassword && errors.newPassword}
              onBlur={handleBlur}
              onChange={handleChange}
              component={PasswordInput}
            />
          </div>
          <div className="mb-10">
            <Field
              name="confirmPassword"
              id="confirmPassword"
              label="Confirm new password"
              placeholder="Confirm new password"
              values={values.confirmPassword}
              error={touched.confirmPassword && errors.confirmPassword}
              onBlur={handleBlur}
              onChange={handleChange}
              component={PasswordInput}
            />
          </div>
          <Button
            type="submit"
            label="Save"
            className="w-[100%] desktop:w-full"
            disabled={!(dirty && isValid)}
          />
        </Form>
      )}
    </Formik>
  );
};
