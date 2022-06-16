import { FC } from 'react';
import { ProfileMenuItem } from '../ProfileMenuItem/ProfileMenuItem';
import { Typography } from '../Typography';
import './profile-menu.css';

interface ProfileMenuStructureItem {
  title: string;
  link: string;
}

interface ProfileMenuProps {
  menuTitle: string;
  structure: ProfileMenuStructureItem[];
}

export const ProfileMenu: FC<ProfileMenuProps> = ({ menuTitle, structure }) => {
  return (
    <div className="profile-menu">
      <Typography
        type="h4"
        tagName="h2"
        className="py-4 pl-6 pr-8 2xl:pl-9 2xl:pr-12"
      >
        {menuTitle}
      </Typography>
      <nav>
        {structure.map(({ title, link }) => (
          <ProfileMenuItem key={link} title={title} link={link} />
        ))}
      </nav>
    </div>
  );
};
