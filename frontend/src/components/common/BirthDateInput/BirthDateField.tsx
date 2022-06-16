import React from 'react';
import { useField } from 'formik';
import BirthDateInput from './BirthDate';

interface IProps {
  error?: string;
  className?: string;
  label?: string;
  name: string;
  returnDate?: (value: string) => void;
}

export const BirthDateField: React.FC<IProps> = ({
  error = '',
  className = '',
  name = 'date',
  label = 'Date of Birth',
}) => {
  const [field, , { setValue }] = useField(name);
  const handleChange = (value: string) => {
    setValue(value, false);
  };

  return (
    <BirthDateInput
      {...field}
      fullDate={field.value}
      error={error}
      className={className}
      returnDate={handleChange}
      label={label}
    />
  );
};
