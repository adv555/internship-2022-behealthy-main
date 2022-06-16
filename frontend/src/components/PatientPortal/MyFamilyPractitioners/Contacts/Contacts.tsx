import React from 'react';
import { Typography } from 'components/common/Typography/Typography';

import { ReactComponent as PhoneIcon } from 'assets/icons/telephone.svg';
import { ReactComponent as AddressIcon } from 'assets/icons/address.svg';

interface ContactProps {
  doctorPhone?: React.ReactNode | string;
  doctorAddress?: React.ReactNode | string;
  clinicPhone?: React.ReactNode | string;
  clinicAddress?: React.ReactNode | string;
}

export const Contacts: React.FC<ContactProps> = ({
  clinicPhone,
  clinicAddress,
}) => {
  return (
    <>
      <div className="flex flex-col">
        <Typography
          type={'Ag-16-semibold'}
          children={'Contacts of clinic'}
          className="mb-[10px]"
        />

        <Typography
          type={'Ag-13-medium'}
          className="flex flex-row opacity-75 mb-2 "
        >
          <PhoneIcon className="mr-2" />
          {clinicPhone || 'N/A'}
        </Typography>

        <Typography type={'Ag-13-medium'} className="flex flex-row opacity-75 ">
          <AddressIcon className="mr-2" />
          {clinicAddress}
        </Typography>
      </div>
    </>
  );
};
