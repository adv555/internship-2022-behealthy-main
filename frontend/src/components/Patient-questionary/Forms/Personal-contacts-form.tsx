import React from 'react';
import { Formik, Form, FormikProps } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import FormHeader from '../../common/FormHeader/FormHeader';

import { ContactPersonSchema } from './schemas/contactPersonSchema';
import { Button } from '../../common/Button/Button';
import { SelectField } from '../../common/Select/SelectField';
import { selectOptionRelationType } from './mock-data/select-options';
import TextInputField from 'components/common/Input/TextInputField';
import { PhoneInput } from 'components/common/Input/PhoneInput';
import { ContactActionCreators } from 'store/contact/creatPatientContact.reducer';
import { useNavigate } from 'react-router';
import { AppRoute } from 'common/enums/app/app-route.enum';
import { Preloader } from 'components/Patient-questionary/Preloader/Preloader';
import { RootState } from 'common/types/app/root-state.type';
import { LoginActionCreator } from 'store/login/login.reducer';

export interface PersonalContactsProps {
  patient_id: number | string;
  first_name: string;
  last_name: string;
  phone: string;
  relation_type: string;
}
const InitialValues: PersonalContactsProps = {
  patient_id: '',
  first_name: '',
  last_name: '',
  phone: '',
  relation_type: '',
};

const PersonalContactsForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isSubmitting } = useSelector(({ contact }: RootState) => contact);

  const userData = useSelector((state: RootState) => state.user.data);
  const { data } = useSelector(({ patient }: RootState) => patient);

  const nextPage = () => {
    dispatch(
      LoginActionCreator.signUpLogin({
        email: userData?.email,
      }),
    );
    navigate(AppRoute.PATIENT_PORTAL, { replace: true });
  };

  const onSubmitData = (values: PersonalContactsProps) => {
    const newValues = {
      ...values,
      patient_id: data?.id || '',
    };

    dispatch(ContactActionCreators.submitContactData(newValues));

    nextPage();
  };
  return (
    <div className="mt-[42px] w-343 md:w-480">
      <div className="mb-3">
        <FormHeader title="Contact person information" />
      </div>
      {isSubmitting ? (
        <div className="flex justify-center items-center h-[350px]">
          <Preloader />
        </div>
      ) : (
        <>
          <Formik
            initialValues={InitialValues}
            validationSchema={ContactPersonSchema}
            onSubmit={onSubmitData}
          >
            {(props: FormikProps<PersonalContactsProps>) => {
              const { dirty, isValid, setFieldValue, errors } = props;
              return (
                <Form>
                  <div className="flex flex-col gap-6">
                    <TextInputField
                      key={'first_name'}
                      label={'First name'}
                      name={'first_name'}
                      className="w-480"
                      placeholder="Contact first name"
                    />
                    <TextInputField
                      key={'last_name'}
                      label={'Last name'}
                      name={'last_name'}
                      className="w-480"
                      placeholder="Contact last name"
                    />
                    <PhoneInput
                      key={'phone'}
                      label={'Phone number'}
                      id={'phone'}
                      placeholder="+380 12 345 67 89"
                      setFieldValue={setFieldValue}
                      error={errors.phone}
                    />
                    <SelectField
                      name={'relation_type'}
                      options={selectOptionRelationType}
                      label={'Relation type'}
                      placeholder={'Choose relation type'}
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
          <div className=" mt-8">
            <Button
              type="submit"
              label="Skip"
              nameBtn="tertiary"
              onClick={nextPage}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default PersonalContactsForm;
