import React from 'react';
import clsx from 'clsx';
import { overrideTailwindClasses } from 'tailwind-override';
import '../../../assets/styles/tailwind.css';
import '../../../assets/styles/fonts.css';
import { ReactComponent as GoogleIcon } from './icon-google.svg';

interface ButtonProps {
  label?: string;
  nameBtn?:
    | 'primary'
    | 'accept'
    | 'decline'
    | 'tertiary'
    | 'google'
    | 'google2';
  disabled?: boolean;
  size?: 'sm' | 'sm2' | 'md' | 'lg' | 'xlg';
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  children?: React.ReactNode;
  icon?: React.ReactNode | HTMLAllCollection | string;
  onClick?: () => void;
}

const STYLES = {
  primary:
    'p-3 h-12 font-semibold  w-md text-greyScaleWhite  border-none rounded-lg bg-primaryBlue hover:bg-secondaryBlue2 focus:bg-secondaryBlue disabled:bg-disabledBlue disabled:text-disabledWhite desktop:w-xlg',

  accept:
    'p-3 h-12 font-semibold  w-sm text-greyScaleWhite  border-none rounded-lg bg-primaryBlue hover:bg-secondaryBlue2 focus:bg-secondaryBlue disabled:bg-disabledBlue',
  decline:
    'p-3 h-12 font-semibold  w-sm text-greyScaleMainBlack  border border-greyScaleMainBlack rounded-lg bg-transparent ',
  tertiary:
    'px-3 py-1 font-semibold  w-md text-primaryBlue border-none hover:text-secondaryBlue2 focus:text-secondaryBlue disabled:text-disabledBlue desktop:py-0',
  google:
    'py-3 font-semibold  w-md rounded-3xl text-primaryBlue border border-primaryBlue desktop:w-lg desktop:rounded-lg',
  google2: 'font-normal w-md',
};

export const Button: React.FC<ButtonProps> = ({
  nameBtn = 'primary',
  label = '',
  type = 'button',
  size = 'lg',
  disabled = false,
  className,
  children,
  icon,
  onClick,
  ...props
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={overrideTailwindClasses(
        clsx(
          `flex justify-center items-center  text-center text-base box-border transition  duration-200 cursor-pointer ${STYLES[nameBtn]}  desktop:w-${size}`,
          className,
        ),
      )}
      {...props}
    >
      {nameBtn === 'google' ? <GoogleIcon className="w-5 h-5 mr-2" /> : icon}

      {nameBtn === 'google2' ? (
        <>
          <span className="text-greyScaleMainBlack mr-1 ">{children}</span>
          <span className=" text-primaryBlue hover:font-medium focus:font-medium ">
            {label}
          </span>
        </>
      ) : (
        label
      )}
    </button>
  );
};
