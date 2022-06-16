import React from 'react';
import { Layout } from '../components/Patient-questionary/Layout';
import { PersonalVerificationForm } from '../components/Patient-questionary/Forms';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { RightSideContainer } from '../components/Patient-questionary/RightSideContainer';
import { LeftSideContainer } from '../components/Patient-questionary/LeftSideContainer';
import { ReactComponent as PatientQuestionaryImage } from '../assets/images/patient-questionary.svg';

const PatientQuestionaryVerificationPage: React.FC = () => {
  return (
    <>
      <Layout>
        <LeftSideContainer>
          <Breadcrumbs role="patient" />
          <PersonalVerificationForm />
        </LeftSideContainer>
        <RightSideContainer children={<PatientQuestionaryImage />} />
      </Layout>
    </>
  );
};

export default PatientQuestionaryVerificationPage;
