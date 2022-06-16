import React from 'react';
import { useField } from 'formik';
import { Input } from './Input';
import { InputProps } from './types/input-props.interface';

type InputFieldProps = Omit<InputProps, 'isInvalid' | 'error'>;

const TextInputField: React.FC<InputFieldProps> = ({ name, ...rest }) => {
  const [field, meta] = useField(name);

  return (
    <Input
      {...field}
      {...rest}
      isInvalid={!!meta.error && !!meta.touched}
      error={String(meta.error)}
    />
  );
};

export default TextInputField;
