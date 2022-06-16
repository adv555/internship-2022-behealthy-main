import { NavLink } from 'react-router-dom';
import { ReactComponent as ArrowIcon } from '../../../assets/icons/header/arrow.svg';
import './profile-menu-item.css';

interface ProfileMenuItemProps {
  link: string;
  title: string;
}

export const ProfileMenuItem = ({ link, title }: ProfileMenuItemProps) => {
  return (
    <NavLink to={link} className="profile-menu-item">
      <span>{title}</span>
      <div className="w-6 h6 -rotate-90">
        <ArrowIcon />
      </div>
    </NavLink>
  );
};
