import React from 'react';
import { SliderPage } from 'components/common/SignIn/SliderPage';
import { FormSign } from 'components/SignIn/FormSign';
import { SliderTheme } from 'components/common/SignIn/SliderPage.stories';

const SignInPage = () => {
  return (
    <div className="bg-backgroundColour w-full h-full flex flex-col sm:flex sm:flex-row">
      <div className="flex justify-center items-center h-screen sm:w-1/2 w-full">
        <FormSign />
      </div>
      <SliderPage
        status={SliderTheme.args?.status}
        sizePage={SliderTheme.args?.sizePage}
        circleSize={SliderTheme.args?.circleSize}
      ></SliderPage>
    </div>
  );
};

export default SignInPage;
