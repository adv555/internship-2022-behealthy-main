import CreatableSelect from 'react-select/creatable';
import { ActionMeta, OnChangeValue } from 'react-select';
import './MultiSelect.css';
import { useState } from 'react';

export type CreatableMultiSelectProps<T> = {
  name: string;
  label: string;
  options: T[];
  value: T[];
  setFieldValue: (field: string, value: T[], shouldValidate?: boolean) => void;
  saveNewOption: (option: T) => Promise<T>;
  error?: string;
};

export const CreatableMultiSelect = <T,>({
  name,
  label,
  options,
  value,
  setFieldValue,
  saveNewOption,
  error,
}: CreatableMultiSelectProps<T>) => {
  const [isLoading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(error);

  const handleChange = async (
    newValue: OnChangeValue<T, true>,
    actionMeta: ActionMeta<T>,
  ) => {
    setErrorMsg(error);

    if (
      actionMeta.option &&
      (actionMeta.option as { __isNew__?: unknown }).__isNew__
    ) {
      setLoading(true);
      saveNewOption(actionMeta.option)
        .then((newOption) => setFieldValue(name, [...value, newOption]))
        .catch((e) => setErrorMsg(e))
        .finally(() => setLoading(false));
    } else {
      setFieldValue(name, Array.from(newValue));
    }
  };

  return (
    <div className="MultiSelect">
      <label htmlFor={name}>{label}</label>
      <CreatableSelect
        className="MultiSelect__container"
        classNamePrefix="MultiSelect"
        isMulti
        isClearable
        onChange={handleChange}
        options={options}
        value={value}
        isDisabled={isLoading}
        isLoading={isLoading}
      />
      {!!errorMsg && <div className="ErrorMsg">Server error: {errorMsg}</div>}
    </div>
  );
};
