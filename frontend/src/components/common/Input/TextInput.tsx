import './input.css';
import { ChangeEvent } from 'react';

export type TextInputProps = {
  id: string;
  type: 'text' | 'email';
  label: string;
  placeholder: string;
  value?: string;
  error?: string;
  onChange?: (arg?: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
};

export const TextInput = ({
  id,
  label,
  error,
  ...inputProps
}: TextInputProps) => {
  const className = error ? 'TextInputError' : '';

  return (
    <div className="TextInput">
      <label htmlFor={id}>{label}</label>
      <div className="InputContainer">
        <input className={className} name={id} {...inputProps} />
      </div>
      {!!error && <div className="TextInputErrorMsg">{error}</div>}
    </div>
  );
};
