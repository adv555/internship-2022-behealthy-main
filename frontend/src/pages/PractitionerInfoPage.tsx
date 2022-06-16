import { RightSideContainer } from 'components/PractitionerQuestionnaire/RightSideContainer';
import { RightSideImage } from 'components/PractitionerQuestionnaire/RightSideImage';
import Img from 'assets/img/PractitionerQuestionnaire/Medical5.png';
import Layout from 'components/PractitionerQuestionnaire/Layout';
import LeftSideContainer from 'components/PractitionerQuestionnaire/LeftSideContainer';
import { Breadcrumbs } from 'components/common/Breadcrumbs';
import PersonalInfoForm from 'components/PractitionerQuestionnaire/forms/Personal-info-form';

export const PractitionerInfoPage = () => {
  return (
    <Layout>
      <LeftSideContainer>
        <Breadcrumbs role="practitioner" />
        <PersonalInfoForm />
      </LeftSideContainer>
      <RightSideContainer>
        <RightSideImage Img={Img} />
      </RightSideContainer>
    </Layout>
  );
};
