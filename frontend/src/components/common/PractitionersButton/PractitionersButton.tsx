import React from 'react';
import { ReactComponent as DoctorsIcon } from '../../../assets/icons/doctors.svg';

interface PractitionersButtonProps {
  onClick?: () => void;
  children?: React.ReactNode | string;
}

const PractitionersButton: React.FC<PractitionersButtonProps> = ({
  onClick,
  children,
}) => {
  return (
    <button
      className="inline-flex justify-center items-center"
      type="button"
      onClick={onClick}
    >
      <DoctorsIcon className="mr-15px ml-2 w-6 h-6" />
      {children}
    </button>
  );
};

export default PractitionersButton;
