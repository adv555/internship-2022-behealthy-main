import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProfileSection } from 'components/common/ProfileSection/ProfileSection';
import { Typography } from 'components/common/Typography';
import {
  PatientNotificationsForm,
  PatientNotificationsFormFields,
} from 'components/Patient/PatientNotificationsForm';
import { RootState } from 'common/types/app/root-state.type';
import { ReducerName } from 'common/enums/app/reducer-name.enum';
import { PatientNotificationsActionCreator } from 'store/patient/notifications/PatientNotifications.reducer';
import { Preloader } from 'components/common/Preloader/Preloader';

export const PatientNotifications = () => {
  const { data: patient, isLoaded: patientLoaded } = useSelector(
    (state: RootState) => state[ReducerName.PATIENT_INFO],
  );

  const { isLoaded, isSaved, error, data } = useSelector(
    (state: RootState) => state[ReducerName.PATIENT_NOTIFICATIONS],
  );

  const dispatch = useDispatch();

  useEffect(() => {
    patientLoaded &&
      dispatch(PatientNotificationsActionCreator.load(patient!.id));
  }, [patientLoaded]);

  const onSubmit = (values: PatientNotificationsFormFields) => {
    const { id, patient_id } = data!;
    dispatch(
      PatientNotificationsActionCreator.save({ ...values, id, patient_id }),
    );
  };

  return (
    <ProfileSection title="Notifications">
      {isLoaded ? (
        <>
          <Typography type="Ag-15-medium" className="mb-8">
            Choose notifications you want to see.
          </Typography>
          <PatientNotificationsForm
            initialValues={data as PatientNotificationsFormFields}
            onSubmit={onSubmit}
            isSaved={isSaved}
            error={error}
          />
        </>
      ) : (
        <Preloader />
      )}
    </ProfileSection>
  );
};
