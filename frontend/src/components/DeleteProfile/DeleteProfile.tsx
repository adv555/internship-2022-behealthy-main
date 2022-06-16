import { AppRoute } from 'common/enums/app/app-route.enum';
import { deleteAccountValidation } from 'common/helpers/deleteAccountValidation.helper';
import { RootState } from 'common/types/app/root-state.type';
import { Button } from 'components/common/Button/Button';
import { PasswordInput } from 'components/common/Input/PasswordInput';
import { Typography } from 'components/common/Typography';
import { Field, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LoginActionCreator } from 'store/login/login.reducer';
import { UserActionCreator } from 'store/user/getUser.reducer';

interface InitialValues {
  currentPassword: string;
  confirmCurrentPassword: string;
}

export const DeleteProfile = () => {
  const [deletingError, setDeletingError] = useState<null | string>(null);
  const { data } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues: InitialValues = {
    currentPassword: '',
    confirmCurrentPassword: '',
  };

  const onSubmit = async (values: InitialValues) => {
    try {
      dispatch(
        UserActionCreator.removeUser({
          id: data?.id,
          password: values.currentPassword,
        }),
      );
    } catch (err) {
      const error = err as Error;
      setDeletingError(error.message);
    }
  };

  useEffect(() => {
    if (data === null) {
      dispatch(LoginActionCreator.logout());
      navigate(AppRoute.SIGN_IN);
    }
  }, [data]);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validateOnChange={false}
      validateOnBlur={true}
      validationSchema={deleteAccountValidation}
    >
      {({
        values,
        errors,
        touched,
        isValid,
        dirty,
        handleBlur,
        handleChange,
      }) => (
        <Form>
          <div className="mb-6">
            <Field
              name="currentPassword"
              id="currentPassword"
              label="Current password"
              placeholder="Current password"
              values={values.currentPassword}
              error={touched.currentPassword && errors.currentPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              component={PasswordInput}
            />
          </div>
          <div className="mb-10">
            <Field
              name="confirmCurrentPassword"
              id="confirmCurrentPassword"
              label="Confirm current password"
              placeholder="Confirm current password"
              values={values.confirmCurrentPassword}
              error={
                touched.confirmCurrentPassword && errors.confirmCurrentPassword
              }
              onChange={handleChange}
              onBlur={handleBlur}
              component={PasswordInput}
            />
          </div>
          <Button
            type="submit"
            label="Confirm deleting profile"
            className="w-[100%] desktop:w-full"
            disabled={!(dirty && isValid)}
          />
          {deletingError && (
            <Typography type="Ag-13-medium" className="text-error mt-2">
              {deletingError}
            </Typography>
          )}
        </Form>
      )}
    </Formik>
  );
};
