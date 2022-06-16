import { ReactComponent as Circle } from 'assets/icons/circle.svg';
import clsx from 'clsx';
import { FC } from 'react';

interface AddFormButtonProps {
  label?: string;
  onClick?(): void;
  className?: string;
}

export const AddFormButton: FC<AddFormButtonProps> = ({
  label,
  onClick,
  className,
}) => {
  return (
    <button
      type="button"
      className={clsx('flex items-center', className)}
      onClick={onClick}
    >
      <div className="w-6 h-6 mr-2">
        <Circle />
      </div>
      <span className="hover:text-blue">{label}</span>
    </button>
  );
};
