import { Typography } from 'components/common/Typography/Typography';
import { SliderPage } from 'components/common/SignIn/SliderPage';
import { SliderTheme } from 'components/common/SignIn/SliderPage.stories';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from 'common/enums/app/app-route.enum';

const CheckEmailPage: FC = () => {
  return (
    <div className="flex flex-col items-center md:items-start md:flex-row">
      <div className="grow px-[30px] mb-36 md:mb-0 2xl:pl-[130px] 2xl:pr-[120px]">
        <div className="max-w-[480px] mt-[100px] xl:mt-[180px] 2xl:mt-[299px] mx-auto">
          <Typography type="h2" className="mb-3">
            Check your email
          </Typography>
          <Typography type="Ag-15-regular" className="mb-3">
            You have received the instructions how to recover your password.
          </Typography>
          <Link
            to={AppRoute.SIGN_IN}
            className="w-full mt-10 flex justify-center items-center  text-center text-base box-border transition  duration-200 cursor-pointer p-3 h-12 font-semibold text-greyScaleWhite  border-none rounded-lg bg-primaryBlue hover:bg-secondaryBlue2 focus:bg-secondaryBlue disabled:bg-disabledBlue disabled:text-disabledWhite"
          >
            Back to Sign in
          </Link>
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

export default CheckEmailPage;
