import { Button } from 'components/common/Button/Button';
import { Typography } from 'components/common/Typography';
import { PractitionerCardProperty } from './PractitionerCardProperty';

interface PractitionerCardProps {
  avatar?: string;
  name?: string;
  experience?: string;
  phone?: string;
  address?: string;
  getProfile?: () => void;
  getDeclaration?: () => void;
  cancelRequest?: () => void;
  btnStatus?: string;
}

export const PractitionerCard = ({
  avatar,
  name,
  experience,
  phone,
  address,
  getProfile,
  getDeclaration,
  cancelRequest,
  btnStatus,
}: PractitionerCardProps) => {
  return (
    <div className=" border border-greyScaleGrey2 rounded-lg p-4 min-w-[338px]">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-neutral-200 mr-3 rounded-full overflow-hidden shrink-0">
          <img
            src={avatar || 'https://via.placeholder.com/150'}
            alt={name}
            className="block object-cover object-center w-full h-full"
          />
        </div>
        <div className="flex flex-col">
          <Typography
            type="Ag-16-medium"
            className="w-full inline-flex"
            children={name}
          />
          <Typography
            type="Ag-13-medium"
            className="w-full inline-flex text-greyScaleGrey"
            children={experience}
          />
        </div>
      </div>
      <div className=" mb-8">
        <PractitionerCardProperty
          property="Phone number"
          value={phone || 'N/A'}
          rootClassName="mb-4"
        />
        <PractitionerCardProperty
          property="Address of clinic"
          value={address || 'N/A'}
        />
      </div>
      <div className="mt-auto text-center">
        <div
          className="text-blue text-Ag-16 font-semibold"
          onClick={getProfile}
        >
          View Details
        </div>
        <div className="flex mt-4">
          {btnStatus === 'REQUESTED' || btnStatus === 'ACTIVE' ? (
            <Button
              nameBtn="decline"
              label="Cancel the declaration request"
              className=" w-[100%] min-w-[306px] desktop:w-full"
              onClick={cancelRequest}
            />
          ) : (
            <Button
              nameBtn="accept"
              label="Request a new declaration"
              className=" w-[100%] min-w-[306px] desktop:w-full"
              onClick={getDeclaration}
            />
          )}
        </div>
      </div>
    </div>
  );
};
