import React from 'react'
import withFormik from 'storybook-formik'

import { useField } from 'formik'
import { SelectField } from './SelectField'

const PersonalInfoSubform = () => {
  const [field, meta, { setValue }] = useField('select')
  const handleChange = (option: any) => {
    setValue(option.value)
  }
  return (
    <SelectField
      {...field}
      options={[
        { value: '1', label: 'Option A' },
        { value: '2', label: 'Option B' },
        { value: '3', label: 'Option C' },
        { value: '4', label: 'Option D' },
        { value: '5', label: 'Option E' },
        { value: '6', label: 'Option F' },
        { value: '7', label: 'Option G' },
        { value: '8', label: 'Option H' },
      ]}
      value={meta.value}
      onChange={handleChange}
      isInvalid={!!meta.error && !!meta.touched}
      errorText={String(meta.error)}
      isMulti={false}
      placeholder="Option"
    />
  )
}

export default {
  title: 'UI/Controls/SelectField',
  component: SelectField,
  decorators: [withFormik],
  parameters: {
    formik: {
      initialValues: {
        select: '',
      },

      onSubmit: (values: any, { setSubmitting }: any) => {
        console.log(values)
        setSubmitting(false)
      },
    },
  },
}

const Template = (args: JSX.IntrinsicAttributes) => <PersonalInfoSubform {...args} />
export const Default = Template.bind({})
