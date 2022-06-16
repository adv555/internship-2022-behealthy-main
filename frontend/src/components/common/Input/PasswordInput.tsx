import { useState } from 'react';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import './input.css';

export type PasswordInputProps = {
  id: string;
  label: string;
  placeholder: string;
  value?: string;
  error?: string;
};

export const PasswordInput = ({
  id,
  label,
  error,
  ...inputProps
}: PasswordInputProps) => {
  const [visible, setVisible] = useState(false);
  const className = error ? 'TextInputError' : '';

  return (
    <div className="TextInput">
      <label htmlFor={id}>{label}</label>
      <div className="InputContainer">
        <input
          className={className}
          name={id}
          type={visible ? 'text' : 'password'}
          {...inputProps}
        />
        {visible === true ? (
          <BsEye className="Icon" size={27} onClick={() => setVisible(false)} />
        ) : (
          <BsEyeSlash
            className="Icon"
            size={27}
            onClick={() => setVisible(true)}
          />
        )}
      </div>
      {!!error && <div className="TextInputErrorMsg">{error}</div>}
    </div>
  );
};
