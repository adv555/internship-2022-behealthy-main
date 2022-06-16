import { useEffect } from 'react';
import { Formik, FormikProps, Form, Field } from 'formik';

import { Button } from '../common/Button/Button';
import { TextInput } from '../common/Input/TextInput';
import { PasswordInput } from '../common/Input/PasswordInput';
import { Typography } from 'components/common/Typography/Typography';
import { validationSchema } from './ValidationSchema';

import './SignUp.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SignUpActionCreator } from 'store/sign_up/SignUp.reducer';
import { AppRoute } from 'common/enums/app/app-route.enum';
import { RootState } from 'common/types/app/root-state.type';
import { UserRole } from 'common/types/user.types';
import { ReducerName } from 'common/enums/app/reducer-name.enum';

type SignUpValues = {
  email: string;
  password: string;
  confirmPassword: string;
};

export type SignUpFormProps = {
  role: UserRole;
};

export const SignUpForm = ({ role }: SignUpFormProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { signUpDone, signUpError } = useSelector(
    (state: RootState) => state[ReducerName.SIGN_UP],
  );

  const navigateNext = () => {
    navigate(AppRoute.ACTIVATION_LINK_SENT);
  };

  useEffect(() => {
    signUpDone && navigateNext();
  }, [signUpDone]);

  const onSubmit = (values: SignUpValues) => {
    const { email, password } = values;
    dispatch(SignUpActionCreator.signUp({ email, password, role }));
  };

  const initValues = {
    email: '',
    password: '',
    confirmPassword: '',
  };

  return (
    <div>
      <Typography type="Ag-14-regular" className="Ag-14 text-secondaryRed mt-2">
        {signUpError ? `Server error: ${signUpError}` : ''}
      </Typography>
      <Formik
        initialValues={initValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({
          values,
          errors,
          touched,
          isValid,
          dirty,
          handleChange,
          handleBlur,
        }: FormikProps<any>) => (
          <Form className="SignUpForm">
            <Field
              type="email"
              name="email"
              id="email"
              label="Email"
              placeholder="Email"
              value={values.email}
              error={errors.email}
              onChange={handleChange}
              onBlur={handleBlur}
              component={TextInput}
            />

            <Field
              name="password"
              id="password"
              label="Password"
              placeholder="Enter password"
              value={values.password}
              error={touched.password && errors.password}
              onChange={handleChange}
              onBlur={handleBlur}
              component={PasswordInput}
            />

            <Field
              name="confirmPassword"
              id="confirmPassword"
              label="Confirm password"
              placeholder="Confirm password"
              value={values.confirmPassword}
              error={touched.confirmPassword && errors.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              component={PasswordInput}
            />

            <Button
              className="Submit"
              type="submit"
              label="Continue"
              disabled={!(isValid && dirty)}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};
