import clsx from 'clsx';
import { useState } from 'react';
import { ReactComponent as ArrowIcon } from '../../../assets/icons/header/arrow.svg';
import './options-dropdown.css';

interface OptionsItem {
  title: string;
  label: string;
}

interface OptionsDropdownProps {
  defaultOption: string;
  options: OptionsItem[];
}

export const OptionsDropdown = ({
  defaultOption,
  options,
}: OptionsDropdownProps) => {
  const [currentOption, setCurrentOption] = useState(defaultOption);
  const [ddVisibility, setDdVisibility] = useState(false);

  const ddVisibilityClass = ddVisibility ? 'block' : 'hidden';

  const showDropdown = () => setDdVisibility(!ddVisibility);
  const chooseOption = (label: string) => {
    setCurrentOption(label);
    setDdVisibility(false);
  };

  return (
    <div className="relative">
      <button
        className="flex justify-between items-center w-11 h6"
        onClick={showDropdown}
      >
        {currentOption}
        <div
          className={clsx(
            'icon w-6 h-6 ml-1 transition',
            ddVisibility && 'options-dropdown-open',
          )}
        >
          <ArrowIcon />
        </div>
      </button>
      <div className={clsx('options-dropdown', ddVisibilityClass)}>
        {options.map(({ title, label }) => (
          <button
            key={label}
            className={clsx(
              'w-full text-left py-2 px-1 rounded-lg',
              label === currentOption && 'options-dropdown-active',
            )}
            onClick={() => chooseOption(label)}
          >
            {title}
          </button>
        ))}
      </div>
    </div>
  );
};
