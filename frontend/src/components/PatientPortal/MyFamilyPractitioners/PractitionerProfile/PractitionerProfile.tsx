import { Typography } from 'components/common/Typography';
import React from 'react';

interface PractitionerProfileProps {
  name?: string;
  experience?: string | number;
  gender?: string;
  languages?: string;
  clinic_adress?: string;
  clinic_phone?: string;
  about?: string;
  placeOfWork?: string | string[] | any;
  education?: string | string[] | any;
  scheduleDays?: string;
  scheduleHours?: string;
  scheduleLunch?: string;
}

export const PractitionerProfile: React.FC<PractitionerProfileProps> = ({
  name,
  experience,
  gender,
  languages,
  about,
  placeOfWork,
  education,
  scheduleDays,
  scheduleHours,
  scheduleLunch,
}) => {
  const personalData = [
    { title: 'Experience:', children: experience },
    { title: 'Sex:', children: gender },
  ];
  const scheduleData = [
    { title: 'Days:', period: scheduleDays },
    { title: 'Hours:', period: scheduleHours },
    { title: 'Lunch:', period: scheduleLunch },
  ];
  return (
    <div className="flex flex-col">
      <div className=" py-5">
        <Typography type={'Ag-16-semibold'} children={name} />
        <div className="flex ">
          {personalData.map(({ title, children }) => (
            <div key={title} className="flex flex-row mr-6">
              <Typography
                type={'Ag-13-medium'}
                className="opacity-75 mr-1"
                children={title}
              />
              <Typography
                type={'Ag-13-medium'}
                children={children}
                className="whitespace-nowrap"
              />
            </div>
          ))}
        </div>
        <div className="flex flex-row">
          <Typography
            type={'Ag-13-medium'}
            children={'Languages:'}
            className=" opacity-75 mr-1"
          />
          <Typography type={'Ag-13-medium'} children={languages} />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div>
          <Typography
            type={'Ag-18-semibold'}
            children={'About'}
            className="mb-1"
          />
          <Typography type={'Ag-13-medium'} children={about} />
        </div>
        <div>
          <Typography
            type={'Ag-16-semibold'}
            children={'Employment'}
            className="mb-1"
          />
          <Typography type={'Ag-15-medium'} children={'Place of work:'} />
          <ul className=" list-disc list-inside">{placeOfWork}</ul>
        </div>
        <div>
          <Typography
            type={'Ag-16-semibold'}
            children={'Education'}
            className="mb-1"
          />
          <Typography type={'Ag-15-medium'} children={'Place of study:'} />
          <ul className=" list-disc list-inside">{education}</ul>
        </div>
        <div>
          <Typography
            type={'Ag-16-semibold'}
            children={'Working schedule'}
            className="mb-1"
          />
          <div className="flex flex-row">
            {scheduleData.map(({ title, period }) => (
              <div key={title} className="flex flex-row mr-6 flex-wrap">
                <Typography
                  type={'Ag-13-medium'}
                  className=" opacity-75 mr-1"
                  children={title}
                />
                <Typography
                  type={'Ag-13-medium'}
                  children={period}
                  className="whitespace-nowrap"
                />
              </div>
            ))}
          </div>

          <Typography
            type={'Ag-13-medium'}
            children={
              'If these hours don’t suit you, we can reschedule to some other time. '
            }
          />
        </div>
      </div>
    </div>
  );
};
