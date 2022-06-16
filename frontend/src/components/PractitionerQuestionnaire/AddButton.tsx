import { MouseEventHandler } from 'react';
import { ReactComponent as Plus } from 'assets/icons/practitionerQuestionnaire/plus.svg';
import { ReactComponent as Minus } from 'assets/icons/practitionerQuestionnaire/minus.svg';

interface AddButtonProps {
  label: string;
  onClick?: MouseEventHandler;
  styles?: string;
  icon?: Icon;
}

export enum Icon {
  PLUS,
  MINUS,
}

export const AddButton = ({
  label,
  onClick,
  styles = '',
  icon = Icon.PLUS,
}: AddButtonProps) => {
  return (
    <button
      className={
        'flex flex-row gap-2 relative w-36 text-Ag-15 font-medium text-greyScaleMainBlack ' +
        styles.trim()
      }
      onClick={onClick}
      type="button"
    >
      <span className="relative inline-block w-6 h-6">
        <svg
          className="absolute inset-0 fill-primaryBlue hover:fill-secondaryBlue2 focus:fill-secondaryBlue "
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="12" r="12" />
        </svg>
        <span className="absolute inset-1/4 h-3 w-3">
          {icon === Icon.PLUS && <Plus />}
          {icon === Icon.MINUS && <Minus />}
        </span>
      </span>

      {label}
    </button>
  );
};
