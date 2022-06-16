import React, { useState } from 'react';
import DatePicker from 'react-date-picker';
import DateTimePicker from 'react-datetime-picker';
import { Typography } from 'components/common/Typography';

export const DataPickerBlock: React.FC = () => {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());

  const [dateFrom, setDateFrom] = useState(new Date());
  const [dateTo, setDateTo] = useState(new Date());
  console.log(dateFrom.toLocaleString());
  console.log(dateTo.toLocaleString());
  return (
    <>
      <div className="flex flex-row gap-3">
        <div className="w-1/2">
          <Typography
            type={'Ag-12-medium'}
            children={'From:'}
            className="mb-2"
          />

          <DatePicker
            calendarIcon={null}
            clearIcon={null}
            onChange={setDate}
            value={date}
            format="y-MM-dd"
            className="w-full"
          />
        </div>
        <div className="w-1/2">
          <Typography type={'Ag-12-medium'} children={'To:'} className="mb-2" />

          <div className="">
            <DateTimePicker
              // calendarClassName={'border: 1px solid red;'}
              className={'border: 1px solid red;'}
              calendarIcon={null}
              clearIcon={null}
              format={'y-MM-dd h:mm a'}
              disableClock={true}
              yearPlaceholder={new Date().getFullYear().toString()}
              monthPlaceholder={new Date().getMonth().toString()}
              dayPlaceholder={new Date().getDate().toString()}
              hourPlaceholder={'09'}
              minutePlaceholder={'00'}
              minDate={new Date()}
              onChange={setDateTo}
              value={dateTo}
              isCalendarOpen={true}
              autoFocus={true}
              required={true}
              showLeadingZeros={true}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-3">
        <div className="w-1/2">
          <Typography
            type={'Ag-12-medium'}
            children={'From:'}
            className="mb-2"
          />

          <div className="">
            <DateTimePicker
              calendarIcon={null}
              clearIcon={null}
              format={'y-MM-dd h:mm a'}
              disableClock={true}
              yearPlaceholder={new Date().getFullYear().toString()}
              monthPlaceholder={new Date().getMonth().toString()}
              dayPlaceholder={new Date().getDate().toString()}
              hourPlaceholder={'09'}
              minutePlaceholder={'00'}
              minDate={new Date()}
              onChange={setDateFrom}
              value={dateFrom}
              isCalendarOpen={true}
              autoFocus={true}
              required={true}
              showLeadingZeros={true}
            />
          </div>
        </div>
        <div className="w-1/2">
          <Typography type={'Ag-12-medium'} children={'To:'} className="mb-2" />

          <div className="">
            <DateTimePicker
              // calendarClassName={'border: 1px solid red;'}
              className={'border: 1px solid red;'}
              calendarIcon={null}
              clearIcon={null}
              format={'y-MM-dd h:mm a'}
              disableClock={true}
              yearPlaceholder={new Date().getFullYear().toString()}
              monthPlaceholder={new Date().getMonth().toString()}
              dayPlaceholder={new Date().getDate().toString()}
              hourPlaceholder={'09'}
              minutePlaceholder={'00'}
              minDate={new Date()}
              onChange={setDateTo}
              value={dateTo}
              isCalendarOpen={true}
              autoFocus={true}
              required={true}
              showLeadingZeros={true}
            />
          </div>
        </div>
      </div>
    </>
  );
};
