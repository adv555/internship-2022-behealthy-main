import { EventContentArg } from '@fullcalendar/react';
import { Typography } from 'components/common/Typography';
import { ReactComponent as ChevronRightButton } from 'assets/icons/schedule/chevron.right.svg';
import { ReactComponent as ChevronLeftButton } from 'assets/icons/schedule/chevron.left.svg';
import { IconButton } from 'components/common/IconButton';

export const renderSwitcher = (e: EventContentArg) => {
  return (
    <div className=" w-[150px] flex flex-col bg-greyScaleWhite border rounded border-notificationColour">
      <div className=""></div>
      <IconButton icon={<ChevronLeftButton />} />
      <div className="w-1/2">
        <Typography
          type={'Ag-13-medium'}
          children={'12:00 - 13:00'}
          className={' text-greyScaleGrey2'}
        />
      </div>

      <div className=" w-1/2 px-[10px] py-[2px]  ">
        <IconButton icon={<ChevronRightButton />} />
      </div>
    </div>
  );
};
