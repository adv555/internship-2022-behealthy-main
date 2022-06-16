import clsx from 'clsx';
import { FC, ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { Typography } from '../Typography';
import './menu-item.css';

interface MenuItemProps {
  key?: number | string;
  link: string;
  icon: ReactNode;
  label: string;
  linkClassName: string;
}

export const MenuItem: FC<MenuItemProps> = ({
  link,
  icon,
  label,
  linkClassName,
}) => {
  return (
    <NavLink
      to={link}
      className={clsx('menu-item w-full flex items-center', linkClassName)}
    >
      <div className="menu-icon w-6 h-6 mr-2">{icon}</div>
      <Typography type="Ag-16-semibold" className="menu-item-label transition">
        {label}
      </Typography>
    </NavLink>
  );
};
