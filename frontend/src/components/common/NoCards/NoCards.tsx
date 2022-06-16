import { Typography } from '../Typography';

import { ReactComponent as NoCardsImage } from 'assets/icons/no_cards.svg';
import { FC } from 'react';

interface NoCardsProps {
  label: string;
}

export const NoCards: FC<NoCardsProps> = ({ label }) => {
  return (
    <div className="w-full h-full flex items-center justify-center flex-col mt-10">
      <div className="w-full md:w-96 mb-7">
        <NoCardsImage />
      </div>
      <Typography type="Ag-14-regular" className="text-gray text-lg">
        {label}
      </Typography>
    </div>
  );
};
