import { ProfileSection } from 'components/common/ProfileSection/ProfileSection';
import { PractitionerEducationForms } from 'components/PractitionerPortal/PractitionerEducation/PractitionerEducationForms';

export const PractitionerEducation = () => {
  return (
    <ProfileSection title="Education">
      <PractitionerEducationForms />
    </ProfileSection>
  );
};
