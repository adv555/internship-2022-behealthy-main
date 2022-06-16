import { RightSideContainer } from 'components/PractitionerQuestionnaire/RightSideContainer';
import { RightSideImage } from 'components/PractitionerQuestionnaire/RightSideImage';
import Img from 'assets/img/PractitionerQuestionnaire/Medical5.png';
import Layout from 'components/PractitionerQuestionnaire/Layout';
import LeftSideContainer from 'components/PractitionerQuestionnaire/LeftSideContainer';
import { Breadcrumbs } from 'components/common/Breadcrumbs';
import { WorkExperienceForm } from 'components/PractitionerQuestionnaire/forms/WorkExperienceForm';

export const PractitionerWorkExperience = () => {
  return (
    <Layout>
      <LeftSideContainer>
        <Breadcrumbs role="practitioner" />
        <WorkExperienceForm />
      </LeftSideContainer>
      <RightSideContainer>
        <RightSideImage Img={Img} />
      </RightSideContainer>
    </Layout>
  );
};
