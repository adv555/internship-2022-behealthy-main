import { Typography } from 'components/common/Typography/Typography';
import { SliderPage } from 'components/common/SignIn/SliderPage';
import { MdArrowBackIosNew } from 'react-icons/md';
import { SignUpForm } from 'components/SignUp/SignUpForm';
import { useNavigate } from 'react-router-dom';
import 'components/SignUp/SignUp.css';
import { Layout } from './FiftyFiftyScreen/Layout';
import { LeftSideContainer } from './FiftyFiftyScreen/LeftSideContainer';
import { RightSideContainer } from './FiftyFiftyScreen/RightSideContainer';

export type SignUpPageProps = {
  title: string;
  signUpFormComponent: JSX.Element;
};

export const SignUpPage = ({ title, signUpFormComponent }: SignUpPageProps) => (
  <Layout>
    <LeftSideContainer>
      <div className="mt-[42px]  w-343 md:w-480 ">
        <GoBackLink />
        <div>
          <Typography type="h2" className="mt-10 mb-3">
            {title}
          </Typography>
          <Typography type="Ag-15-regular" className="Ag-15">
            After filling in the information in the fields above, you will
            receive the activation link to your email.
          </Typography>
          {signUpFormComponent}
        </div>
      </div>
    </LeftSideContainer>
    <RightSideContainer>
      <SliderPage status="slider" sizePage="full" circleSize="half" />
    </RightSideContainer>
  </Layout>
);

const GoBackLink = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-row" onClick={() => navigate(-1)}>
      <MdArrowBackIosNew className="text-greyScaleMainBlack h-4 mt-1 mr-3 ml-2" />
      <div>Back</div>
    </div>
  );
};

export const PatientsSignUpPage = () => (
  <SignUpPage
    title="Patient's registration"
    signUpFormComponent={<SignUpForm role="PATIENT" />}
  />
);

export const PractitionersSignUpPage = () => (
  <SignUpPage
    title="Practitioner's registration"
    signUpFormComponent={<SignUpForm role="PRACTITIONER" />}
  />
);
