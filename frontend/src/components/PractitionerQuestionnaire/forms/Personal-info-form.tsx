import React, { useEffect } from 'react';
import { Formik, Form, FormikProps, ErrorMessage } from 'formik';
import { Typography } from '../../common/Typography';
import { Button } from '../../common/Button/Button';
import FormHeader from '../../common/FormHeader/FormHeader';
import TextInputField from 'components/common/Input/TextInputField';
import { Radio } from 'components/common/Radio/Radio';
import { PhoneInput } from 'components/common/Input/PhoneInput';
import { PersonalInfoSchema } from '../schemas/personalInfoSchema';
import { BirthDateField } from 'components/common/BirthDateInput/BirthDateField';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { AppRoute } from 'common/enums/app/app-route.enum';
import { PractitionerInfoFormProps } from 'common/types/app/Practitioner';
import { PractitionerRegistrationActionCreator } from 'store/practitioner/practitionerRegistration.reducer';
import { RootState } from 'common/types/app/root-state.type';
import { UserActionCreator } from 'store/user/getUser.reducer';

let InitialValues: PractitionerInfoFormProps = {
  first_name: '',
  last_name: '',
  gender: '',
  birthdate: '',
  phone: '',
};

const PersonalInfoForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state: RootState) => state.user.data);
  const practitioner = useSelector(
    (state: RootState) =>
      state.practitioner_registration.steps['personalInfo'].payload,
  );
  useEffect(() => {
    if (practitioner !== null) {
      InitialValues = { ...practitioner };
    }
  }, [practitioner]);

  useEffect(() => {
    const item = localStorage.getItem('userEmail')!;

    dispatch(
      UserActionCreator.getUserData({
        email: item.toString(),
      }),
    );
  }, [dispatch]);
  const onSubmitData = (values: PractitionerInfoFormProps) => {
    dispatch(
      PractitionerRegistrationActionCreator.addStepPayload({
        key: 'personalInfo',
        data: { ...values, user_id: user?.id },
      }),
    );
    dispatch(
      PractitionerRegistrationActionCreator.unlockStep({
        data: 'verification',
      }),
    );

    navigate(AppRoute.PRACTITIONER_QUESTIONNAIRE_VERIFICATION, {
      replace: true,
    });
  };
  return (
    <div className="mt-[42px]  w-343 md:w-480 ">
      <FormHeader title="Personal information" />
      <div className="flex flex-col  mb-3 mt-3">
        <Formik
          initialValues={InitialValues}
          validationSchema={PersonalInfoSchema}
          onSubmit={(values) => onSubmitData(values)}
        >
          {(props: FormikProps<PractitionerInfoFormProps>) => {
            const { values, dirty, setFieldValue, errors } = props;
            return (
              <Form>
                <div className="flex flex-col gap-6">
                  <TextInputField
                    label={'First name'}
                    name={'first_name'}
                    className="w-480"
                    placeholder="Your name"
                  />
                  <TextInputField
                    label={'Last name'}
                    name={'last_name'}
                    className="w-480"
                    placeholder="Your last name"
                  />

                  <div className="flex flex-col">
                    <Typography
                      type="Ag-13-medium"
                      className={'mb-0.5 text-greyScaleGrey'}
                    >
                      Gender
                    </Typography>
                    <div className="flex flex-row gap-6">
                      <Radio
                        name="gender"
                        label="Male"
                        checked={values.gender === 'Male'}
                        onClick={() => setFieldValue('gender', 'Male')}
                      />

                      <Radio
                        name="gender"
                        label="Female"
                        checked={values.gender === 'Female'}
                        onClick={() => setFieldValue('gender', 'Female')}
                      />
                      <Radio
                        name="gender"
                        label="Other"
                        checked={values.gender === 'Other'}
                        onClick={() => setFieldValue('gender', 'Other')}
                      />
                    </div>
                    <ErrorMessage name="gender">
                      {(error) => (
                        <Typography
                          type="Ag-13-medium"
                          className={' text-secondaryRed mt-0.5'}
                        >
                          {error}
                        </Typography>
                      )}
                    </ErrorMessage>
                  </div>
                  <BirthDateField
                    error={errors.birthdate || ''}
                    className="w-343 sm:w-480"
                    name="birthdate"
                    returnDate={function (value: string): void {
                      setFieldValue('birthdate', value);
                    }}
                  />

                  <PhoneInput
                    label={
                      'Phone number(available only for patients who concluded declaration with you)'
                    }
                    id={'phone'}
                    placeholder="+380 12 345 67 89"
                    setFieldValue={setFieldValue}
                    value={InitialValues.phone}
                    error={errors.phone}
                  />
                </div>
                <div className=" mt-10">
                  <Button type="submit" label="Save" disabled={!dirty} />
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default PersonalInfoForm;
