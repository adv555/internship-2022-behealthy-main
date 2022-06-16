import React from 'react';
import { useNavigate } from 'react-router';
import { Button } from 'components/common/Button/Button';
import GoBackButton from 'components/common/GoBackButton/GoBackButton';
import { AppRoute } from 'common/enums/app/app-route.enum';
import { RootState } from 'common/types/app/root-state.type';
import { UserRoles } from 'common/enums/app/user-roles.enum';
import { useSelector } from 'react-redux';
import { Layout } from './FiftyFiftyScreen/Layout';
import { LeftSideContainer } from './FiftyFiftyScreen/LeftSideContainer';
import { RightSideContainer } from './FiftyFiftyScreen/RightSideContainerWithIcons';
import { Typography } from 'components/common/Typography/Typography';
import { ReactComponent as PhoneImage } from 'assets/images/mobiles.svg';

const ActivationLinkSentPage: React.FC = () => {
  const navigate = useNavigate();

  const { data } = useSelector((state: RootState) => state.user);

  const navigateToQuestionary = (role: string | undefined) => {
    if (role === UserRoles.PRACTITIONER) {
      navigate(AppRoute.PRACTITIONER_QUESTIONNAIRE_INFO, { replace: true });
    }
    if (role === UserRoles.PATIENT) {
      navigate(AppRoute.PATIENT_QUESTIONARY_INFO, { replace: true });
    }
  };

  const onContinue = () => {
    data?.isActivated && navigateToQuestionary(data?.role);
    !data?.isActivated && navigate(AppRoute.SIGN_IN, { replace: true });
  };

  return (
    <Layout>
      <LeftSideContainer>
        <div className="mt-205px w-343 md:w-480 font-barlow opacity-90">
          <GoBackButton onClick={() => navigate(-1)} />
          <div className="my-40px font-bold">
            <Typography type={'h2'}>Activation link sent</Typography>
            <Typography type={'Ag-15-medium'} className="mt-12px">
              We have sent you the activation link to your email address. After
              the confirmation, you will be redirected to the page with your
              personal information.
            </Typography>
          </div>
          <Button
            disabled={false}
            label="Continue"
            nameBtn="accept"
            type="button"
            className="w-343 md:w-480"
            onClick={onContinue}
          />
        </div>
      </LeftSideContainer>
      <RightSideContainer children={<PhoneImage />} />
    </Layout>
  );
};

export default ActivationLinkSentPage;
