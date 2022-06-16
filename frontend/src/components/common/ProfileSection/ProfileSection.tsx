import { FC, ReactNode } from 'react';
import { Typography } from '../Typography';

interface ProfileSectionProps {
  title: string;
  children?: ReactNode;
}

export const ProfileSection: FC<ProfileSectionProps> = ({
  title,
  children,
}) => {
  return (
    <div className="w-full pt-4 pb-20 pl-9 pr-10">
      <div className="w-full 2xl:max-w-[544px] mx-auto">
        <Typography type="h4" tagName="h2" className="mb-4">
          {title}
        </Typography>
        {children}
      </div>
    </div>
  );
};
