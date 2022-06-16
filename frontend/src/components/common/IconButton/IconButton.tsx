import React from 'react';

interface IconButtonProps {
  onClick?: () => void;
  children?: React.ReactNode | string;
  icon: React.ReactNode | string;
}

export const IconButton: React.FC<IconButtonProps> = ({
  onClick,
  children,
  icon,
}) => {
  return (
    <button
      className="inline-flex justify-center items-center"
      type="button"
      onClick={onClick}
    >
      {icon}
      {children}
    </button>
  );
};
