import React, { useEffect } from 'react';
import { Formik, Form, FormikProps, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { AppRoute } from 'common/enums/app/app-route.enum';
import { Typography } from '../../common/Typography';
import TextInputField from 'components/common/Input/TextInputField';
import { Radio } from 'components/common/Radio/Radio';
import { Button } from '../../common/Button/Button';
import { PhoneInput } from 'components/common/Input/PhoneInput';
import { BirthDateField } from 'components/common/BirthDateInput/BirthDateField';
import FormHeader from '../../common/FormHeader/FormHeader';
import { PersonalInfoSchema } from './schemas/personalInfoSchema';
import { PatientActionCreators } from 'store/patient/creatPatient.reducer';
import { Preloader } from 'components/Patient-questionary/Preloader/Preloader';
import { RootState } from 'common/types/app/root-state.type';
import { UserActionCreator } from 'store/user/getUser.reducer';

export interface PersonalInfoFormProps {
  user_id: number | string;
  first_name: string;
  last_name: string;
  gender: string;
  birthdate: string;
  address: string;
  phone: string;
}
const InitialValues: PersonalInfoFormProps = {
  user_id: '',
  first_name: '',
  last_name: '',
  gender: '',
  birthdate: '',
  address: '',
  phone: '',
};

const PersonalInfoForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const item = localStorage.getItem('userEmail')!;

    dispatch(
      UserActionCreator.getUserData({
        email: item.toString(),
      }),
    );
  }, [dispatch]);

  const { isSubmitting } = useSelector(({ patient }: RootState) => patient);
  const { data } = useSelector(({ user }: RootState) => user);

  const onSubmitData = (values: PersonalInfoFormProps) => {
    const newValues = {
      ...values,
      user_id: data?.id,
      birthdate: new Date(values.birthdate).toISOString(),
    };
    dispatch(PatientActionCreators.submitPatientData(newValues));

    navigate(AppRoute.PATIENT_QUESTIONARY_VERIFICATION, { replace: true });
  };

  return (
    <div className="mt-[42px]  w-343 md:w-480 ">
      <FormHeader title="Personal information" />
      <div className="flex flex-col mb-3 mt-3">
        {isSubmitting ? (
          <div className="flex justify-center items-center h-[350px]">
            <Preloader />
          </div>
        ) : (
          <Formik
            initialValues={InitialValues}
            validationSchema={PersonalInfoSchema}
            onSubmit={onSubmitData}
          >
            {(props: FormikProps<PersonalInfoFormProps>) => {
              const { dirty, setFieldValue, errors, isValid } = props;
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
                          onClick={() => setFieldValue('gender', 'Male')}
                        />
                        <Radio
                          name="gender"
                          label="Female"
                          onClick={() => setFieldValue('gender', 'Female')}
                        />
                        <Radio
                          name="gender"
                          label="Other"
                          onClick={() => setFieldValue('gender', 'Female')}
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
                      name="birthdate"
                      returnDate={function (value: string): void {
                        setFieldValue('birthdate', value);
                      }}
                    />
                    <TextInputField
                      label={'Address'}
                      name={'address'}
                      className="w-480"
                      placeholder="Your Country, City, Street, Appartment №"
                    />
                    <PhoneInput
                      label={'Phone number'}
                      id={'phone'}
                      placeholder="+380 12 345 67 89"
                      setFieldValue={setFieldValue}
                      error={errors.phone}
                    />
                  </div>
                  <div className=" mt-10">
                    <Button
                      type="submit"
                      label="Save"
                      disabled={!(isValid && dirty)}
                    />
                  </div>
                </Form>
              );
            }}
          </Formik>
        )}
      </div>
    </div>
  );
};

export default PersonalInfoForm;
