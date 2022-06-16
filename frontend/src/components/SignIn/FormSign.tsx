import { Formik, Field, Form } from 'formik';
import { SignIpSchema } from 'common/helpers/validateForm.helpers';
import { SignInput } from '../common/SignIn/SignInput';
import { Primary } from 'components/common/Button/Button.stories';
import { Google } from 'components/common/Button/Button.stories';
import { Button } from 'components/common/Button/Button';
import { AppRoute } from 'common/enums/app/app-route.enum';
import { NavLink, useNavigate } from 'react-router-dom';
import { Typography } from 'components/common/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'common/types/app/root-state.type';
import { useEffect, useState } from 'react';
import { LoginActionCreator } from 'store/login/login.reducer';
import { UserActionCreator } from 'store/user/getUser.reducer';
import { UserRoles } from 'common/enums/app/user-roles.enum';

interface FormValuesProps {
  email: string;
  password: string;
}

export const FormSign = () => {
  const signInByGoogle = () => {
    window.open(`${process.env.REACT_APP_API_BASE_URL}/auth/google`, '_self');
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data } = useSelector((state: RootState) => state.user);
  const { isLoggedIn, userEmail, loginError } = useSelector(
    (state: RootState) => state.login,
  );
  const [formLoginError, setFormLoginError] = useState<string | null>(null);

  const initialValues = {
    email: '',
    password: '',
  };

  const navigateToSystem = async (role: string) => {
    if (role === UserRoles.PRACTITIONER) {
      navigate(AppRoute.PRACTITIONER_PORTAL, {
        replace: true,
      });
    }
    if (role === UserRoles.PATIENT) {
      navigate(AppRoute.PATIENT_PORTAL, {
        replace: true,
      });
    }
  };

  const onSubmit = async (values: FormValuesProps) => {
    dispatch(LoginActionCreator.login(values));
  };

  useEffect(() => {
    isLoggedIn &&
      dispatch(
        UserActionCreator.getUserData({
          email: userEmail,
        }),
      );
  }, [isLoggedIn]);

  useEffect(() => {
    loginError && setFormLoginError(loginError);
  }, [loginError]);

  useEffect(() => {
    if (isLoggedIn && data && data.isActivated) {
      navigateToSystem(data.role);
    }
  }, [isLoggedIn, data]);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validateOnChange={true}
      validateOnBlur={true}
      validationSchema={SignIpSchema}
    >
      {({ values, errors, handleChange, handleBlur, touched }) => (
        <Form
          className="lg:w-formSize lg:h-formSize md:w-80 sm:w-64 w-343 h-343"
          noValidate
        >
          <h2 className="text-grayscale-main-black font-barlow font-bold text-h2 leading-h2">
            Let's sign in. You have been missed!
          </h2>
          <fieldset className="flex flex-col mt-3 w-full ">
            <Field
              name="email"
              type="email"
              id="email"
              placeholder="e.g. example@gmail.com"
              values={values.email}
              errors={errors.email}
              touched={touched.email}
              onBlur={handleBlur}
              onChange={handleChange}
              component={SignInput}
            ></Field>
          </fieldset>
          <fieldset className="flex flex-col relative mt-3 mb-6 w-full">
            <Field
              name="password"
              type="password"
              id="password"
              values={values.password}
              errors={errors.password}
              touched={touched.password}
              placeholder="Enter password"
              onBlur={handleBlur}
              onChange={handleChange}
              component={SignInput}
            ></Field>
          </fieldset>
          <div>
            <div>
              <Button
                label={Primary.args?.label}
                nameBtn={Primary.args?.nameBtn}
                disabled={false}
                type="submit"
                size={'sm'}
                className={`lg:w-formSize md:w-80 sm:w-64 w-343`}
              />
              {formLoginError && (
                <Typography type="Ag-13-medium" className="mt-2 text-error">
                  {formLoginError}
                </Typography>
              )}
              <span className="h-5 inline-block"></span>
              <Button
                label={Google.args?.label}
                nameBtn={Google.args?.nameBtn}
                size={'sm'}
                onClick={signInByGoogle}
                className={`lg:w-formSize md:w-80 sm:w-64 w-343`}
              />
            </div>
            <div className="mb-8 mt-8">
              <NavLink to={AppRoute.FORGOT_PASSWORD}>
                <Button
                  label="Forgot Password?"
                  nameBtn="google2"
                  className="lg:w-formSize md:w-80 sm:w-64 w-343"
                  size="sm"
                />
              </NavLink>
            </div>
            <div className="mt-8 flex justify-center">
              <NavLink to={AppRoute.SIGN_UP_AS}>
                <Button label="Sign Up" nameBtn="google2">
                  <Typography type={'Ag-15-regular'}>
                    Don’t have an account yet?
                  </Typography>
                </Button>
              </NavLink>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};
