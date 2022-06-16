import React from 'react';
import { useField } from 'formik';
import { SimpleSelect, SelectProps } from './Select';

export const SelectField: React.FC<SelectProps> = ({
  name,
  options,
  ...rest
}) => {
  const [field, meta, { setValue }] = useField(name);

  const handleChange = (option: any) => {
    setValue(option.value);
  };

  return (
    <SimpleSelect
      {...field}
      {...rest}
      value={meta.value}
      onChange={handleChange}
      options={options}
      isInvalid={!!meta.error && !!meta.touched}
      errorText={String(meta.error)}
    />
  );
};
