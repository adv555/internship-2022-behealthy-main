import React from 'react';
import { ReactComponent as AppointmentIcon } from '../../../assets/icons/appointment.svg';

interface ScheduleButtonProps {
  onClick?: () => void;
}

export const ScheduleButton: React.FC<ScheduleButtonProps> = ({ onClick }) => {
  return (
    <button
      className="inline-flex justify-center items-center"
      type="button"
      onClick={onClick}
    >
      <AppointmentIcon className="mr-15px ml-2 w-6 h-6" />
    </button>
  );
};
