import CreatableSelect from 'react-select/creatable';
import { OnChangeValue } from 'react-select';
import './MultiSelect.css';

export type Item = {
  value: string;
  label: string;
};

export type PoorMultiSelectProps = {
  name: string;
  label: string;
  value: string[];
  setFieldValue: (
    field: string,
    value: string[],
    shouldValidate?: boolean,
  ) => void;
  errors?: string[];
  placeholder?: string;
  className?: string;
};

export const PoorMultiSelect = ({
  name,
  label,
  value,
  setFieldValue,
  errors,
  ...rest
}: PoorMultiSelectProps) => {
  const handleChange = (newValue: OnChangeValue<Item, true>) => {
    setFieldValue(
      name,
      newValue.map(({ value }) => value),
    );
  };

  const items = value.map((val) => ({ value: val, label: val }));

  return (
    <div className="MultiSelect PoorMultiSelect">
      <label htmlFor={name}>{label}</label>
      <CreatableSelect
        className="MultiSelect__container"
        classNamePrefix="MultiSelect"
        isMulti
        isClearable
        onChange={handleChange}
        value={items}
        {...rest}
      />
      {errors &&
        errors
          .filter((error) => !!error)
          .map((error) => (
            <div className="ErrorMsg">Server error: {error}</div>
          ))}
    </div>
  );
};
