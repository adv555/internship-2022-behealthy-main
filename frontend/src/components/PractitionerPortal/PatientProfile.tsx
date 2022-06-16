import { Typography } from 'components/common/Typography';
import React from 'react';

interface PractitionerProfileProps {
  name?: string;
  age?: string | number;
  gender?: string;
  cardio?: string;
  clinic_adress?: string;
  bloodType?: string;
  about?: string;
  injuries?: string | string[] | any;
  allergies?: string | string[] | any;
  height?: string;
  weight?: string;
  index?: string;
  asthma?: string;
  diabetes?: string;
  hepatitis?: string;
  hiv?: string;
}

export const PatientProfile: React.FC<PractitionerProfileProps> = ({
  name,
  age,
  gender,
  asthma,
  injuries,
  allergies,
  height,
  weight,
  index,
  bloodType,
  cardio,
  diabetes,
  hepatitis,
  hiv,
}) => {
  const personalData = [
    { title: 'Age:', children: age },
    { title: 'Sex:', children: gender },
    { title: 'Blood Type:', children: bloodType },
  ];
  const BmiData = [
    { title: 'Height:', period: height },
    { title: 'Weight:', period: weight },
    { title: 'Index:', period: index },
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
      </div>
      <div className="flex flex-col gap-4">
        <div>
          <Typography
            type={'Ag-16-semibold'}
            children={'Asthma'}
            className="mb-1"
          />
          <Typography type={'Ag-15-medium'} children={''} />
          <ul className=" list-disc list-inside">{asthma}</ul>
        </div>
        <div>
          <Typography
            type={'Ag-16-semibold'}
            children={'Cardiovascular diseases'}
            className="mb-1"
          />
          <Typography type={'Ag-15-medium'} children={''} />
          <ul className=" list-disc list-inside">{cardio}</ul>
        </div>
        <div>
          <Typography
            type={'Ag-16-semibold'}
            children={'Diabetes'}
            className="mb-1"
          />
          <Typography type={'Ag-15-medium'} children={''} />
          <ul className=" list-disc list-inside">{diabetes}</ul>
        </div>
        <div>
          <Typography
            type={'Ag-16-semibold'}
            children={'Viral hepatitis'}
            className="mb-1"
          />
          <Typography type={'Ag-15-medium'} children={''} />
          <ul className=" list-disc list-inside">{hepatitis}</ul>
        </div>
        <div>
          <Typography
            type={'Ag-16-semibold'}
            children={'HIV/AIDS'}
            className="mb-1"
          />
          <Typography type={'Ag-15-medium'} children={''} />
          <ul className=" list-disc list-inside">{hiv}</ul>
        </div>

        <div>
          <Typography
            type={'Ag-16-semibold'}
            children={'Injuries'}
            className="mb-1"
          />
          <Typography type={'Ag-15-medium'} children={''} />
          <ul className=" list-disc list-inside">{injuries}</ul>
        </div>
        <div>
          <Typography
            type={'Ag-16-semibold'}
            children={'Allergies'}
            className="mb-1"
          />
          <Typography type={'Ag-15-medium'} children={''} />
          <ul className=" list-disc list-inside">{allergies}</ul>
        </div>
        <div>
          <Typography
            type={'Ag-16-semibold'}
            children={'BMI'}
            className="mb-1"
          />
          <div className="flex flex-row">
            {BmiData.map(({ title, period }) => (
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
        </div>
      </div>
    </div>
  );
};
