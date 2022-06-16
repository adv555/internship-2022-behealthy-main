// import { FocusEvent } from 'react';
import './input.css';

import PhoneNumberInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

export type PhoneInputProps = {
  id: string;
  placeholder: string;
  label?: string;
  value?: string;
  error?: string | React.ReactNode;
  setFieldValue?: (field: string, value: any, shouldValidate?: boolean) => void;
};

export const PhoneInput = ({
  id,
  label = 'Phone',
  error,
  setFieldValue,
  ...inputProps
}: PhoneInputProps) => {
  return (
    <div className="TextInput">
      <label htmlFor={id}>{label}</label>

      <div className="InputContainer">
        <PhoneNumberInput
          className="w-full"
          name={id}
          international
          initialValueFormat="national"
          defaultCountry="UA"
          onChange={(val: string) => {
            setFieldValue && setFieldValue(id, val || '', true);
          }}
          {...inputProps}
        />
      </div>
      {!!error && <div className="TextInputErrorMsg">{error}</div>}
    </div>
  );
};
