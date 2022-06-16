import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Radio } from './Radio';

export default {
  title: 'Forms/Radio',
  component: Radio,
  agrTypes: {
    name: {
      control: 'text',
    },
    value: {
      control: 'text',
      description: 'A default value of the radio button',
    },
    label: {
      control: 'text',
      description: 'A label for the radio button',
    },
  },
} as ComponentMeta<typeof Radio>;

const Template: ComponentStory<typeof Radio> = (args) => <Radio {...args} />;

export const Default = Template.bind({});

export const WithLabel = Template.bind({});
WithLabel.args = {
  label: 'Radio button',
  name: 'radio-button',
};
