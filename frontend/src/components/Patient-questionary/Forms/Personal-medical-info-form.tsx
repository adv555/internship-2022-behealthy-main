import React from 'react';
import { Formik, Form, FormikProps } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Button } from '../../common/Button/Button';
import FormHeader from '../../common/FormHeader/FormHeader';
import { PersonalMedicalInfoSchema } from './schemas/medicalInfoSchema';
import { SelectField } from 'components/common/Select/SelectField';
import {
  selectOptionAids,
  selectOptionAsthma,
  selectOptionBloodType,
  selectOptionDiabetes,
  selectOptionHepatitis,
} from './mock-data/select-options';
import TextInputField from 'components/common/Input/TextInputField';
import { MedicalInfoActionCreators } from 'store/medical_info/createMedicalInfo.reducer';
import { AppRoute } from 'common/enums/app/app-route.enum';
import { PoorMultiSelect } from 'components/common/MultiSelect/PoorMultiSelect';
import { Preloader } from 'components/Patient-questionary/Preloader/Preloader';
import { RootState } from 'common/types/app/root-state.type';

export interface PersonalMedicalInfoFormProps {
  patient_id: number | string;
  blood_type: string;
  injuries: string[];
  cardio: string;
  diabetes: string;
  asthma: string;
  viral_hepatitis: string;
  allergies: string[];
  drug_intolerance: string[];
  aids: string;
}
const InitialValues: PersonalMedicalInfoFormProps = {
  patient_id: '',
  blood_type: '',
  injuries: [],
  cardio: '',
  diabetes: '',
  asthma: '',
  viral_hepatitis: '',
  allergies: [],
  drug_intolerance: [],
  aids: '',
};
const PersonalMedicalInfoForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isSubmitting } = useSelector(
    ({ medicalInfo }: RootState) => medicalInfo,
  );
  const { data } = useSelector(({ patient }: RootState) => patient);

  const nextPage = () => {
    navigate(AppRoute.PATIENT_QUESTIONARY_CONTACT_PERSON_INFO, {
      replace: true,
    });
  };

  const onSubmitData = (values: PersonalMedicalInfoFormProps) => {
    const newValues = {
      ...values,
      patient_id: data?.id || '',
      injuries: values.injuries.join(', '),
      allergies: values.allergies.join(', '),
      drug_intolerance: values.drug_intolerance.join(', '),
    };

    dispatch(MedicalInfoActionCreators.submitMedicalInfoData(newValues));

    nextPage();
  };
  return (
    <div className="mt-[42px] w-343 md:w-480 ">
      <div className="mb-3">
        <FormHeader title="Medical information" />
      </div>
      <div className="flex flex-col mb-3 mt-3">
        {isSubmitting ? (
          <div className="flex justify-center items-center h-[350px]">
            <Preloader />
          </div>
        ) : (
          <>
            <Formik
              initialValues={InitialValues}
              validationSchema={PersonalMedicalInfoSchema}
              onSubmit={onSubmitData}
            >
              {(props: FormikProps<PersonalMedicalInfoFormProps>) => {
                const { dirty, isValid, values, setFieldValue, errors } = props;
                return (
                  <Form>
                    <div className="flex flex-col gap-6">
                      <SelectField
                        name={'blood_type'}
                        options={selectOptionBloodType}
                        label={'Blood type'}
                        placeholder={'Choose your blood type'}
                      />
                      <PoorMultiSelect
                        key={'injuries'}
                        label={'Injuries or operations'}
                        name={'injuries'}
                        placeholder={'List your injuries or operations'}
                        className="w-343 md:w-full"
                        value={values.injuries}
                        setFieldValue={setFieldValue}
                        errors={errors.injuries as string[]}
                      />
                      <TextInputField
                        key={'cardio'}
                        label={'Cardiovascular diseases'}
                        name={'cardio'}
                        placeholder={'Heart attack'}
                      />
                      <SelectField
                        name={'asthma'}
                        options={selectOptionAsthma}
                        label={'Asthma'}
                        placeholder={'Choose your diabetes mellitus'}
                      />
                      <SelectField
                        name={'diabetes'}
                        options={selectOptionDiabetes}
                        label={'Diabetes mellitus'}
                        placeholder={'Choose your asthma type'}
                      />

                      <SelectField
                        name={'viral_hepatitis'}
                        options={selectOptionHepatitis}
                        label={'Viral hepatitis'}
                        placeholder={'Choose your viral hepatitis'}
                      />
                      <PoorMultiSelect
                        key={'allergies'}
                        label={'Allergies'}
                        name={'allergies'}
                        placeholder={'List your allergies'}
                        value={values.allergies}
                        setFieldValue={setFieldValue}
                        errors={errors.allergies as string[]}
                      />
                      <PoorMultiSelect
                        key={'drug_intolerance'}
                        label={'Drug intolerance'}
                        name={'drug_intolerance'}
                        placeholder={'List your drug intolerance'}
                        value={values.drug_intolerance}
                        setFieldValue={setFieldValue}
                        errors={errors.drug_intolerance as string[]}
                      />
                      <SelectField
                        name={'aids'}
                        options={selectOptionAids}
                        label={'HIV / AIDS'}
                        placeholder={'HIV / AIDS'}
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
    </div>
  );
};

export default PersonalMedicalInfoForm;
