import { Story } from '@storybook/react';
import { TextInput, TextInputProps } from './TextInput';

export default {
  component: TextInput,
  title: 'Forms/TextInput',
};

const Template: Story<TextInputProps> = (args: TextInputProps) => (
  <TextInput {...args} />
);

export const EmptyInput = Template.bind({});
EmptyInput.args = {
  id: 'TextInputTest',
  type: 'text',
  label: 'input',
  placeholder: 'Enter something',
};

export const NotEmptyInput = Template.bind({});
NotEmptyInput.args = {
  id: 'TextInputTest',
  type: 'text',
  label: 'input',
  placeholder: 'Enter something',
  value: 'some text',
};

export const ErrorInput = Template.bind({});
ErrorInput.args = {
  id: 'TextInputTest',
  type: 'text',
  label: 'input',
  placeholder: 'Enter something',
  value: 'some text',
  error: 'Error!',
};
