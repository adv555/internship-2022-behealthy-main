import React from 'react';
import { ReactComponent as ArrowLeft } from '../../../assets/icons/chevron.left.svg';

interface GoBackButtonProps {
  onClick?: () => void;
  children?: React.ReactNode | string;
}

const GoBackButton: React.FC<GoBackButtonProps> = ({ onClick, children }) => {
  return (
    <button
      className="inline-flex justify-center items-center"
      type="button"
      onClick={onClick}
    >
      <ArrowLeft className="mr-15px ml-2 w-6 h-6" />
      <div className="font-semibold text-16px">{children || 'Back'}</div>
    </button>
  );
};

export default GoBackButton;
