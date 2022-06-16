import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Checkbox } from './Checkbox';

export default {
  title: 'Forms/Checkbox',
  component: Checkbox,
  agrTypes: {
    value: {
      control: 'text',
      description: 'A default value of the checkbox',
    },
    label: {
      control: 'text',
      description: 'A label for the checkbox',
    },
  },
} as ComponentMeta<typeof Checkbox>;

const Template: ComponentStory<typeof Checkbox> = (args) => (
  <Checkbox {...args} />
);

export const Default = Template.bind({});

export const WithLabel = Template.bind({});
WithLabel.args = {
  label: 'Checkbox',
};
