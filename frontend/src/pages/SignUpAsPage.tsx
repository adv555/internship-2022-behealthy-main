import React from 'react';
import { Typography } from 'components/common/Typography/Typography';
import Card from 'components/common/Card/Card';
import { ReactComponent as DoctorIcon } from '../assets/icons/2 Medical 1.svg';
import { ReactComponent as PatientIcon } from '../assets/icons/1 Medical 1-1.svg';
import { SliderPage } from 'components/common/SignIn/SliderPage';
import { AppRoute } from 'common/enums/app/app-route.enum';
import { NavLink } from 'react-router-dom';
import { Button } from 'components/common/Button/Button';
import { Layout } from './FiftyFiftyScreen/Layout';

const SignUpAsPage: React.FC = () => {
  return (
    <Layout>
      <div className="relative w-full lg:w-1/2  max-h-screen overflow-auto items-center flex flex-col">
        <div className=" items-center justify-center mt-40px w-343 md:w-480">
          <div className=" mb-6">
            <Typography type="h2" children="Let’s create an account!" />
            <Typography
              type="h2"
              children="Choose whether you are a family practitioner or a patient."
            />
          </div>

          <div>
            <Card
              Icon={DoctorIcon}
              text={'Join as a family practitioner'}
              link={AppRoute.SIGN_UP_PRACTITIONER}
            />
            <Card
              Icon={PatientIcon}
              text={'Join as a patient'}
              link={AppRoute.SIGN_UP_PATIENT}
            />
          </div>

          <div className="flex items-center justify-center mt-40px">
            <NavLink to={AppRoute.SIGN_IN}>
              <Button label="Sign in" nameBtn="google2" type="button">
                <Typography
                  type="Ag-15-regular"
                  children="Already have an account yet?"
                  className="text-center ml-4px"
                />
              </Button>
            </NavLink>
          </div>
        </div>
      </div>
      <div
        className="w-1/2 relative mx-auto min-h-screen max-h-screen
     bg-primaryBlue overflow-hidden hidden lg:block"
      >
        <SliderPage status="slider" sizePage="full" circleSize="half" />
      </div>
    </Layout>
  );
};

export default SignUpAsPage;
