import React, { useState } from 'react';

export interface IInputProps {
  id: string;
  type: string;
  placeholder: string;
  errors: string;
  touched: string;
  onChange: () => void;
  onBlur: () => void;
}

type TLiteral = 'password' | 'text';

export const SignInput = (props: IInputProps) => {
  const { id, type, placeholder, errors, touched, onChange, onBlur } = props;

  const [isShowPswd, setIsShowPswd] = useState<boolean>(true);
  const [passwordType, setPasswodType] = useState<TLiteral>('password');

  const handlePress = () => {
    setIsShowPswd((prev) => !prev);
    setPasswodType((prev) => (prev === 'password' ? 'text' : 'password'));
  };

  return (
    <>
      <label
        htmlFor={id}
        className="text-greyScaleGrey leading-5 font-barlow font-medium text-signLabel"
      >
        {type.charAt(0).toLocaleUpperCase() + type.slice(1)}
      </label>
      <span className="p-1.5 border-solid border-2 rounded-lg border-greyScaleGrey">
        {type === 'email' ? (
          <input
            type={type}
            id={id}
            placeholder={placeholder}
            onChange={onChange}
            onBlur={onBlur}
            className="font-barlow bg-backgroundColour text-signInput leading-4 h-7 focus:outline-none w-full"
          />
        ) : (
          <input
            type={passwordType}
            id={id}
            placeholder={placeholder}
            onChange={onChange}
            onBlur={onBlur}
            className="font-barlow text-signInput leading-4 bg-backgroundColour focus:outline-none w-11/12"
            autoComplete="off"
          />
        )}

        {type === 'password' ? (
          <i
            className={`p-3 absolute right-3.5  ${
              isShowPswd
                ? `bg-[url('assets/img/signIn/eye.svg')] `
                : `bg-[url('assets/img/signIn/eyeHide.svg')]`
            } bg-no-repeat cursor-pointer`}
            onClick={handlePress}
          ></i>
        ) : null}
      </span>
      <span className="h-5">
        {touched && errors && (
          <div className="font-barlow text-rose-600">{errors}</div>
        )}
      </span>
    </>
  );
};
