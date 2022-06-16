import React from 'react';
import { CreateNewPassword } from 'components/CreatePassword/CreatePassword';
import { SliderPage } from 'components/common/SignIn/SliderPage';
import { SliderTheme } from 'components/common/SignIn/SliderPage.stories';

export const CreateNewPasswordPage = () => {
  return (
    <div className="bg-backgroundColour w-full h-full flex flex-col sm:flex sm:flex-row">
      <div className="flex justify-center items-center h-screen sm:w-1/2 w-full">
        <CreateNewPassword />
      </div>
      <SliderPage
        status={SliderTheme.args?.status!}
        sizePage={SliderTheme.args?.sizePage}
        circleSize={SliderTheme.args?.circleSize}
      />
    </div>
  );
};
