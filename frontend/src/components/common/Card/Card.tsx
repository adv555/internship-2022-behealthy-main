import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography } from '../Typography/Typography';

interface CardProps {
  Icon: React.ElementType;
  text: string;
  link: string;
}

const Card: React.FC<CardProps> = ({ Icon, text, link }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(link)}
      className="w-full shadow-card rounded-24px
            flex-col gap-16px bg-backgroundColour
            hover:cursor-pointer hover:bg-fieldChosen mb-32px
            "
    >
      <div className="mx-208px pt-44px mb-20px">
        <Icon className="rounded-full w-64px h-64px" />
      </div>
      <div className="pt-20px pb-30px">
        <Typography
          type="Ag-16-semibold"
          children={text}
          className="text-center text-primaryBlue"
        />
      </div>
    </div>
  );
};

export default Card;
