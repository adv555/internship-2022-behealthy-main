import { ComponentMeta, ComponentStory } from '@storybook/react'
import { SimpleSelect } from './Select'
import '../../../assets/styles/tailwind.css'
import '../../../assets/styles/fonts.css'

export default {
  title: 'UI/Controls/Select',
  component: SimpleSelect,
} as ComponentMeta<typeof SimpleSelect>

const options = [
  { value: '1', label: 'Option A' },
  { value: '2', label: 'Option B' },
  { value: '3', label: 'Option C' },
  { value: '4', label: 'Option D' },
  { value: '5', label: 'Option E' },
  { value: '6', label: 'Option F' },
  { value: '7', label: 'Option G' },
  { value: '8', label: 'Option H' },
]

const Template: ComponentStory<typeof SimpleSelect> = args => <SimpleSelect {...args} />

export const SingleSelect = Template.bind({})
SingleSelect.args = {
  className: '',
  name: 'single-select-default',
  label: 'Dropdown',
  size: 'default',
  options,
  isSearchable: true,
  placeholder: 'Option',
  isInvalid: false,
  errorText: 'Required',
  isMulti: false,
}

export const SingleSelectSmall = Template.bind({})
SingleSelectSmall.args = {
  className: '',
  name: 'single-select-small',
  label: 'Dropdown',
  size: 'small',
  options: options.slice(0, 3),
  isSearchable: true,
  placeholder: 'Option',
  isInvalid: false,
  errorText: 'Required',
  isMulti: false,
}

export const MultiSelect = Template.bind({})

MultiSelect.args = {
  className: '',
  name: 'multi-select',
  label: 'Dropdown',
  size: 'medium',
  options,
  placeholder: 'Option',
  isInvalid: false,
  isSearchable: true,
  errorText: 'Required',
  isMulti: true,
}

export const Component: ComponentStory<typeof SimpleSelect> = args => <SimpleSelect {...args} />

Component.args = {
  name: 'single-select-default',
  label: 'Dropdown',
  size: 'default',
  options,
  isSearchable: true,
  placeholder: 'Select an option',
  isInvalid: false,
  errorText: 'Required',
  isMulti: false,
}

export const Variants: ComponentStory<React.FC> = () => {
  const variants = ['default', 'xlarge', 'large', 'medium', 'small'] as const

  return (
    <div className="flex flex-col">
      {variants.map(size => (
        <div key={size} className="mt-2 flex flex-col">
          <div className="mr-4 ">{size}:</div>
          <SimpleSelect
            name={`select-${size}`}
            label="Dropdown"
            size={size}
            options={size !== 'small' ? options : options.slice(0, 3)}
            isSearchable={true}
            placeholder={`Select an option ${size}`}
            isInvalid={false}
            errorText={`Required ${size}`}
            isMulti={false}
          />
        </div>
      ))}
    </div>
  )
}
