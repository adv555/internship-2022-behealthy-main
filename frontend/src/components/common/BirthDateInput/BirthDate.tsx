import React, { useState, useEffect } from 'react';
import { Typography } from '../Typography';
import './birthDate.css';

interface IProps {
  day?: number | string;
  month?: number | string;
  year?: number | string;
  fullDate?: string;
  error?: string;
  className?: string;
  label?: string;
  returnDate: (value: string) => void;
}

const BirthDateInput: React.FC<IProps> = (props) => {
  const {
    day = '',
    month = '',
    year = '',
    fullDate,
    className,
    error,
    returnDate,
    label = 'Date of Birth',
  } = props;
  const [days, setDay] = useState<number | string>(day);
  const [months, setMonth] = useState<number | string>(month);
  const [years, setYear] = useState<number | string>(year);
  const [filtersMonth, setFiltersMonth] = useState<string[]>([]);
  const [isVisibleFilters, setIsVisibleFilters] = useState<boolean>(false);

  useEffect(() => {
    if (!fullDate) return;

    const date = new Date(fullDate);
    const dayDate = date.getDate();
    const yearDate = date.getFullYear();

    if (dayDate) setDay(dayDate);
    if (yearDate) setYear(yearDate);
    if (date.getMonth() + 1)
      setMonth(
        date.toLocaleString('en', {
          month: 'long',
        }),
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const returnValidatedDate = () => {
    const dates = `${years}-${
      new Date(`2022-${months}-10`).getMonth() + 1
    }-${days}`;
    returnDate(dates);
  };

  const changeVisibleFilters = (dateMonth: string[]) => {
    if (dateMonth.length === 12 || dateMonth.length === 0) {
      setIsVisibleFilters(false);
      return;
    }
    setIsVisibleFilters(true);
  };

  const filterMonth = (value: string = 'no') => {
    let dateMonth: string[] = [];

    for (let i = 1; i < 13; i++) {
      dateMonth.push(
        new Date('2022-' + i + '-10').toLocaleString('en', { month: 'long' }),
      );
    }

    dateMonth = dateMonth.filter((item) =>
      item.toLocaleLowerCase().includes(value.toLocaleLowerCase()),
    );
    changeVisibleFilters(dateMonth);
    setFiltersMonth(dateMonth);
  };

  const setYearValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setYear(e.target.value);
    returnValidatedDate();
  };

  const setMonthValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMonth(e.target.value);
    filterMonth(e.target.value);
    returnValidatedDate();
  };

  const setDayValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDay(e.target.value);
    returnValidatedDate();
  };

  const setValidMonth = () => {
    const month = new Date(`2022-${months}-10`);
    if (!(month.getMonth() + 1)) return;
    setMonth(
      month.toLocaleString('en', {
        month: 'long',
      }),
    );
  };

  const setMonthOnBlur = () => {
    setValidMonth();
    setTimeout(() => {
      setIsVisibleFilters(false);
    }, 100);
  };

  return (
    <div
      className={'birth-date-container ' + className}
      onBlur={returnValidatedDate}
    >
      <label htmlFor={'birth-date-label'}>{label}</label>
      <div className="birth-date-input-container">
        <input
          type={'number'}
          placeholder="Day"
          value={days}
          onChange={setDayValue}
        />
        <input
          type="text"
          placeholder="Month"
          value={months}
          onChange={setMonthValue}
          onBlur={setMonthOnBlur}
        />
        <input
          type={'number'}
          placeholder="Year"
          value={years}
          onChange={setYearValue}
        />
      </div>
      {!!error && (
        <Typography type="Ag-13-medium" className={'text-secondaryRed mt-1'}>
          {error}
        </Typography>
      )}
      <div
        className={
          `border border-primaryBlue flex flex-col max-h-36
         mt-2 overflow-hidden overflow-y-auto rounded ` +
          (!isVisibleFilters && ' hidden')
        }
      >
        {filtersMonth.map((item) => {
          return (
            <button
              key={item}
              className="flex p-2 hover:bg-fieldChosen hover:text-primaryBlue"
              onClick={() => setMonth(item)}
            >
              {item}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BirthDateInput;
