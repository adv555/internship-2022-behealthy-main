import React from 'react';

import { PersonalContactsForm } from '../components/Patient-questionary/Forms';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { RightSideContainer } from '../components/Patient-questionary/RightSideContainer';
import { LeftSideContainer } from '../components/Patient-questionary/LeftSideContainer';
import { ReactComponent as PatientQuestionaryImage } from '../assets/images/patient-questionary.svg';
import { Layout } from 'components/Patient-questionary/Layout';

const PatientQuestionaryRelatedPersonInfoPage: React.FC = () => {
  return (
    <>
      <Layout>
        <LeftSideContainer>
          <Breadcrumbs role="patient" />
          <PersonalContactsForm />
        </LeftSideContainer>
        <RightSideContainer children={<PatientQuestionaryImage />} />
      </Layout>
    </>
  );
};

export default PatientQuestionaryRelatedPersonInfoPage;
