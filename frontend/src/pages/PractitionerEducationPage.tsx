import { RightSideContainer } from 'components/PractitionerQuestionnaire/RightSideContainer';
import { RightSideImage } from 'components/PractitionerQuestionnaire/RightSideImage';
import Img from 'assets/img/PractitionerQuestionnaire/Medical5.png';
import Layout from 'components/PractitionerQuestionnaire/Layout';
import LeftSideContainer from 'components/PractitionerQuestionnaire/LeftSideContainer';
import { Breadcrumbs } from 'components/common/Breadcrumbs';
import { EducationForm } from 'components/PractitionerQuestionnaire/forms/EducationForm';

export const PractitionerEducationPage = () => {
  return (
    <Layout>
      <LeftSideContainer>
        <Breadcrumbs role="practitioner" />
        <EducationForm />
      </LeftSideContainer>
      <RightSideContainer>
        <RightSideImage Img={Img} />
      </RightSideContainer>
    </Layout>
  );
};
