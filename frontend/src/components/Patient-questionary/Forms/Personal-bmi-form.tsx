import { Formik, Form, FormikProps } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import FormHeader from '../../common/FormHeader/FormHeader';
import { Button } from '../../common/Button/Button';
import { BmiSchema } from './schemas/bmiSchema';
import { inputBmiData } from './mock-data/input-data';
import TextInputField from 'components/common/Input/TextInputField';
import { BmiInfoActionCreators } from 'store/bmi_info/createBmiInfo.reducer';
import { useNavigate } from 'react-router';
import { AppRoute } from 'common/enums/app/app-route.enum';
import { Preloader } from 'components/Patient-questionary/Preloader/Preloader';
import { RootState } from 'common/types/app/root-state.type';

export interface PersonalBmiFormFields {
  patient_id: number | string;
  height: number | string;
  weight: number | string;
}

const InitialValues: PersonalBmiFormFields = {
  patient_id: '',
  height: '',
  weight: '',
};

const PersonalBmiForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isSubmitting } = useSelector(({ bmiInfo }: RootState) => bmiInfo);
  const { data } = useSelector(({ patient }: RootState) => patient);

  const nextPage = () => {
    navigate(AppRoute.PATIENT_QUESTIONARY_MEDICAL_INFO, { replace: true });
  };

  const onSubmitData = (values: PersonalBmiFormFields) => {
    const newValues = {
      ...values,
      patient_id: data?.id || '',
    };

    dispatch(BmiInfoActionCreators.submitBmiInfoData(newValues));
    nextPage();
  };

  return (
    <div className="mt-[42px] w-343 md:w-480 ">
      <FormHeader title="BMI parameters" />
      <div className="flex flex-col mb-3 mt-3">
        {isSubmitting ? (
          <div className="flex justify-center items-center h-[350px]">
            <Preloader />
          </div>
        ) : (
          <>
            <Formik
              initialValues={InitialValues}
              validationSchema={BmiSchema}
              onSubmit={onSubmitData}
            >
              {(props: FormikProps<PersonalBmiFormFields>) => {
                const { dirty, isValid } = props;
                return (
                  <Form>
                    <div className="flex flex-col gap-6">
                      {inputBmiData.map(({ name, label }) => (
                        <TextInputField
                          type={'number'}
                          key={name}
                          label={label}
                          name={name}
                          className="w-480"
                          placeholder="0"
                        />
                      ))}
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

export default PersonalBmiForm;
