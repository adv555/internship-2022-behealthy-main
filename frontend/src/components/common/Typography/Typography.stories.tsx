import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { Typography } from '../Typography/Typography'

import '../../../assets/styles/tailwind.css'
import '../../../assets/styles/fonts.css'
import { config } from './config'

export default {
  title: 'UI/Controls/Typography',
  component: Typography,
  argTypes: {
    type: {
      control: {
        type: 'select',
        options: Object.keys(config),
      },
    },
  },
} as ComponentMeta<typeof Typography>

export const Component: ComponentStory<typeof Typography> = args => <Typography {...args} />

Component.args = {
  children: 'Medical information',
  type: 'h1',
}

export const Variants: ComponentStory<React.FC> = () => {
  const variants = Object.keys(config) as (keyof typeof config)[]
  return (
    <div>
      {variants.map(type => (
        <div key={type} className="mt-2 flex flex-row">
          <div className="mr-4">{type}:</div>
          <Typography type={type}>{'Medical information'}</Typography>
        </div>
      ))}
    </div>
  )
}
