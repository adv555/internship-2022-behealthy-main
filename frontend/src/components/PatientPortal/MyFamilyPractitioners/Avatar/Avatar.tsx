import React from 'react';
import clsx from 'clsx';

interface PractitionerAvatarProps {
  avatar?: string;
  name?: string;
  className?: string;
}

export const Avatar: React.FC<PractitionerAvatarProps> = ({
  avatar,
  name,
  className,
}) => {
  return (
    <div
      className={clsx(
        'flex bg-neutral-200 rounded-full overflow-hidden shrink-0',
        className,
      )}
    >
      <img
        src={avatar}
        alt={name}
        className="block object-cover object-center w-full h-full"
      />
    </div>
  );
};
