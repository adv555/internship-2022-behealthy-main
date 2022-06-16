import { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import './portal-header-avatar.css';
import { ReactComponent as AvatarIcon } from 'assets/icons/header/avatar.svg';

interface PortalHeaderAvatarProps {
  profileLink: string;
  icon?: ReactNode;
}

export const PortalHeaderAvatar: FC<PortalHeaderAvatarProps> = ({
  profileLink,
  icon = <AvatarIcon />,
}) => {
  return (
    <Link
      to={profileLink}
      className="block avatar w-10 h-10 rounded-full bg-neutral-200 overflow-hidden"
    >
      {icon}
    </Link>
  );
};
