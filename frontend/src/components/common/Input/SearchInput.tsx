import React from 'react';
import clsx from 'clsx';
import './input.css';
import { ReactComponent as Glass } from 'assets/icons/glass.svg';

export type SearchInputProps = {
  id: string;
  label?: string;
  placeholder: string;
  value?: string;
  onKeyDown?: React.KeyboardEventHandler;
  size?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const SearchInput = ({
  id,
  label,
  size = 'w-[336px]',
  ...inputProps
}: SearchInputProps) => {
  return (
    <div className="TextInput InputWithIcon ">
      <label htmlFor={id}>{label}</label>
      <div className={clsx('InputContainer relative', size)}>
        <div className="absolute left-4 top-4 w-[16px] h-[16px]">
          <Glass />
        </div>
        <input name={id} type={'text'} {...inputProps} />
      </div>
    </div>
  );
};
