import React from 'react';
import clsx from 'clsx';
import { overrideTailwindClasses } from 'tailwind-override';
import Select, { components } from 'react-select';
import { Typography } from '../Typography/Typography';
import { ReactComponent as ArrowDownIcon } from './arrow-down.svg';
import { ReactComponent as ArrowUpIcon } from './arrow-up.svg';
import { styles } from './select.styles';

interface Option {
  label: string;
  value: string;
}

type ReactSelectProps = Parameters<Select>[0];
export interface SelectProps extends ReactSelectProps {
  className?: string;
  label?: string;
  size?: 'xlarge' | 'large' | 'medium' | 'small' | 'default';
  name: string;
  options: Option[];
  isSearchable?: boolean;
  placeholder?: string;
  isInvalid?: boolean;
  errorText?: string;
  isMulti?: boolean;
  onChange?: (option: any, action: { action: string }) => void;
}

const STYLES = {
  xlarge: 'w-586',
  large: 'w-480',
  medium: 'w-343',
  small: 'w-285',
  default: '',
};

const IndicatorSeparator = () => null;
const DropdownIndicator: typeof components.DropdownIndicator = (props) => {
  const ArrowIcon = props.selectProps.menuIsOpen ? ArrowUpIcon : ArrowDownIcon;
  return <ArrowIcon />;
};

export const SimpleSelect: React.FC<SelectProps> = ({
  className,
  name,
  label,
  size = 'default',
  options,
  placeholder,
  isInvalid,
  errorText,
  ...restProps
}) => {
  const selectedOption = options?.find(
    (item) => item.value === restProps.value,
  );
  return (
    <div>
      {label && (
        <Typography
          type="Ag-13-medium"
          className={clsx('mb-0.5 text-greyScaleGrey')}
        >
          {label}
        </Typography>
      )}

      <Select
        aria-label="Select"
        name={name}
        className={overrideTailwindClasses(clsx(`${STYLES[size]}`, className))}
        components={{ IndicatorSeparator, DropdownIndicator }}
        placeholder={placeholder}
        options={options}
        isSearchable={true}
        isMulti={false}
        styles={styles}
        {...restProps}
        value={selectedOption}
      />
      {isInvalid && errorText && (
        <Typography
          type="Ag-13-medium"
          className={clsx(' text-secondaryRed mt-0.5')}
        >
          {errorText}
        </Typography>
      )}
    </div>
  );
};
