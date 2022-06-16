import { ReducerName } from 'common/enums/app/reducer-name.enum';
import { RootState } from 'common/types/app/root-state.type';
import { Preloader } from 'components/common/Preloader/Preloader';
import { ProfileSection } from 'components/common/ProfileSection/ProfileSection';
import {
  PatientMedInfoForm,
  PatientMedInfoFormFields,
} from 'components/Patient/PatientMedInfoForm';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PatientMedInfoActionCreator } from 'store/patient/med_info/PatientMedInfo.reducer';

export const PatientMedInfo = () => {
  const { data: patient, isLoaded: patientLoaded } = useSelector(
    (state: RootState) => state[ReducerName.PATIENT_INFO],
  );

  const { isLoaded, isSaved, error, data } = useSelector(
    (state: RootState) => state[ReducerName.PATIENT_MED_INFO],
  );

  const dispatch = useDispatch();

  useEffect(() => {
    patientLoaded && dispatch(PatientMedInfoActionCreator.load(patient!.id));
  }, [patientLoaded]);

  const emptyMedInfo = {
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

  const initialValues: PatientMedInfoFormFields = data || emptyMedInfo;

  const onSubmit = (values: PatientMedInfoFormFields) => {
    const { id, patient_id } = data!;
    dispatch(PatientMedInfoActionCreator.save({ id, patient_id, ...values }));
  };

  return (
    <ProfileSection title="Medical information">
      {isLoaded ? (
        <PatientMedInfoForm
          initialValues={initialValues}
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
