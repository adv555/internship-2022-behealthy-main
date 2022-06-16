import { ProfileSection } from 'components/common/ProfileSection/ProfileSection';
import { Typography } from 'components/common/Typography';
import { DeleteProfile } from 'components/DeleteProfile/DeleteProfile';

export const PractitionerDelete = () => {
  return (
    <ProfileSection title="Delete my profile">
      <Typography type="Ag-15-medium" className="mb-6">
        To delete your profile, enter your current password and confirm it.
      </Typography>
      <DeleteProfile />
    </ProfileSection>
  );
};
