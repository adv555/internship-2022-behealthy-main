import { ReactComponent as RemoveIcon } from 'assets/icons/remove.svg';
import clsx from 'clsx';
import { FC } from 'react';

interface RemoveFormButtonProps {
  label?: string;
  onClick?(): void;
  className?: string;
}

export const RemoveFormButton: FC<RemoveFormButtonProps> = ({
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
        <RemoveIcon />
      </div>
      <span className="hover:text-error">{label}</span>
    </button>
  );
};
