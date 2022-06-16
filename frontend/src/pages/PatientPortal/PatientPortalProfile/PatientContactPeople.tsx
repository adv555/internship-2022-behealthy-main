import { ReducerName } from 'common/enums/app/reducer-name.enum';
import { RootState } from 'common/types/app/root-state.type';
import { Preloader } from 'components/common/Preloader/Preloader';
import { ProfileSection } from 'components/common/ProfileSection/ProfileSection';
import {
  PatientContactPeopleForm,
  PatientContactPeopleFormFields,
} from 'components/Patient/PatientContactPeopleForm';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PatientContactPeopleActionCreator } from 'store/patient/contact_people/PatientContactPeople.reducer';

export const PatientContactPeople = () => {
  const { data: patient, isLoaded: patientLoaded } = useSelector(
    (state: RootState) => state[ReducerName.PATIENT_INFO],
  );

  const { isLoaded, isSaved, error, data } = useSelector(
    (state: RootState) => state[ReducerName.PATIENT_CONTACT_PEOPLE],
  );

  const dispatch = useDispatch();

  useEffect(() => {
    patientLoaded &&
      dispatch(PatientContactPeopleActionCreator.load(patient!.id));
  }, [patientLoaded]);

  const onSubmit = (values: PatientContactPeopleFormFields) => {
    const { patient_id } = data!;
    dispatch(PatientContactPeopleActionCreator.save({ ...values, patient_id }));
  };

  return (
    <ProfileSection title="Contact person information">
      {isLoaded && data ? (
        <PatientContactPeopleForm
          initialValues={data as PatientContactPeopleFormFields}
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
