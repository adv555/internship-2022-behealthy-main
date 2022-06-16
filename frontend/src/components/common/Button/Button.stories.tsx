import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Button } from './Button';
import { ReactComponent as GoogleIcon } from './icon-google.svg';

export default {
  title: 'UI/Controls/Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  nameBtn: 'primary',
  label: 'Sign in',
  size: 'lg',
  disabled: false,
  type: 'button',
};
export const Primary2 = Template.bind({});
Primary2.args = {
  nameBtn: 'primary',
  label: 'Continue',
  disabled: false,
  size: 'xlg',
  type: 'button',
  icon: null,
};

export const Accept = Template.bind({});
Accept.args = {
  nameBtn: 'accept',
  label: 'Accept',
  size: 'sm',
};
export const Decline = Template.bind({});
Decline.args = {
  nameBtn: 'decline',
  label: 'Decline',
  size: 'sm',
};

export const Tertiary = Template.bind({});
Tertiary.args = {
  nameBtn: 'tertiary',
  label: 'Skip',
  size: 'lg',
};

export const Google = Template.bind({});
Google.args = {
  nameBtn: 'google',
  label: 'Sign in with Google',
  size: 'lg',

  icon: GoogleIcon,
};

export const Google2 = Template.bind({});
Google2.args = {
  nameBtn: 'google2',
  children: 'Don’t have an account yet?',
  label: 'Sign Up',
  size: 'lg',
};

export const Component: ComponentStory<typeof Button> = (args) => (
  <Button {...args} />
);
Component.args = {
  nameBtn: 'primary',
  size: 'xlg',
  label: 'Continue',
  disabled: false,
  type: 'button',
  icon: null,
};

export const Variants: ComponentStory<React.FC> = () => {
  const variants = [
    { nameBtn: 'primary', label: 'Confirm Deleting Profile', size: 'xlg' },
    { nameBtn: 'primary', label: 'Save', size: 'lg' },
    { nameBtn: 'tertiary', label: 'Skip', size: 'lg' },
    { nameBtn: 'accept', label: 'Accept', size: 'sm' },
    { nameBtn: 'decline', label: 'Decline', size: 'sm' },
    { nameBtn: 'google', label: 'Sign in with Google', size: 'lg' },
    {
      nameBtn: 'google2',
      label: 'Sign Up',
      children: 'Don’t have an account yet?',
      size: 'lg',
    },
  ] as const;

  return (
    <div className="flex flex-col gap-3">
      {variants.map((variant) => (
        <div key={variant.nameBtn} className="flex flex-col gap-1">
          <div className="text-sm text-gray-600">{variant.nameBtn}</div>
          <Button {...variant} />
        </div>
      ))}
    </div>
  );
};
