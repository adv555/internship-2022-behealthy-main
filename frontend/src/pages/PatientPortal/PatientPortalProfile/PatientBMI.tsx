import { ReducerName } from 'common/enums/app/reducer-name.enum';
import { RootState } from 'common/types/app/root-state.type';
import { Preloader } from 'components/common/Preloader/Preloader';
import { ProfileSection } from 'components/common/ProfileSection/ProfileSection';
import {
  PatientBmiForm,
  PatientBmiFormFields,
} from 'components/Patient/PatientBMIForm';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PatientBmiActionCreator } from 'store/patient/bmi/PatientBmi.reducer';

export const PatientBMI = () => {
  const { data: patient, isLoaded: patientLoaded } = useSelector(
    (state: RootState) => state[ReducerName.PATIENT_INFO],
  );

  const { isLoaded, isSaved, error, data } = useSelector(
    (state: RootState) => state[ReducerName.PATIENT_BMI],
  );

  const dispatch = useDispatch();

  useEffect(() => {
    patientLoaded && dispatch(PatientBmiActionCreator.load(patient!.id));
  }, [patientLoaded]);

  const onSubmit = (values: PatientBmiFormFields) => {
    const { id, patient_id } = data!;
    dispatch(PatientBmiActionCreator.save({ ...values, id, patient_id }));
  };

  return (
    <ProfileSection title="BMI parameters">
      {isLoaded ? (
        <PatientBmiForm
          initialValues={data as PatientBmiFormFields}
          onSubmit={onSubmit}
          isSaved={isSaved}
          error={error}
        />
      ) : (
        <Preloader />
      )}
    </ProfileSection>
  );
};
