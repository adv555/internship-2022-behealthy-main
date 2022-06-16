import { Button } from 'components/common/Button/Button';
import { Typography } from 'components/common/Typography';
import { Link } from 'react-router-dom';
import './person-card.css';
import { DeclarationCardProperty } from './DeclarationCardProperty';
import { AppRoute } from 'common/enums/app/app-route.enum';

interface PersonCardProps {
  avatar: string;
  name: string;
  phone: string;
  adress: string;
  buttonConfig: {
    leftButton: { label: string; onClick: () => void };
    rightButtion: { label: string; onClick: () => void };
    linkButton?: { onClick: React.MouseEventHandler };
  };
}

export const PersonCard = ({
  avatar,
  name,
  phone,
  adress,
  buttonConfig,
}: PersonCardProps) => {
  return (
    <div className="person-card">
      <div className="flex items-center mb-4">
        <div className="person-card-avatar">
          <img src={avatar} alt={name} />
        </div>
        <Typography type="Ag-16-medium" tagName="h3" className="w-full">
          {name}
        </Typography>
      </div>
      <div className="mb-5">
        <DeclarationCardProperty
          property="Phone number"
          value={phone}
          rootClassName="mb-4"
        />
        <DeclarationCardProperty property="Address" value={adress} />
      </div>
      <div className="mt-auto text-center">
        <Link
          to={AppRoute.PRACTITIONER_PORTAL_PATIENT_DETAILS}
          className="text-blue text-Ag-16 font-semibold"
          onClick={buttonConfig.linkButton?.onClick}
        >
          View Details
        </Link>
        <div className="flex flex-col sm:flex-row justify-between mt-5">
          <Button
            nameBtn="decline"
            label={buttonConfig.leftButton.label}
            className="w-[100%] mb-4 desktop:w-full sm:mr-2"
            onClick={buttonConfig.leftButton.onClick}
          />
          <Button
            nameBtn="accept"
            label={buttonConfig.rightButtion.label}
            className="w-[100%] desktop:w-full sm:ml-2"
            onClick={buttonConfig.rightButtion.onClick}
          />
        </div>
      </div>
    </div>
  );
};
