import { Typography } from 'components/common/Typography/Typography';
import ForgotPasswordForm from 'components/ForgotPassword/ForgotPasswordForm';
import { SliderPage } from 'components/common/SignIn/SliderPage';
import { SliderTheme } from 'components/common/SignIn/SliderPage.stories';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from 'common/enums/app/app-route.enum';

const ForgotPasswordPage: FC = () => {
  return (
    <div className="flex flex-col items-center md:items-start md:flex-row">
      <div className="grow px-[30px] 2xl:pl-[130px] 2xl:pr-[120px]">
        <div className="max-w-[480px] mt-[100px] xl:mt-[180px] 2xl:mt-[299px] mx-auto">
          <Typography
            type="h2"
            children="Forgot password? Don’t worry, we will send you instructions to reset it."
            className="mb-3"
          />
          <ForgotPasswordForm />
          <div className="text-center text-Ag-15">
            Back to{' '}
            <Link to={AppRoute.SIGN_IN} className="text-blue hover:underline">
              Sign In
            </Link>
          </div>
        </div>
      </div>
      <SliderPage
        status={SliderTheme.args?.status}
        sizePage={SliderTheme.args?.sizePage}
        circleSize={SliderTheme.args?.circleSize}
      />
    </div>
  );
};

export default ForgotPasswordPage;
