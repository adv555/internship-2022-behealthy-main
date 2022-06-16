import { Story } from '@storybook/react';
import { PasswordInput, PasswordInputProps } from './PasswordInput';

export default {
  component: PasswordInput,
  title: 'Forms/PasswordInput',
};

const Template: Story<PasswordInputProps> = (args: PasswordInputProps) => (
  <PasswordInput {...args} />
);

export const EmptyInput = Template.bind({});
EmptyInput.args = {
  id: 'PasswordInput',
  label: 'Password',
  placeholder: 'Enter your password',
};

export const NotEmptyInput = Template.bind({});
NotEmptyInput.args = {
  id: 'PasswordInput',
  label: 'Password',
  placeholder: 'Enter your password',
  value: 'passwd',
};

export const ErrorInput = Template.bind({});
ErrorInput.args = {
  id: 'PasswordInput',
  label: 'Password',
  placeholder: 'Enter your password',
  error: 'Error!',
};
