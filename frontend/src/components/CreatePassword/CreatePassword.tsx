import React from 'react';
import { Formik, Form, Field } from 'formik';
import { CreatePasswordSchema } from 'common/helpers/passwordCreateValidation';
import { SignInput } from 'components/common/SignIn/SignInput';
import { Primary } from 'components/common/Button/Button.stories';
import { Button } from 'components/common/Button/Button';
import { NavLink } from 'react-router-dom';
import { AppRoute } from 'common/enums/app/app-route.enum';
import { PathUserPassword } from 'services/changepswd';
import { useNavigate } from 'react-router-dom';

interface CreatePasswordData {
  newPassword: string;
  confirmNewPassword: string;
}

export const CreateNewPassword = () => {
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const linkId = params.get('link_id');

  const initialValues: CreatePasswordData = {
    newPassword: '',
    confirmNewPassword: '',
  };

  const onSubmit = async (values: CreatePasswordData) => {
    const { confirmNewPassword } = values;
    if (id && linkId) {
      await PathUserPassword(confirmNewPassword, +id, linkId);
      navigate(AppRoute.SIGN_IN);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={CreatePasswordSchema}
    >
      {({ values, errors, handleChange, handleBlur, touched }) => (
        <Form
          className="lg:w-formSize lg:h-96 lg:flex lg:flex-col lg:justify-between md:w-80 sm:w-64 w-343 h-343 relative"
          noValidate
        >
          <h2 className="text-grayscale-main-black font-barlow font-bold text-h2 leading-h2">
            Create new password
          </h2>
          <fieldset className="flex flex-col mt-3 w-full relative">
            <Field
              name="password"
              type="password"
              id="newPassword"
              placeholder="Enter new password"
              values={values.newPassword}
              errors={errors.newPassword}
              touched={touched.newPassword}
              onBlur={handleBlur}
              onChange={handleChange}
              component={SignInput}
            ></Field>
          </fieldset>
          <fieldset className="flex flex-col mt-3 w-full relative">
            <Field
              name="password"
              type="password"
              id="confirmNewPassword"
              placeholder="Confirm password"
              values={values.confirmNewPassword}
              errors={errors.confirmNewPassword}
              touched={touched.confirmNewPassword}
              onBlur={handleBlur}
              onChange={handleChange}
              component={SignInput}
            ></Field>
          </fieldset>
          <Button
            label={'Confirm'}
            nameBtn={Primary.args?.nameBtn}
            disabled={false}
            type="submit"
            size={'sm'}
            className={`lg:w-formSize md:w-80 sm:w-64 w-343`}
          ></Button>
          <div className="flex justify-center align-center">
            <div className="mt-8 font-barlow font-normal text-signInput leading-5">
              Back to
              <NavLink
                to={AppRoute.SIGN_IN}
                className="text-primaryBlue font-barlow font-medium text-signInput leading-5 ml-1"
              >
                Sign In
              </NavLink>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};
