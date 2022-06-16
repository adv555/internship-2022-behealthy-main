import { ReducerName } from 'common/enums/app/reducer-name.enum';
import { validationSchema } from 'components/Patient/PatientInfoSchema';
import { RootState } from 'common/types/app/root-state.type';
import { ProfileInfo } from 'common/types/PatientInfo';
import { Preloader } from 'components/common/Preloader/Preloader';
import { ProfileSection } from 'components/common/ProfileSection/ProfileSection';
import { PatientInfoForm } from 'components/Patient/PatientInfoForm';
import { useDispatch, useSelector } from 'react-redux';
import { PatientInfoActionCreator } from 'store/patient/info/PatientInfo.reducer';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from 'common/enums/app/app-route.enum';
import { useEffect } from 'react';
import { UploadAvatarForm } from 'components/UploadAvatar/UploadAvatarForm';

export const PatientPersonalInfo = () => {
  const { data: user } = useSelector(
    (state: RootState) => state[ReducerName.USER],
  );

  const { isLoaded, isSaved, error, data } = useSelector(
    (state: RootState) => state[ReducerName.PATIENT_INFO],
  );

  const dispatch = useDispatch();
  const onSubmit = (values: ProfileInfo) => {
    const { id } = data!;
    dispatch(PatientInfoActionCreator.update({ id, values }));
  };

  const navigation = useNavigate();
  useEffect(() => {
    isLoaded &&
      !isSaved &&
      !data &&
      navigation(AppRoute.PATIENT_QUESTIONARY_INFO);
  }, [isLoaded]);

  return (
    <ProfileSection title="Personal information">
      {data && user ? (
        <>
          <UploadAvatarForm />
          <PatientInfoForm
            initialValues={{ ...data, email: user!.email }}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            isSaved={isSaved}
            error={error}
          />
        </>
      ) : (
        <div className="flex justify-center">
          <Preloader />
        </div>
      )}
    </ProfileSection>
  );
};
