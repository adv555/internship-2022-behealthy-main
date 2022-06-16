import { RightSideContainer } from 'components/PractitionerQuestionnaire/RightSideContainer';
import { RightSideImage } from 'components/PractitionerQuestionnaire/RightSideImage';
import Img from 'assets/img/PractitionerQuestionnaire/Medical5.png';
import Layout from 'components/PractitionerQuestionnaire/Layout';
import LeftSideContainer from 'components/PractitionerQuestionnaire/LeftSideContainer';
import { Breadcrumbs } from 'components/common/Breadcrumbs';
import PersonalVerificationForm from 'components/PractitionerQuestionnaire/forms/Personal-verification-form';

export const PractitionerVerificationPage = () => {
  return (
    <Layout>
      <LeftSideContainer>
        <Breadcrumbs role="practitioner" />
        <PersonalVerificationForm />
      </LeftSideContainer>
      <RightSideContainer>
        <RightSideImage Img={Img} />
      </RightSideContainer>
    </Layout>
  );
};
