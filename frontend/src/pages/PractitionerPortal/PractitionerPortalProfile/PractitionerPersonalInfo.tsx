import { practitionerPersonalInfo } from 'common/helpers/practitionerPersonalInfo.helper';
import { RootState } from 'common/types/app/root-state.type';
import { Preloader } from 'components/common/Preloader/Preloader';
import { ProfileSection } from 'components/common/ProfileSection/ProfileSection';
import { EditPersonalInfo } from 'components/EditPersonalInfo/EditPersonalInfo';
import { UploadAvatarForm } from 'components/UploadAvatar/UploadAvatarForm';
import { useSelector } from 'react-redux';

export const PractitionerPersonalInfo = () => {
  const { isLoaded, data } = useSelector(
    (state: RootState) => state.practitioner,
  );
  const user = useSelector((state: RootState) => state.user.data);

  const practitionerData = {
    ...data,
    email: user?.email,
  };

  return (
    <ProfileSection title="Personal information">
      {isLoaded && user ? (
        <>
          <UploadAvatarForm />
          <EditPersonalInfo
            role={user?.role}
            profileInfo={practitionerData}
            validationSchema={practitionerPersonalInfo}
          />
        </>
      ) : (
        <Preloader />
      )}
    </ProfileSection>
  );
};
