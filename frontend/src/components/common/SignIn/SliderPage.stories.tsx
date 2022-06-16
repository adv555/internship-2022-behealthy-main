import React from 'react';
import { SliderPage } from 'components/common/SignIn/SliderPage';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { SliderSignBoard } from './SliderSignBoard';

export default {
  title: 'Pages/sliderPage',
  component: SliderPage,
} as ComponentMeta<typeof SliderPage>;

const Template: ComponentStory<typeof SliderPage> = (args) => {
  return (
    <SliderPage {...args}>
      {<SliderSignBoard status={args.status!}></SliderSignBoard>}
    </SliderPage>
  );
};

export const DefaultTheme = Template.bind({});
DefaultTheme.args = {
  status: 'empty',
  sizePage: 'default',
  circleSize: 'half',
};

export const SliderTheme = Template.bind({});
SliderTheme.args = {
  status: 'slider',
  sizePage: 'default',
  circleSize: 'half',
};

export const PersonalTheme = Template.bind({});
PersonalTheme.args = {
  status: 'personal',
  sizePage: 'default',
  circleSize: 'half',
};

export const PersonalBigTheme = Template.bind({});
PersonalBigTheme.args = {
  status: 'personal',
  sizePage: 'medium',
  circleSize: 'fullMedium',
};

export const PersonalBigFullCircleTheme = Template.bind({});
PersonalBigFullCircleTheme.args = {
  status: 'personal',
  sizePage: 'big',
  circleSize: 'full',
};

export const MobileTheme = Template.bind({});
MobileTheme.args = {
  status: 'mobile',
  sizePage: 'default',
  circleSize: 'half',
};
