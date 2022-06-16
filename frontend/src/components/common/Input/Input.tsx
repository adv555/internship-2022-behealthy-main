import clsx from 'clsx';
import React from 'react';
import { overrideTailwindClasses } from 'tailwind-override';
import { Typography } from '../../../components/common/Typography';
import './input.css';
import { InputProps } from './types/input-props.interface';

export const Input: React.FC<InputProps> = ({
  className,
  label,
  name,
  placeholder,
  isInvalid,
  error,
  type,

  ...restHTMLProps
}) => {
  return (
    <div className="TextInput">
      {label && (
        <Typography
          type="Ag-13-medium"
          className={clsx('mb-0.5 text-greyScaleGrey')}
        >
          {label}
        </Typography>
      )}
      <div className="InputContainer">
        <input
          className={overrideTailwindClasses(
            clsx(
              {
                'border-greyScaleGrey': !isInvalid,
                'border-secondaryRed': isInvalid,
              },
              className,
            ),
          )}
          name={name}
          type={type}
          placeholder={placeholder}
          {...restHTMLProps}
        />
      </div>

      {isInvalid && error && (
        <Typography type="Ag-13-medium" className={'text-secondaryRed mt-1'}>
          {error}
        </Typography>
      )}
    </div>
  );
};
